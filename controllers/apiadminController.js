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
var apiadmin ={};
// 定义方法

// 首页
apiadmin.index = function(req,res){
	// 响应
	res.send('apiadmin-1-0版本');
};
// 文章分类添加数据
apiadmin.addcate = function(req,res){
	// 获取ajax传来的值
	var catename = req.body.catename;
	var catetime = req.body.catetime;
	var catetop = req.body.catetop;
	// 设置添加的数据
	var newData = {
		'catename' : catename,
		'catetime' : catetime,
		'catetop' : catetop
	}
	console.log(newData)
	//添加数据
	cateModel.create(newData,function(err){
		if(err){
			// console.log(err);
			res.json(err)
			return;
		}else{
			//添家成功了 返回数据
			res.json({'is':true,'msg':'添家数据成功'})
		};

	});
};

// 文章分类添加数据
apiadmin.upcate = function(req,res){
	// 获取ajax传来的值
	var id = req.body.upid;
	var catename = req.body.upcatename;
	var catetime = req.body.upcatetime;
	var catetop = req.body.upcatetop;
	// 设置更新条件
	var con = {
		_id:id
	}
	// 更新的数据
	var newData = {
		'catename' : catename,
		'catetime' : catetime,
		'catetop' : catetop
	}
	// console.log(newData)
	//添加数据
	cateModel.update(con,{$set:newData},function(err){
		if(err){
			// console.log(err);
			res.json(err)
			return;
		}else{
			//更新成功了 返回数据
			res.json({'is':true,'msg':'更新数据成功'})
		};

	});
};
// 删除文章分类
apiadmin.removecate = function(req,res){
	// 获取ajax传来的值
	var id = req.body.id;
	var newData ={
		_id:id
	}
	cateModel.remove(newData,function(err){
		if(err){
			// console.log(err);
			res.json(err)
			return;
		}else{
			//删除成功了 返回数据
			res.json({'is':true,'msg':'删除数据成功'})
		};

	});
};
// 查询所有文章分类
apiadmin.catelist = function(req,res){
	// 查询文章分类
	cateModel.find(function(err,catedata){
		if(err){
			res.json(err)
		}else{
			res.json(catedata);
		}
	})
}

// 添加新文章
apiadmin.addarticle = function(req,res){
	if(req.session.user._id==null){
		res.json({'is':false,'msg':'您还没有登录'});
		return;
	}
	var newData = {
		tname : req.body.tname,
		tcontent : req.body.tcontent,
		cate : req.body.cate,
		// 作者信息 -- 当前登录的用户的_id
		user : req.session.user._id,
		lastEdit : new Date(),
		tj :req.body.tj,
		tag : req.body.tag,
		imgurl : req.body.imgurl,
		time : req.body.time,
		mp3: req.body.mp3
	}
	// 创建文章
	topicModel.create(newData,function(err,data){
		if(err){
			// 返回错误信息
			res.json(err);
		}else{
			// 返回数据文章列表页
			res.json({'is':true,'msg':'数据添家成功'})
		}
	});
};
// 文章列表
apiadmin.articlelist = function(req,res){
	topicModel.find({'show':1}).sort({'createtime':-1}).populate('user','uname').populate('cate','catename').exec(function(err,data){
		if(err){
			res.json(err)
		}else{
			res.json(data);
		}
	})
};

//文章置顶
apiadmin.topictop = function(req,res){
	// 获取ajax传来的值
	var id = req.body.id;
	var con ={
		_id:id
	}
	// 更新的新数据
	var newData1 = {
		top:1
	}
	var newData2 = {
		top:0
	}
	topicModel.findOne(con,function(err,data){
		if(err){
			res.json(err)
		}else{
			// console.log(data.top)
			if(data.top==0){
				topicModel.update(con,{$set:newData1},function(err){
					if(!err){
						res.json({'is':true,'msg':'数据更新成功'})
					}
				});
			}else if(data.top==1){
				topicModel.update(con,{$set:newData2},function(err){
					if(!err){
						res.json({'is':true,'msg':'数据更新成功'})
					}
				});
			}
		}
	})

};

//文章推荐
apiadmin.topicrecommend = function(req,res){
	// 获取ajax传来的值
	var id = req.body.id;
	var con ={
		_id:id
	}
	// 更新的新数据
	var newData1 = {
		recommend:1
	}
	var newData2 = {
		recommend:0
	}
	topicModel.findOne(con,function(err,data){
		// console.log(data.top)
		if(data.recommend==0){
			topicModel.update(con,{$set:newData1},function(err){
				if(!err){
					res.json({'is':true,'msg':'数据更新成功'})
				}
			});
		}else if(data.recommend==1){
			topicModel.update(con,{$set:newData2},function(err){
				if(!err){
					res.json({'is':true,'msg':'数据更新成功'})
				}
			});
		}
	});
};

