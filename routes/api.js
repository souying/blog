// 本文件只负责路由中转，业务代码在对应的控制器里
var express = require('express');
var router = express.Router();
// 加载usercontroller控制器
var api = require('../controllers/apiController');
// 路由api首页
router.get('/',api.index);
//前端注册接口
router.post('/doreg',api.doreg);

//前端登录接口
router.post('/dologin',api.dologin);

//账号注销接口
router.get('/doesc',api.doesc);
//轮播图
router.get('/top',api.top);
//首页推荐
router.get('/show',api.show);
//每日一语
router.get('/new',api.new);
// 首页友情链接
router.get('/linklist',api.linklist);

// 广告
router.get('/addlist',api.addlist);

// 分类
router.get('/catelist',api.catelist);

// 分类
router.get('/seo',api.seo);

//单个文章查询
router.post('/details',api.details);

//文章分类列表查询
router.post('/listpage',api.listpage);

//文章标签搜索
router.post('/taglist',api.taglist);

//文章搜索接口
router.post('/searchlist',api.searchlist);


module.exports = router;