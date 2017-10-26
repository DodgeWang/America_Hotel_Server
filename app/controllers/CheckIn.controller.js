var CheckIn = require('../proxy/CheckIn.proxy');
var resUtil  = require("../libs/resUtil");
var config = require('../../config/env/statusConfig');
var timeFunc  = require("../func/timeFunc");
var Common = require('../proxy/Common.proxy');
var async = require('async');


/**
 * 获取入住信息列表
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.getList = function(req, res, next) {
    CheckIn.getList(req.query, function(err,rows) {
        if (err) {
            return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
        }
        for(var i=0;i<rows.length;i++){
        	rows[i].checkInTime = timeFunc.toStr(rows[i].checkInTime);
            rows[i].checkOutTime = timeFunc.toStr(rows[i].checkOutTime);
            // if(parseInt(rows[i].status) == 1){
            //     rows[i].statusStr = "入住中"
            // }else{
            //     rows[i].statusStr = "已退房"
            // }
        }
        res.json(resUtil.generateRes(rows, config.statusCode.STATUS_OK));       
    })
}

/**
 * 添加入住信息
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.add = function(req, res, next) {
    var data = {
        roomId: req.body.roomId,
        guestName: req.body.guestName,
        checkInTime: req.body.checkInTime,
        checkOutTime: req.body.checkOutTime,
    } 
    CheckIn.add(data, function(err){
        if (err) {
            return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
        }
        CheckIn.editCheckInStatus(data.roomId,1, function(err){
           if (err) {
              return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
            }
           res.json(resUtil.generateRes(null, config.statusCode.STATUS_OK));
        })
    })
}



/**
 * 入住列表管理页
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.checkInListPage = function(param,cb) {
    async.series({
       checkInList: function(cb){
          CheckIn.getList(param,function(err,rows) {
             for(var i=0;i<rows.length;i++){
               rows[i].checkInTime = timeFunc.toStr(rows[i].checkInTime);
               rows[i].checkOutTime = timeFunc.toStr(rows[i].checkOutTime);
             }
             cb(err,rows)
          })
       },
       pageInfo: function(cb){
          var str = 'tbl_checkin';
          Common.totleNum(str,function(err,rows) {
             cb(err,rows[0])
          })
       }
    },function(err, results) {
        cb(err,results)   
    });  
}




/**
 * 退房
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.checkout = function(req, res, next) {
    var data = {
        roomId: req.query.roomId
    } 
    CheckIn.editCheckInStatus(data.roomId,0, function(err){
           if (err) {
              return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
            }
           res.json(resUtil.generateRes(null, config.statusCode.STATUS_OK));
    })
}
