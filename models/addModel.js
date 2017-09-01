

// 加载数据库配置文件
var mongoose = require('../config/db_config');

// 创建骨架
var addSchema = new mongoose.Schema({
	// 广告url地址
	addurl : {
		type : String
	},
	// 广告开始时间
	addtimestart : {
		type : String
	},
	//广告联系方式
	addemail : {
		type : String
	},
	//广告图片url
	addimgurl : {
		type : String
	},
	//广告到期时间
	addtimeend : {
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

var addModel = mongoose.model('adds',addSchema);

// 向外暴漏
module.exports = addModel;