// 文章移动到回收站
apiadmin.topicshow = function(req,res){
	// 获取ajax传来的值
	var id = req.body.id;
	var con ={
		_id:id
	}
	// 更新的新数据
	var newData1 = {
		show:1
	}
	var newData2 = {
		show:0
	}
	// 更新
	topicModel.findOne(con,function(err,data){
		console.log(data.show)
		if(data.show==0){
			topicModel.update(con,{$set:newData1},function(err){
				if(!err){
					res.json({'is':true,'msg':'数据更新成功'})
				}
			});
		}else if(data.show==1){
			topicModel.update(con,{$set:newData2},function(err){
				if(!err){
					res.json({'is':true,'msg':'数据更新成功'})
				}
			});
		}
	});
};

// 查询单个文章
apiadmin.topicone = function(req,res){
	// 获取ajax传来的值
	var id = req.body.id;
	var con ={
		_id:id
	}
	// 查询
	topicModel.findOne(con,function(err,data){
		if(!err){
			res.json(data);
		}
	})
};

//更新文章修改
apiadmin.uptopic = function(req,res){
	// 获取ajax传来的值
	var id = req.body.id;
	var con ={
		_id:id
	}
	// 更新的新数据
	var newData = {
		tname : req.body.tname,
		tcontent : req.body.tcontent,
		cate : req.body.cate,
		lastEdit : new Date(),
		tj :req.body.tj,
		tag : req.body.tag,
		imgurl : req.body.imgurl,
		time : req.body.time,
		mp3: req.body.mp3
	}
	// 更新
	topicModel.update(con,{$set:newData},function(err){
		if(err){
			res.json(err)
		}else{
			res.json({'is':true,'msg':'数据更新成功'})
		}
	});

};

// 回收站文章管理
apiadmin.recovery = function(req,res){
	topicModel.find({'show':0}).sort({'createtime':-1}).populate('user','uname').populate('cate','catename').exec(function(err,data){
		if(err){
			res.json(err)
		}else{
			res.json(data);
		}
	})
};

//删除回收站文章
apiadmin.removerecovery = function(req,res){
	// 获取ajax传来的值
	var id = req.body.id;
	var con ={
		_id:id
	}
	topicModel.remove(con,function(err){
		if(err){
			// console.log(err);
			res.json(err)
			return;
		}else{
			//删除成功了 返回数据
			res.json({'is':true,'msg':'删除数据成功'})
		};

	});
};

// 友情链接
// 友情链接添加
apiadmin.linkadd = function(req,res){
	// 获取ajax传来的值
	var newData = {
		linkname : req.body.linkname,
		email : req.body.email,
		linkurl : req.body.linkurl,
		linkcontent : req.body.linkcontent
	}
	// 创建友情链接
	linkModel.create(newData,function(err,data){
		if(err){
			// 返回错误信息
			res.json(err);
		}else{
			// 返回数据文章列表页
			res.json({'is':true,'msg':'数据添家成功'})
		}
	});
};

//友情链接列表
apiadmin.linklist = function(req,res){
	linkModel.find(function(err,linkdata){
		if(err){
			res.json(err)
		}else{
			res.json(linkdata);
		}
	})
};

//友情链接审核
apiadmin.linkisshow = function(req,res){
	// 获取ajax传来的值
	var id = req.body.id;
	var con ={
		_id:id
	}
	// 更新的新数据
	var newData1 = {
		isshow:1
	}
	var newData2 = {
		isshow:0
	}
	// 更新
	linkModel.findOne(con,function(err,data){
		console.log(data.isshow)
		if(data.isshow==0){
			linkModel.update(con,{$set:newData1},function(err){
				if(!err){
					res.json({'is':true,'msg':'数据更新成功'})
				}
			});
		}else if(data.isshow==1){
			linkModel.update(con,{$set:newData2},function(err){
				if(!err){
					res.json({'is':true,'msg':'数据更新成功'})
				}
			});
		}
	});
};

// 删除单个友情链接
apiadmin.linkremove = function(req,res){
	// 获取ajax传来的值
	var id = req.body.id;
	var con ={
		_id:id
	}
	linkModel.remove(con,function(err){
		if(err){
			// console.log(err);
			res.json(err)
			return;
		}else{
			//删除成功了 返回数据
			res.json({'is':true,'msg':'删除数据成功'})
		};

	});
};

