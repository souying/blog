// 本文件只负责路由中转，业务代码在对应的控制器里
var express = require('express');
var router = express.Router();
// 加载usercontroller控制器
var admin = require('../controllers/adminController');
// 路由后台首页
router.get('/',admin.index);
//路由后台文章列表
router.get('/list',admin.list);
//路由后台公告列表
router.get('/notice',admin.notice);
//路由后台文章回收站
router.get('/recovery',admin.recovery);
//路由后台导航分类
router.get('/nav',admin.nav);
//路由后台文章发布页面
router.get('/addarticle',admin.addarticle);
//路由后台文章修改页面
router.get('/uparticle',admin.uparticle);
//路由后台友情链接页面
router.get('/link',admin.link);
//路由后台关于博主信息
router.get('/user',admin.user);
//路由后台网站信息
router.get('/web',admin.web);
//路由后台每日一语
router.get('/new',admin.new);
//路由后台留言列表
router.get('/leaving',admin.leaving);
//路由后台广告管理
router.get('/add',admin.add);
//路由后台SEO设置
router.get('/seo',admin.seo);
//路由后台网站高级设置
router.get('/webgaoji',admin.webgaoji);
module.exports = router;
