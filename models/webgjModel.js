

// 加载数据库配置文件
var mongoose = require('../config/db_config');

// 创建骨架
var webgjSchema = new mongoose.Schema({
	// 判断字段
	isreg : {
		type : Number
	},
	// id
	regid : {
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

var webgjModel = mongoose.model('webgjs',webgjSchema);

// 向外暴漏
module.exports = webgjModel;