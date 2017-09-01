//对应blog_topics集合

// 加载数据库配置文件

var mongoose = require('../config/db_config');

// 创建骨架
var topicSchema = new mongoose.Schema({
	// 标题
	tname : {
		type : String
	},
	// 文章简介
	tj : {
		type : String
	},
	// 内容
	tcontent : {
		type : String
	},
	// 作者  关联数据库
	user:{
		type:'objectId',
		// ref 表示关联，
		ref : 'users'
	},
	//分类  关联数据库
	cate:{
		type:'ObjectId',
		ref : 'cates'
	},
	//浏览次数
	visitnum:{
		type:Number,
		default:0
	},
	// 发布系统时间
	createtime : {
		type : Date,
		default : Date.now
	},
	//发布时间
	time : {
		type : String,
	},
	// 文章简介
	tj : {
		type : String
	},
	// 文章标签
	tag : {
		type : String
	},
	// 图片
	imgurl : {
		type : String,
		default : 'null'
	},
	// 音乐
	mp3 : {
		type : String
	},
	// 文章置顶
	top : {
		type : String,
		default:0
	},
	// 文章推荐
	recommend : {
		type : String,
		default:0
	},
	show : {
		type : String,
		default:1
	}

});

//生成对应集合的模型

var topicModel = mongoose.model('topics',topicSchema);

// 向外暴漏
module.exports = topicModel;