// 博主个人信息查询
apiadmin.infoone = function(req,res){
	// 查询条件
    var con = {
    	infoid:'gujianwen'
    }
	// 查询
	infoModel.findOne(con,function(err,data){
		if(!err){
			console.log(data)
			
			res.json(data);
		}
	})
};

// 博主个人信息更新
apiadmin.infoup = function(req,res){
	// 查询条件
    var con = {
    	infoid:req.body.infoid,
    }
    // 获取数据
    var newData = {
    	infoname : req.body.infoname,
    	infolive : req.body.infolive,
    	infoqq : req.body.infoqq,
    	infoemail : req.body.infoemail,
    	infogithub : req.body.infogithub,
    	infoyuyan : req.body.infoyuyan,
    	infohtml : req.body.infohtml,
    	infocon : req.body.infocon,
    }
    // 查询
	infoModel.findOne(con,function(err,data){
		if(!err){
			console.log(data)
			if(data==null){
				// 添加新信息
				infoModel.create(newData,function(err,data){
					if(err){
						// 返回错误信息
						res.json(err);
					}else{
						// 返回数据文章列表页
						res.json({'is':true,'msg':'数据添家成功'})
					}
				});
			}else{
				// 更新
				infoModel.update(con,{$set:newData},function(err){
					if(err){
						res.json(err)
					}else{
						res.json({'is':true,'msg':'数据更新成功'})
					}
				});
			}
		}
	})
};

// 网站信息查询
// 
apiadmin.webone = function(req,res){
	// 查询条件
    var con = {
    	webid:'gujianwen'
    }
	// 查询
	webModel.findOne(con,function(err,data){
		if(!err){
			console.log(data)
			
			res.json(data);
		}
	})
};


// 网站信息更新
apiadmin.webup = function(req,res){
	// 查询条件
    var con = {
    	webid:req.body.webid,
    }
    // 获取数据
    var newData = {
        webname:req.body.webname,
        weburl:req.body.weburl,
        webfoot:req.body.webfoot,
        webnum:req.body.webnum,
        webbanben:req.body.webbanben,
        webcate:req.body.webcate,
        webcontent:req.body.webcontent
    }
    // 查询
	webModel.findOne(con,function(err,data){
		if(!err){
			console.log(data)
			if(data==null){
				// 添加新信息
				webModel.create(newData,function(err,data){
					if(err){
						// 返回错误信息
						res.json(err);
					}else{
						// 返回数据文章列表页
						res.json({'is':true,'msg':'数据添家成功'})
					}
				});
			}else{
				// 更新
				webModel.update(con,{$set:newData},function(err){
					if(err){
						res.json(err)
					}else{
						res.json({'is':true,'msg':'数据更新成功'})
					}
				});
			}
		}
	})
};
// 网站seo信息查询
// 
apiadmin.seoone = function(req,res){
	// 查询条件
    var con = {
    	seoid:'gujianwen'
    }
	// 查询
	seoModel.findOne(con,function(err,data){
		if(!err){
			console.log(data)
			
			res.json(data);
		}
	})
};


// 网站seo信息更新
apiadmin.seoup = function(req,res){
	// 查询条件
    var con = {
    	seoid:req.body.seoid
    }
    // 获取数据
    var newData = {
        seoname:req.body.seoname,
        seokey:req.body.seokey,
        seodel:req.body.seodel
    }
    // 查询
	seoModel.findOne(con,function(err,data){
		if(!err){
			// console.log(data)
			if(data==null){
				// 添加新信息
				seoModel.create(newData,function(err,data){
					if(err){
						// 返回错误信息
						res.json(err);
					}else{
						// 返回数据文章列表页
						res.json({'is':true,'msg':'数据添家成功'})
					}
				});
			}else{
				// 更新
				seoModel.update(con,{$set:newData},function(err){
					if(err){
						res.json(err)
					}else{
						res.json({'is':true,'msg':'数据更新成功'})
					}
				});
			}
		}
	})
};

// 网站公告
// 添加网站公告
apiadmin.noticeadd = function(req,res){
	// 获取ajax传来的值
	var newData = {
		noticename : req.body.noticename,
		noticecontent : req.body.noticecontent,
		noticetime : req.body.noticetime,
		noticetag : req.body.noticetag
	}
	// 创建网站公告
	noticeModel.create(newData,function(err,data){
		if(err){
			// 返回错误信息
			res.json(err);
		}else{
			// 返回数据文章列表页
			res.json({'is':true,'msg':'数据添家成功'})
		}
	});
};

