//对应blog_users集合

// 加载数据库配置文件
var mongoose = require('../config/db_config');

// 创建骨架
var infoSchema = new mongoose.Schema({
	infoid : {
		type : String,
		default :'gujianwen'
	},
	// 博主名
	infoname : {
		type : String
	},
	// 博主兴趣
	infolive : {
		type : String
	},
	// 博主qq
	infoqq : {
		type : String
	},
	//博主 Email
	infoemail : {
		type : String
	},
	//博主 github
	infogithub : {
		type : String
	},
	//博主 格言语录
	infoyuyan : {
		type : String
	},
	//博主 技术方向
	infohtml : {
		type : String
	},
	//博主 简介
	infocon : {
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

var infoModel = mongoose.model('infos',infoSchema);

// 向外暴漏
module.exports = infoModel;