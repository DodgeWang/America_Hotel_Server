const express = require('express');
const routers = require('./routers');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const hbsHelper = require('./hbsHelper');
const log4js = require('log4js')


module.exports = () => {
    console.log('int express...');
    let app = express();
    let handlebars = require('express3-handlebars').create({ 
                    defaultLayout:'main' ,
                    helpers: hbsHelper
                 });

    app.engine('handlebars', handlebars.engine);
    app.set('view engine', 'handlebars');
    app.use(express.static('public'));
    
    app.use('/users/edit', express.static('public'));


    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    

    app.use(cookieParser('sessionHotel'));
    app.use(session({
        secret: 'sessionHotel',  //服务器端生成session的签名,与cookieParser中的一致
        resave: true,   //(是否允许)当客户端并行发送多个请求时，其中一个请求在另一个请求结束时对session进行修改覆盖并保存,默认为true
        saveUninitialized: true  //初始化session时是否保存到存储,默认为true
    }));

    // log4js.configure({
    //     appenders:[
    //        {type:'console'},//控制台输出
    //        {
    //          type: 'file',//文件输出
    //          filename: 'logs/log.log',
    //          maxLogSize: 1024,
    //          backups: 3,
    //          category: 'normal'
    //        }
    //     ]
    // })



    app.use((req, res, next) => {
        if(req.url == '/api/system/login' || req.url == '/login' ||  req.url == '/api/system/exit') return next();
        if(!req.session.administrator){
           res.redirect('/login')
        }else{
           next();
        }
        // next();
    })

    routers(app);

    app.use((req, res, next) => {
        res.status(404);
        try {
            return res.json('Not Found');
        } catch (e) {
            console.log('404 set header after sent');
        }
    });
    

    app.use((err, req, res, next) => {
        if (!err) {
            return next()
        }
        res.status(500);
        try {
            return res.json(err.message || 'server error')
        } catch (e) {
            console.log('500 set header after sent');
        }
    });
    
    return app;
}