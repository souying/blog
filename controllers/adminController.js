// 定义admin对象
var admin ={};
// 定义方法

// 后台首页
admin.index = function(req,res){
	// 响应首页模板
	res.render('admin/main');
};

// 后台文章列表
admin.list = function(req,res){
	res.render('admin/list');
};

//后台公告列表
admin.notice = function(req,res){
	res.render('admin/notice');
}

//后台文章回收站
admin.recovery = function(req,res){
	res.render('admin/recovery');
}

//后台发布文章页面

admin.addarticle = function(req,res){
	res.render('admin/addarticle');
}

//后台修改文章页面

admin.uparticle = function(req,res){
	res.render('admin/uparticle');
}

//后台导航分类页面

admin.nav = function(req,res){
	res.render('admin/nav');
}

//后台友情链接发布页

admin.link = function(req,res){
	res.render('admin/link');
}

//后台博主信息页面

admin.user = function(req,res){
	res.render('admin/user');
}

//后台网站信息
admin.web = function(req,res){
	res.render('admin/web');
}

//后台每日一语
admin.new = function(req,res){
	res.render('admin/new');
}

//后台留言查看列表

admin.leaving = function(req,res){
	res.render('admin/leaving');
}

// 后台广告列表
admin.add = function(req,res){
	res.render('admin/add');
}

//后台seo设置

admin.seo = function(req,res){
	res.render('admin/seo');
}

//后台网站高级设置

admin.webgaoji = function(req,res){
	res.render('admin/webgaoji');
}
// 将对象暴露
module.exports = admin;