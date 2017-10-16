var Room = require('../proxy/Room.proxy');
var resUtil  = require("../libs/resUtil");
var config = require('../../config/env/statusConfig');
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
exports.roomInfo = function(id,cb) {  
    var data = {}
    Room.roomInfo(id, function(err,obj) {
        if(obj != null){
          data = obj;
        }
        Room.getTypeList(1,100,function(err,typeList){
            cb(data,typeList);
        })
    })
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
