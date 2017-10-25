var language = require('../config/language');
var Users = require('./controllers/Users.controller');
var System = require('./controllers/System.controller');
var Room = require('./controllers/Room.controller');
var Task = require('./controllers/Task.controller');
var Role = require('./controllers/Role.controller');
var Department = require('./controllers/Department.controller');
var CheckIn = require('./controllers/CheckIn.controller');


module.exports = function(app) {
    /**
     * html page routers
     */
    //登陆页面
    app.get('/login', function(req, res) {
       var Language = language(req);
       res.render('login',{layout: null,language:Language});
    });
    app.get('/users', function(req, res) { 
       var Language = language(req);
       res.render('Users',{adminInfo:req.session.administrator,language:Language});
    });
    app.get('/adduser', function(req, res) {
       var Language = language(req);
       res.render('AddUser',{adminInfo:req.session.administrator,language:Language});
    });
    app.get('/edituser', Users.userInfoById);

    // app.get('/roomtype', function(req, res) {
    //    var Language = language(req);
    //    res.render('RoomTypeManage',{adminInfo:req.session.administrator,language:Language});
    // });
    
    app.get('/roomtype', function(req, res) {
       var Language = language(req);
       var param = {
          size: 15,
          page: req.query.page?req.query.page : 1,
       }
       Room.typeListPage(param,function(err,data){
          data.pageInfo.page = param.page;
          data.pageInfo.pageTotle = Math.ceil(data.pageInfo.totle/param.size);

          res.render('RoomTypeMan',
            { 
              adminInfo:req.session.administrator,
              language:Language,
              typeList:data.typeList,
              pageInfo:data.pageInfo
            });
       })
    });

    
    app.get('/addroomtype', function(req, res) {
       var Language = language(req);
       res.render('AddRoomType',{adminInfo:req.session.administrator,language:Language});
    });

    app.get('/editroomtype',function(req, res) {
       var id = req.query.id;
        var Language = language(req);
       Room.roomTypeInfo(id,function(data){
          res.render('EditRoomType',{data:data,adminInfo:req.session.administrator,language:Language});
       })
    });

    // app.get('/room', function(req, res) {
    //    var Language = language(req);
    //    res.render('RoomManage',{adminInfo:req.session.administrator,language:Language});
    // });
    
    app.get('/room', function(req, res) {
       var Language = language(req);
       var param = {
          size: 15,
          page: req.query.page?req.query.page : 1,
          typeId: req.query.typeId ? req.query.typeId : null
       }
       Room.roomListPage(param,function(err,data){
          data.pageInfo.page = param.page;
          data.pageInfo.typeId = req.query.typeId ? req.query.typeId : -1;
          data.pageInfo.pageTotle = Math.ceil(data.pageInfo.totle/param.size);

          res.render('RoomMan',
            { 
              adminInfo:req.session.administrator,
              language:Language,
              roomList:data.roomList,
              typeList:data.typeList,
              pageInfo:data.pageInfo
            });
       })
    });


    app.get('/addroom', function(req, res) {
       var Language = language(req);
       res.render('AddRoom',{adminInfo:req.session.administrator,language:Language});
    });


    app.get('/editroom',function(req, res) {
       var id = req.query.id;
       var Language = language(req);
       Room.roomInfoPage(id,function(err,data){
          res.render('EditRoom',
            { data:data.roomInfo,
              adminInfo:req.session.administrator,
              typeList:data.typeList,
              language:Language
          });
       })
    });
    
    app.get('/task', function(req, res) {
       var Language = language(req);
       res.render('TaskManage',{adminInfo:req.session.administrator,language:Language});
    });

    app.get('/addtask', function(req, res) {
       var Language = language(req);
       res.render('AddTask',{adminInfo:req.session.administrator,language:Language});
    });

    app.get('/checkin', function(req, res) {
       var Language = language(req);
       res.render('CheckInManage',{adminInfo:req.session.administrator,language:Language});
    });
    

    app.get('/addcheckin', function(req, res) {
       var Language = language(req);
       res.render('AddCheckIn',{adminInfo:req.session.administrator,language:Language});
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

    app.get('/api/role/list',Role.getList); //获取角色列表

    app.get('/api/department/list',Department.getList); //获取部门列表

    app.get('/api/checkin/list',CheckIn.getList); //获取入住信息列表

    app.post('/api/checkin/add',CheckIn.add); //添加入住信息

    app.get('/api/room/nocheckin',Room.noCheckIn);//获取指定房型下没入住的房间
    
}