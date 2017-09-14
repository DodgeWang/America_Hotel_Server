var Users = require('./controllers/Users.controller');

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
    app.post('/Users/add',Users.add);//添加用户  

    // app.get('/admin/managerInfo',administrators.managerInfo);//获取管理员信息

    // app.get('/admin/exit',administrators.exit);  //退出后台系统 

    // app.post('/admin/resetPassword',administrators.resetPassword);  //修改管理员密码

    // app.post('/fileuploads',processData.importData); //导入数据
    
}