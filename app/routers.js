var Users = require('./controllers/Users.controller');
var System = require('./controllers/System.controller');
var Room = require('./controllers/Room.controller');
var Task = require('./controllers/Task.controller');

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
       var id = req.query.id;
       Room.roomTypeInfo(id,function(data){
          res.render('EditRoomType',{data:data,adminInfo:req.session.administrator});
       })
    });

    app.get('/room', function(req, res) {
       res.render('RoomManage',{adminInfo:req.session.administrator});
    });

    app.get('/addroom', function(req, res) {
       res.render('AddRoom',{adminInfo:req.session.administrator});
    });

    app.get('/editroom',function(req, res) {
       var id = req.query.id;
       Room.roomInfo(id,function(data,typeList){
        console.log(typeList)
          res.render('EditRoom',{data:data,adminInfo:req.session.administrator,typeList:typeList});
       })
    });
    
    app.get('/task', function(req, res) {
       res.render('TaskManage',{adminInfo:req.session.administrator});
    });

    app.get('/addtask', function(req, res) {
       res.render('AddTask',{adminInfo:req.session.administrator});
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

    app.post('/api/room/add',Room.add);//添加房间 

    app.get('/api/room/delete',Room.delete);//删除房间

    app.post('/api/room/edit',Room.edit);//修改房间

    app.post('/api/task/add',Task.add);//创建任务

    app.get('/api/task/list',Task.getList); //获取任务列表
}