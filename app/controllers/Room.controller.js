var Room = require('../proxy/Room.proxy');
var resUtil  = require("../libs/resUtil");
var config = require('../../config/env/statusConfig');
var async = require('async');
/**
 * 获取房型列表
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.getTypeList = function(req, res, next) {
    // if (!req.query.page || !req.query.size) return res.json(resUtil.generateRes(null, config.statusCode.STATUS_INVAILD_PARAMS));
    var page = Number(req.query.page);
    var size = Number(req.query.size);
    Room.getTypeList(page, size, function(err,rows) {
        if (err) {
            return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
        }
        res.json(resUtil.generateRes(rows, config.statusCode.STATUS_OK));       
    })
}


/**
 * 删除房型
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.typeDelete = function(req, res, next) {
    if (!req.query.id) return res.json(resUtil.generateRes(null, config.statusCode.STATUS_INVAILD_PARAMS));
    var id = req.query.id;
    Room.typeDelete(id, function(err,rows) {
        if (err) {
            return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
        }
        res.json(resUtil.generateRes(rows, config.statusCode.STATUS_OK));       
    })
}


/**
 * 添加房型
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.typeAdd = function(req, res, next) {
    var data = {
        type: req.body.typeName
    } 
    Room.typeAdd(data, function(err){
    	if (err) {
            return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
        }
        res.json(resUtil.generateRes(null, config.statusCode.STATUS_OK));
    })
}


/**
 * 根据Id获取房型页面
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.roomTypeInfo = function(id,cb) {  
    var data = {}

    Room.roomTypeInfo(id, function(err,obj) {
    	if(obj != null){
          data = obj;
        }
        cb(data);
    })
}



/**
 * 修改房型
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.typeEdit = function(req, res, next) {
    var id = req.body.id; //房型id
    var data = {
        type: req.body.typeName
    }    

    Room.typeEdit(id, data, function(err){
      if (err) {
            return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
        }
        res.json(resUtil.generateRes(null, config.statusCode.STATUS_OK));
    })  
}



/**
 * 获取房间列表
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.getList = function(req, res, next) {
    if (!req.query.page || !req.query.size) return res.json(resUtil.generateRes(null, config.statusCode.STATUS_INVAILD_PARAMS));
    var page = Number(req.query.page);
    var size = Number(req.query.size);
    Room.getList(page, size, function(err,rows) {
        if (err) {
            return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
        }
        res.json(resUtil.generateRes(rows, config.statusCode.STATUS_OK));       
    })
}



/**
 * 添加房间
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.add = function(req, res, next) {
    var data = {
        roomNum: req.body.roomNum,
        roomType: req.body.roomType
    } 
    Room.add(data, function(err){
        if (err) {
            return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
        }
        res.json(resUtil.generateRes(null, config.statusCode.STATUS_OK));
    })
}



/**
 * 删除房间
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.delete = function(req, res, next) {
    if (!req.query.id) return res.json(resUtil.generateRes(null, config.statusCode.STATUS_INVAILD_PARAMS));
    var id = req.query.id;
    Room.delete(id, function(err,rows) {
        if (err) {
            return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
        }
        res.json(resUtil.generateRes(rows, config.statusCode.STATUS_OK));       
    })
}




/**
 * 根据Id获取房间页面
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.roomInfoPage = function(id,cb) {  
    async.series({
       roomInfo: function(cb){
          Room.roomInfo(id, function(err,obj) {
             var data = {}
             if(obj != null){
               data = obj;
             }
             cb(err,data)
          })
       },
       typeList: function(cb){
          Room.getAllTypeList(function(err,rows) {
             cb(err,rows)
          })
       }
    },function(err, results) {
        cb(err,results)   
    });
}


exports.roomListPage = function(req, cb) {
    async.series({
       roomList: function(cb){
          Room.getListTwo(req, function(err,rows) {
             cb(err,rows)
          })
       },
       typeList: function(cb){
          Room.getAllTypeList(function(err,rows) {
             cb(err,rows)
          })
       }
    },function(err, results) {
        cb(err,results)   
    });
    
}


/**
 * 修改房间
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.edit = function(req, res, next) {
    var id = req.body.id; //房间id
    var data = {
        number: req.body.roomNum,
        type: req.body.roomType
    }    
    Room.edit(id, data, function(err){
      if (err) {
            return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
        }
        res.json(resUtil.generateRes(null, config.statusCode.STATUS_OK));
    })  
}



/**
 * 获取指定房型下所有未入住的房间
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.noCheckIn = function(req, res, next) {
    var roomTypeId = req.query.roomTypeId; //房间类型ID
    Room.noCheckIn(roomTypeId, function(err,rows) {
        if (err) {
            return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
        }
        res.json(resUtil.generateRes(rows, config.statusCode.STATUS_OK));       
    })
}



/**
 * 进入房间列表页
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.roomListPage = function(param,cb) {
    async.series({
       roomList: function(cb){
          Room.getListTwo(param,function(err,rows) {
             cb(err,rows)
          })
       },
       typeList: function(cb){
          Room.getAllTypeList(function(err,rows) {
             cb(err,rows)
          })
       },
       pageInfo: function(cb){
          var str = 'tbl_roominfo';
          if(param.typeId){
              str = 'tbl_roominfo where typeId='+param.typeId;
          }
          Room.totleNum(str,function(err,rows) {
             cb(err,rows[0])
          })
       }
    },function(err, results) {
        cb(err,results)   
    });  
}


/**
 * 进入房间类型列表页
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.typeListPage = function(param,cb) {
    async.series({
       typeList: function(cb){
          Room.getTypeList(param.page,param.size,function(err,rows) {
             cb(err,rows)
          })
       },
       pageInfo: function(cb){
          var str = 'tbl_roomtype';
          Room.totleNum(str,function(err,rows) {
             cb(err,rows[0])
          })
       }
    },function(err, results) {
        console.log(results)
        cb(err,results)   
    });  
}








