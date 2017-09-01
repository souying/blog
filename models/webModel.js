//对应blog_users集合

// 加载数据库配置文件
var mongoose = require('../config/db_config');

// 创建骨架
var webSchema = new mongoose.Schema({
	// 网站id
	webid : {
		type : String,
		default :'gujianwen'
	},
	// 网站名
	webname : {
		type : String
	},
	// 网站url
	weburl : {
		type : String
	},
	// 网站底部信息
	webfoot : {
		type : String
	},
	//网站访问量
	webnum : {
		type : Number,
		default : 0
	},
	//网站版本
	webbanben : {
		type : String
	},
	//网站类型
	webcate : {
		type : String
	},
	//网站简介
	webcontent : {
		type : String
	},
	// 提交时间
	createTime : {
		type : Date,
		default : Date.now
	},
	// 扩展字段
	is : {
		type : String,
		default : 0
	}

});

//生成对应集合的模型

var webModel = mongoose.model('webs',webSchema);

// 向外暴漏
module.exports = webModel;