//对应blog_users集合

// 加载数据库配置文件
var mongoose = require('../config/db_config');

// 创建骨架
var userSchema = new mongoose.Schema({
	// 用户名
	uname : {
		type : String
	},
	// 密码
	upwd : {
		type : String
	},
	// 真实名字
	userName : {
		type : String,
		default : '姓名'
	},
	// QQ
	qq : {
		type : Number,
		default : 12345
	},
	// Email
	email : {
		type : String,
		unique : true
	},
	// 注册的时间
	createTime : {
		type : Date,
		default : Date.now
	},
	// 最后登录的时间
	lastTime : {
		type : Date,
		default : Date.now
	},
	// 个性签名介绍
	des : {
		type : String,
		default : '博主太懒还没有个人介绍'
	},
	//管理员权限
	isActive : {
		type : Number,
		default : 0
	},
	// 博主管理员码
	userMa : {
		type : String,
		default : 'gujianwen@aliyun.com'
	}

});

//生成对应集合的模型

var userModel = mongoose.model('users',userSchema);

// 向外暴漏
module.exports = userModel;