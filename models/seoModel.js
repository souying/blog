//对应blog_users集合

// 加载数据库配置文件
var mongoose = require('../config/db_config');

// 创建骨架
var seoSchema = new mongoose.Schema({
	// 网站id
	seoid : {
		type : String,
		default :'gujianwen'
	},
	// 网站名
	seoname : {
		type : String
	},
	// 网站url
	seokey : {
		type : String
	},
	// 网站底部信息
	seodel : {
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

var seoModel = mongoose.model('seos',seoSchema);

// 向外暴漏
module.exports = seoModel;