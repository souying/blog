

// 加载数据库配置文件
var mongoose = require('../config/db_config');

// 创建骨架
var noticeSchema = new mongoose.Schema({
	// 公告标题
	noticename : {
		type : String
	},
	// 公告内容
	noticecontent : {
		type : String
	},
	// 公告发布时间
	noticetime : {
		type : String
	},
	//公告标签
	noticetag : {
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

var noticeModel = mongoose.model('notices',noticeSchema);

// 向外暴漏
module.exports = noticeModel;