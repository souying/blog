//对应blog_users集合

// 加载数据库配置文件
var mongoose = require('../config/db_config');

// 创建骨架
var linkSchema = new mongoose.Schema({
	// 网站名
	linkname : {
		type : String
	},
	// 网址
	linkurl : {
		type : String
	},
	// 网站简介
	linkcontent : {
		type : String
	},
	// Email
	email : {
		type : String,
		unique : true
	},
	// 提交时间
	createTime : {
		type : Date,
		default : Date.now
	},
	isshow : {
		type : String,
		default : 0
	}

});

//生成对应集合的模型

var linkModel = mongoose.model('links',linkSchema);

// 向外暴漏
module.exports = linkModel;