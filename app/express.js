var express = require('express');
var routers = require('./routers');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');


module.exports = function() {
    console.log('int express...');
    var app = express();
    var handlebars = require('express3-handlebars').create({ 
                    defaultLayout:'main' ,
                    helpers: {
                      section: function(name, options){ 
                        if(!this._sections) this._sections = {}; 
                        this._sections[name] = options.fn(this); 
                        return null;
                      } 
                    }
                 });
    app.engine('handlebars', handlebars.engine);
    app.set('view engine', 'handlebars');
    app.use(express.static('public'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    

    app.use(cookieParser('sessionHotel'));
    app.use(session({
        secret: 'sessionHotel',  //服务器端生成session的签名,与cookieParser中的一致
        resave: true,   //(是否允许)当客户端并行发送多个请求时，其中一个请求在另一个请求结束时对session进行修改覆盖并保存,默认为true
        saveUninitialized: true  //初始化session时是否保存到存储,默认为true
    }));


    app.use(function(req, res, next) {
        if(req.url == '/System/login' || req.url == '/login' ||  req.url == '/System/exit') return next();
        if(!req.session.administrator){
           res.redirect('/login')
        }else{
           next();
        }
    })

    routers(app);
    // app.use(function(req, res, next) {
    //     res.status(404);
    //     try {
    //         return res.json('Not Found');
    //     } catch (e) {
    //         console.log('404 set header after sent');
    //     }
    // });

    // app.use(function(err, req, res, next) {
    //     if (!err) {
    //         return next()
    //     }
    //     res.status(500);
    //     try {
    //         return res.json(err.message || 'server error')
    //     } catch (e) {
    //         console.log('500 set header after sent');
    //     }
    // });
    // 
    return app;
}