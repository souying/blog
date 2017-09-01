var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//加载session模块
var session = require('express-session');
// 加载邮箱配置
var sendMail = require('./config/mail');
// 首页
var index = require('./routes/index');
// 后台
var admin = require('./routes/admin');
// 接口api
var api = require('./routes/api');

// 后台接口api
var apiadmin = require('./routes/apiadmin');

var app = express();

//获取程序异常
var domain = require('domain');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// 使用 domain 来捕获大部分异常
app.use(function (req, res, next) {
    var reqDomain = domain.create();
    reqDomain.on('error', function (err) {  // 下面抛出的异常在这里被捕获,触发此事件
        console.log('程序捕获到错误');
        sendMail('50667@163.com','程序捕获到错误',err.stack);
        res.send(500, err.stack);           // 成功给用户返回了 500
    });
    reqDomain.run(next);
});

// uncaughtException 避免程序崩溃
process.on('uncaughtException', function (err) {
    console.error("uncaughtException ERROR");
    if (typeof err === 'object') {
        if (err.message) {
            console.error('ERROR: ' + err.message)
            sendMail('50667@163.com','程序捕获到错误',err.message);
        }
        if (err.stack) {
            console.error(err.stack);
            sendMail('50667@163.com','程序捕获到错误',err.stack);
        }
    } else {
        console.error('argument is not an object');
    }
});
// 测试捕获
// app.get('/err', function (req, res) {
//     //throw new Error('exception'); 
//     setTimeout(function () {
//         throw new Error('exception'); // 抛出一个异步异常
//     }, 1000);
// })

//在路由前面设置session存储信息
app.use(session({
	// 加密字符串
	secret:'zheshijiamizhifuchuan',
	cookie:{
		maxAge:60*1000*60*60,
		path:'/'
	}
}));
// 首页
app.use('/',index);
// 后台
app.use('/admin',function(req,res,next){
    // 如果用户没有登录跳转到前台首页
    if(!req.session.user){
      // 跳转首页
      res.redirect('/login');
      //终止程序
      return;
    };
    // 移交权限
    next();

},admin);

// 接口
app.use('/api',api);

// 接口
app.use('/apiadmin',apiadmin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  // err.status = 404;
   if(err.status = 404){
    // 响应404模板
    res.send('404,数据错误');
    sendMail('50667@163.com','404错误页面',err.stack);
  }
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
