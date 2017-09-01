// 定义home对象
var home ={};
// 定义方法

// 前台首页
home.index = function(req,res){
	// 响应首页模板
	res.render('home/index');
};

//前台列表模板

home.list = function(req,res){
	//响应列表页模板
	res.render('home/list');
}

//前台列表模板id

home.listid = function(req,res){
	//响应列表页模板
	if (req.params.user === 'public') return next();
	res.render('home/list');
}

//前台详情页模板

home.details = function(req,res){
	//响应详情页模板
	res.render('home/details');
};

//前台详情页模板id

home.detailsid = function(req,res){
	//响应详情页模板
	// res.render('home/details');
	if (req.params.user === 'public') return next();
  
  	//响应详情页模板
	res.render('home/details');
};

// 文章标签页
home.taglist = function(req,res){
	if (req.params.user === 'public') return next();
  
  	//响应标签页模板
	res.render('home/tag');
};


// 文章搜索页
home.searchlist = function(req,res){
	if (req.params.user === 'public') return next();
  
  	//响应搜索模板
	res.render('home/search');
};

//前台登录页模板

home.login = function(req,res){
	//响应列表页模板
	res.render('home/login');
}

// 将对象暴露
module.exports = home;