

// 加载数据库配置文件
var mongoose = require('../config/db_config');

// 创建骨架
var newSchema = new mongoose.Schema({
	// 内容
	newcontent : {
		type : String
	},
	// 发布时间
	newtime : {
		type : String
	},
	//邮箱
	newemail : {
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

var newModel = mongoose.model('news',newSchema);

// 向外暴漏
module.exports = newModel;