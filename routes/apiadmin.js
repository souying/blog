// 本文件只负责路由中转，业务代码在对应的控制器里
var express = require('express');
var router = express.Router();
// 加载usercontroller控制器
var apiadmin = require('../controllers/apiadminController');
// 路由api首页
router.get('/',apiadmin.index);

// 添加文章分类api
router.post('/addcate',apiadmin.addcate);

// 更新文章分类api
router.post('/upcate',apiadmin.upcate);

// 删除文章分类api
router.post('/removecate',apiadmin.removecate);

// 查询文章分类api
router.get('/catelist',apiadmin.catelist);

// 添加新文章api
router.post('/addarticle',apiadmin.addarticle);

// 文章列表api
router.get('/articlelist',apiadmin.articlelist);

// 文章置顶api
router.post('/topictop',apiadmin.topictop);

// 文章推荐api
router.post('/topicrecommend',apiadmin.topicrecommend);

// 文章移动到回收站
router.post('/topicshow',apiadmin.topicshow);

// 查询单个文章api
router.post('/topicone',apiadmin.topicone);

// 更新单个文章api
router.post('/uptopic',apiadmin.uptopic);

// 回收站文章api
router.get('/recovery',apiadmin.recovery);

// 删除回收站文章api
router.post('/removerecovery',apiadmin.removerecovery);

// 友情链接添加api
router.post('/linkadd',apiadmin.linkadd);

// 友情链接列表api
router.get('/linklist',apiadmin.linklist);

// 友情链接审核api
router.post('/linkisshow',apiadmin.linkisshow);

// 友情链接删除api
router.post('/linkremove',apiadmin.linkremove);

//博主个人信息查询
router.get('/infoone',apiadmin.infoone);

//博主个人信息更新
router.post('/infoup',apiadmin.infoup);

//网站信息查询
router.get('/webone',apiadmin.webone);

//网站信息更新
router.post('/webup',apiadmin.webup);

//网站seo信息查询
router.get('/seoone',apiadmin.seoone);

//网站seo信息更新
router.post('/seoup',apiadmin.seoup);

//添加网站公告
router.post('/noticeadd',apiadmin.noticeadd);

//网站公告列表
router.get('/noticelist',apiadmin.noticelist);

//网站公告删除
router.post('/noticeremove',apiadmin.noticeremove);

//添加每日一语
router.post('/newadd',apiadmin.newadd);

//每日一语列表
router.get('/newlist',apiadmin.newlist);

//每日一语删除
router.post('/newremove',apiadmin.newremove);

//添加广告
router.post('/addadd',apiadmin.addadd);

//广告列表
router.get('/addlist',apiadmin.addlist);

//广告删除
router.post('/addremove',apiadmin.addremove);

//网站注册功能开启与关闭更新
router.post('/isreg',apiadmin.isreg);

//网站注册功能开启与关闭查询
router.get('/isregone',apiadmin.isregone);

// 将对象泼出去
module.exports = router;