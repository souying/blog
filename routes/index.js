// 只做路由中转
var express = require('express');
var router = express.Router();
// 加载homecontroller控制器
var home = require('../controllers/homeController');
// 前台首页路由
router.get('/',home.index);
//前台列表页路由
router.get('/list',home.list);

////前台详情页路由
router.get('/list/:id/page/:page',home.listid);

//前台详情页路由
router.get('/details',home.details);

//前台详情页路由
router.get('/details/:id',home.detailsid);

//前台登录页路由
router.get('/login',home.login);

//文章标签页
router.get('/tag/:tag',home.taglist);

//文章搜索页
router.get('/search/:search',home.searchlist);


module.exports = router;
