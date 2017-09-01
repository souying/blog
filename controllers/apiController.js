// 加载对应的模型
var userModel = require('../models/userModel');
// 加载对应的模型
var cateModel = require('../models/cateModel');
// 加载对应的模型
var topicModel = require('../models/topicModel');
// 加载对应的模型
var linkModel = require('../models/linkModel');
// 加载对应的模型
var infoModel = require('../models/infoModel');
// 加载对应的模型
var webModel = require('../models/webModel');
// 加载对应的模型
var seoModel = require('../models/seoModel');
// 加载对应的模型
var noticeModel = require('../models/noticeModel');
// 加载对应的模型
var newModel = require('../models/newModel');
// 加载对应的模型
var addModel = require('../models/addModel');
// 加载对应的模型
var webgjModel = require('../models/webgjModel');
// 定义api对象
var api ={};
// 定义方法

// 首页
api.index = function(req,res){
	// 响应
	res.send('api-1-0版本');
};

// 前端注册接口
api.doreg = function(req,res){
	// 响应前端注册api
	// 获取ajax传来的值
	var email = req.body.email;
	var pwd = req.body.pwd;
	var uname = req.body.uname;
	// 邮箱查询条件
	var em ={
		email:email
	};
	// 查询条件
    var con = {
    	regid:'gujianwen'
    }
    // 查询
	webgjModel.findOne(con,function(err,data){

		if(err){
			res.json(err);
			return;
		}else if(data!=null){
			if(data.isreg==1){
				// 以email为条件查询数据库验证邮箱是否注册
				userModel.findOne(em,function(err,data){
					if(err){
						console.log(err);
						return;
					}
					if(data){
						// 如果data存在提示错误  终止程序
						res.json({"err":"0","msg":"邮箱已经被注册"});
						return;
					}else{
						// 设置注册的数据
						var newData = {
							uname:uname,
							upwd:pwd,
							//约定  最后一次登录就是注册的时间
							lastLogin : new Date(),
							email:email,
						};
						//添加数据
						userModel.create(newData,function(err){
							if(err){
								//有错误
								true
								console.log(err);
								res.json({"err":"1","msg":"数据异常,请重新尝试"});
								return;
							}else{
								//注册成功了 返回ture
								res.json({"err":"ture"});
							}
						});
					}
				});
			}else if(data.isreg==0){
				res.json({"err":"2","msg":"网站已经关闭注册功能了，谢谢使用"});
			}
		}else if(data==null){
			// 以email为条件查询数据库验证邮箱是否注册
			userModel.findOne(em,function(err,data){
				if(err){
					console.log(err);
					return;
				}
				if(data){
					// 如果data存在提示错误  终止程序
					res.json({"err":"0","msg":"邮箱已经被注册"});
					return;
				}else{
					// 设置注册的数据
					var newData = {
						uname:uname,
						upwd:pwd,
						//约定  最后一次登录就是注册的时间
						lastLogin : new Date(),
						email:email,
					};
					//添加数据
					userModel.create(newData,function(err){
						if(err){
							//有错误
							true
							console.log(err);
							res.json({"err":"1","msg":"数据异常,请重新尝试"});
							return;
						}else{
							//注册成功了 返回ture
							res.json({"err":"ture"});
						}
					});
				}
			})
		}else{
			res.json({"err":"2","msg":"网站已经关闭注册功能了，谢谢使用"});
		}
	});
	

};

//前端登录接口
api.dologin = function(req,res){
	var email = req.body.email;
	var pwd = req.body.pwd;
	// 定义查询数据的用户
	var con = {
		email:email,
		upwd:pwd
	};
	userModel.findOne(con,function(err,data){
		if(err){
			colsole.log(err);
			return;
		}
		if(!data){
			// 返回数据
			res.json({"err":"0","msg":"您的账号或者密码错误"});
			// 终止程序
			return;
		}else{
			// 将data存在session中
			req.session.user = data;
			//console.log(req.session.user)
			// data存在跳转首页
			res.json({"err":"ture"});
		}
	})
};

