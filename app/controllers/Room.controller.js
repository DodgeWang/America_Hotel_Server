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
    if (!req.query.page || !req.query.size) return res.json(resUtil.generateRes(null, config.statusCode.STATUS_INVAILD_PARAMS));
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
    console.log(data)  
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
