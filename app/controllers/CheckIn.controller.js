var CheckIn = require('../proxy/CheckIn.proxy');
var resUtil  = require("../libs/resUtil");
var config = require('../../config/env/statusConfig');
var timeFunc  = require("../func/timeFunc");


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
            if(parseInt(rows[i].status) == 1){
                rows[i].statusStr = "入住中"
            }else{
                rows[i].statusStr = "已退房"
            }
        }
        res.json(resUtil.generateRes(rows, config.statusCode.STATUS_OK));       
    })
}