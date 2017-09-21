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
    app.get('/users', function(req, res) {
       res.render('Users',{adminInfo:req.session.administrator});
    });
    app.get('/adduser', function(req, res) {
       res.render('AddUser',{adminInfo:req.session.administrator});
    });
    app.get('/edituser', Users.userInfoById);


    /**
     * api routers
     */
    app.post('/api/system/login',System.login);//管理员登陆

    app.get('/api/system/exit',System.exit);  //退出后台系统

    app.get('/api/users/list',Users.getList) //获取用户列表

    app.post('/api/users/edit',Users.edit);//修改用户

    app.post('/api/users/add',Users.add);//添加用户 

    app.get('/api/users/delete',Users.delete);//删除用户 

    app.get('/api/users/resetpass',Users.resetpass);//用户密码重置
    
}