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
    app.get('/AddUser', function(req, res) {
       res.render('AddUser');
    });
    // app.get('/EditUser', function(req, res) {
    //    res.render('EditUser',{data:Users.userInfoById(req.query.userId)});
    // });
    app.get('/EditUser', Users.userInfoById);


    /**
     * api routers
     */
    app.post('/System/login',System.login);//管理员登陆

    app.get('/System/exit',System.exit);  //退出后台系统

    app.get('/Users/list',Users.getList) //获取用户列表

    app.post('/Users/add',Users.add);//添加用户 

    app.post('/Users/edit',Users.edit);//修改用户 

    app.get('/Users/delete',Users.delete);//删除用户 
    
}