//注销账号接口
api.doesc = function(req,res){
	//设置session为null
	req.session.user = null;
	// 返回数据
	res.json({'is':true,'msg':'退出账号成功'})
}
// 首页轮播图
api.top = function(req,res){
	// 查询条件
	var lun = {
		top:1,
		show:1
	}
	topicModel.find(lun).limit(5).sort({createTime:-1}).populate('users','uname').exec(function(err,topiclunData){
		//console.log(topiclunData)
		
		if (!err) {
			res.json(topiclunData);
		}
	});
}

// 首页推荐
api.show = function(req,res){
	// 查询条件
	var recommend = {
		recommend:1,
		show:1
	}
	topicModel.find(recommend).limit(12).sort({createTime:-1}).populate('users','uname').exec(function(err,showData){
		//console.log(topiclunData)
		if(!err){
			res.json(showData);
		}
		
	});
}

// 查询每日一语
api.new = function(req,res){
	newModel.findOne().sort({createTime:-1}).exec(function(err,newData){
		if(!err){
			res.json(newData);
		}
		
	});
};
//首页友情链接
api.linklist = function(req,res){
	var isshow = {
		isshow:1
	}
	linkModel.find(isshow).sort({createTime:-1}).exec(function(err,linkData){
		if(!err){
			res.json(linkData);
			// console.log(linkData)
		}
		
	});
	
};

// 广告接口
api.addlist = function(req,res){
	addModel.findOne().sort({createTime:-1}).exec(function(err,addData){
		if(!err){
			res.json(addData);
			// console.log(addData)
		}
		
	});
};
// 分类
api.catelist = function(req,res){
	cateModel.find().sort({catetop:-1}).exec(function(err,cateData){
		if(!err){
			res.json(cateData);
			// console.log(cateData)
		}
		
	});
};
// seo查询
api.seo = function(req,res){
	seoModel.findOne().exec(function(err,seoData){
		if(!err){
			res.json(seoData);
			// console.log(seoData)
		}
	})
};

// 单个文章查询
api.details = function(req,res){
	//获取ajax传来的值
	var id = req.body.id;
	var con ={
		_id:id
	}
	topicModel.findOne(con).populate('user','uname').populate('cate','catename').exec(function(err,data){
		if(!err){
			if(data){
				res.json(data);
			}else{
				res.json({is:false,mag:'参数错误请重新尝试'});
			}
		}
	});
};

// 文章列表
api.listpage = function(req,res){
	//获取ajax传来的值
	var id = req.body.id;
	var page = req.body.page;
	var con = {
		show:1,
		cate:id
	}
	//  每页显示的条数
	var pageSize = 1;

	topicModel.find(id).sort({createtime:-1}).populate('user','uname').count(function(err,total){
		// 获取总条数 total
			// console.log(total);
			
			// page的限制
			if(page<=1){
				page=1
			}

			// 最大的页数
			var pageMax = Math.ceil(total/pageSize);

			if(page>=pageMax){
				page=pageMax
			}
			// console.log(page);
			// 当前的偏移量
			var pageOffset = (page-1)*pageSize;
			// 查询
			topicModel.find(con).sort({createtime:-1}).skip(pageOffset).limit(pageSize).populate('user','uname').populate('cate','catename').exec(function(err,topicData){
				// console.log(topicData)
				//console.log(err)
				res.json(topicData)
	
			});
	});
};

// 文章标签搜索
api.taglist = function(req,res){
	//获取ajax传来的值
	var tag = req.body.tag;
	var con = {
		tag:tag,
		show:1
	}
	topicModel.find(con).sort({createtime:-1}).populate('user','uname').populate('cate','catename').exec(function(err,topicData){
			// console.log(topicData)
			//console.log(err)
			res.json(topicData)

		});
};

// 文章搜索接口
api.searchlist = function(req,res){
	//获取ajax传来的值
	  if(req.body.search) {
	    // con['tname']=new RegExp(req.body.search);//模糊查询参数
	    // con[show] = 1;
	    var con = {
	    	tname:new RegExp(req.body.search),
	    	show:1
	    }
	  }
	  console.log(con)
	topicModel.find(con).sort({createtime:-1}).populate('user','uname').populate('cate','catename').exec(function(err,topicData){
			// console.log(topicData)
			//console.log(err)
			res.json(topicData)

		});
};
// 将对象暴露
module.exports = api;