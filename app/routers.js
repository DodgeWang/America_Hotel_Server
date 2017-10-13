var Users = require('./controllers/Users.controller');
var System = require('./controllers/System.controller');
var Room = require('./controllers/Room.controller');

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

    app.get('/roomtype', function(req, res) {
       res.render('RoomTypeManage',{adminInfo:req.session.administrator});
    });
    
    app.get('/addroomtype', function(req, res) {
       res.render('AddRoomType',{adminInfo:req.session.administrator});
    });

    app.get('/editroomtype',function(req, res) {
        console.log(1)
       var id = req.query.id;
       Room.roomTypeInfo(id,function(data){
        console.log(data)
          res.render('EditRoomType',{data:data,adminInfo:req.session.administrator});
       })
    });

    app.get('/room', function(req, res) {
       res.render('RoomManage',{adminInfo:req.session.administrator});
    });


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

    app.post('/api/room/typeadd',Room.typeAdd);//添加房型 

    app.get('/api/room/typelist',Room.getTypeList) //获取房型列表

    app.get('/api/room/typedelete',Room.typeDelete);//删除房型

    app.post('/api/room/typeedit',Room.typeEdit);//修改房型

    app.get('/api/room/list',Room.getList); //获取房间列表

    
}