// 网站公告列表
apiadmin.noticelist = function(req,res){
	noticeModel.find().sort({'createTime':-1}).exec(function(err,data){
		if(err){
			// 返回错误信息
			res.json(err);
		}else{
			// 返回数据文章列表页
			res.json(data)
		}
	})
};

// 网站公告删除
apiadmin.noticeremove = function(req,res){
	// 获取ajax传来的值
	var id = req.body.id;
	var con ={
		_id:id
	}
	noticeModel.remove(con,function(err){
		if(err){
			// console.log(err);
			res.json(err)
			return;
		}else{
			//删除成功了 返回数据
			res.json({'is':true,'msg':'删除数据成功'})
		};

	});
};
// 添加每日一语
apiadmin.newadd = function(req,res){
	// 获取ajax传来的值
	var newData = {
		newcontent : req.body.newcontent,
		newtime : req.body.newtime,
		newemail : req.body.newemail
	}
	// 创建每日一语
	newModel.create(newData,function(err,data){
		if(err){
			// 返回错误信息
			res.json(err);
		}else{
			// 返回数据文章列表页
			res.json({'is':true,'msg':'数据添家成功'})
		}
	});
};

// 每日一语列表
apiadmin.newlist = function(req,res){
	newModel.find().sort({'createTime':-1}).exec(function(err,data){
		if(err){
			// 返回错误信息
			res.json(err);
		}else{
			// 返回数据文章列表页
			res.json(data)
		}
	})
};

// 每日一语删除

apiadmin.newremove = function(req,res){
	// 获取ajax传来的值
	var id = req.body.id;
	var con ={
		_id:id
	}
	newModel.remove(con,function(err){
		if(err){
			// console.log(err);
			res.json(err)
			return;
		}else{
			//删除成功了 返回数据
			res.json({'is':true,'msg':'删除数据成功'})
		};

	});
};

// 广告
// 添加广告
apiadmin.addadd = function(req,res){
	// 获取ajax传来的值
	var newData = {
		addtimestart : req.body.addtimestart,
		addurl : req.body.addurl,
		addimgurl : req.body.addimgurl,
		addemail : req.body.addemail,
		addtimeend : req.body.addtimeend
	}
	// 创建每日一语
	addModel.create(newData,function(err,data){
		if(err){
			// 返回错误信息
			res.json(err);
		}else{
			// 返回数据文章列表页
			res.json({'is':true,'msg':'数据添家成功'})
		}
	});
};

// 广告列表
apiadmin.addlist = function(req,res){
	addModel.find().sort({'createTime':-1}).exec(function(err,data){
		if(err){
			// 返回错误信息
			res.json(err);
		}else{
			// 返回数据文章列表页
			res.json(data)
		}
	})
};

//广告删除
apiadmin.addremove = function(req,res){
	// 获取ajax传来的值
	var id = req.body.id;
	var con ={
		_id:id
	}
	addModel.remove(con,function(err){
		if(err){
			// console.log(err);
			res.json(err)
			return;
		}else{
			//删除成功了 返回数据
			res.json({'is':true,'msg':'删除数据成功'})
		};

	});
};

// 网站注册功能的关闭与开启
apiadmin.isreg = function(req,res){
	// 查询条件
    var con = {
    	regid:req.body.regid,
    }
    // 获取数据
    var newData = {
    	regid:req.body.regid,
    	isreg : req.body.isreg
    	
    }
    // 查询
	webgjModel.findOne(con,function(err,data){
		if(!err){
			console.log(data)
			if(data==null){
				// 添加新信息
				webgjModel.create(newData,function(err,data){
					if(err){
						// 返回错误信息
						res.json(err);
					}else{
						// 返回数据文章列表页
						res.json({'is':true,'msg':'数据添家成功'})
					}
				});
			}else{
				// 更新
				webgjModel.update(con,{$set:newData},function(err){
					if(err){
						res.json(err)
					}else{
						res.json({'is':true,'msg':'数据更新成功'})
					}
				});
			}
		}
	})
};

apiadmin.isregone = function(req,res){
	// 查询条件
    var con = {
    	regid:'gujianwen'
    }
	// 查询
	webgjModel.findOne(con,function(err,data){
		if(!err){
			console.log(data)
			
			res.json(data);
		}
	})
}
// 将对象暴露
module.exports = apiadmin;