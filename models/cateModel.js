// 加载数据库配置文件
var mongoose = require('../config/db_config');

//创建骨架
var cateSchema = new mongoose.Schema({
	catename:{
		type:String
	},
	catetime:{
		type:String
	},
	catedata:{
		type : Date,
		default : Date.now
	},
	catetop:{
		type:Number
	}

});

//创建模型
var cateModel = mongoose.model('cates',cateSchema);
//向外暴漏
module.exports = cateModel;