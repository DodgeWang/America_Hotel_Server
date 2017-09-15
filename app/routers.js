var Users = require('./controllers/Users.controller');
var System = require('./controllers/System.controller');

module.exports = function(app) {

    /**
     * html page routers
     */
    //登陆页面
    app.get('/login', function(req, res) {
       res.render('login',{ layout: null});
    });
    app.get('/Users', function(req, res) {
       res.render('Users');
    });



    /**
     * api routers
     */
    app.post('/System/login',System.login);//管理员登陆

    app.get('/System/exit',System.exit);  //退出后台系统

    app.post('/Users/add',Users.add);//添加用户  
    
}