var CheckIn = require('../proxy/CheckIn.proxy');
var resUtil  = require("../libs/resUtil");
var config = require('../../config/env/statusConfig');
var timeFunc  = require("../func/timeFunc");
var Common = require('../proxy/Common.proxy');
var async = require('async');
var Task = require('../proxy/Task.proxy');


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
 * 修改入住信息
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.edit = function(req, res, next) {
    var data = {
        id: req.body.id,
        checkInTime: req.body.checkInTime,
        checkOutTime: req.body.checkOutTime,
    } 
    CheckIn.edit(data, function(err){
        if (err) {
            return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
        }
        res.json(resUtil.generateRes(null, config.statusCode.STATUS_OK));
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
          // CheckIn.getList(param,function(err,rows) {
          //    for(var i=0;i<rows.length;i++){
          //      rows[i].checkInTime = timeFunc.toStr(rows[i].checkInTime);
          //      rows[i].checkOutTime = timeFunc.toStr(rows[i].checkOutTime);
          //    }
          //    cb(err,rows)
          // })
          


          CheckIn.getList(param,function(err,rows) {
            if (rows.length > 0) {
                var i = 0;
                getRoomTask(rows, i, rows.length,function(obj){
                  for (var i = 0; i < rows.length; i++) {
                    rows[i].checkInTime = timeFunc.toStr(rows[i].checkInTime);
                    rows[i].checkOutTime = timeFunc.toStr(rows[i].checkOutTime);
                  }
                  cb(err,rows)
                })
            }else{
               cb(err,rows)
            }      
          })
       },
       pageInfo: function(cb){
          var str = 'tbl_checkin';
          Common.totleNum(str,function(err,rows) {
             cb(err,rows[0])
          })
       }
    },function(err, results) {
        console.log(results.checkInList[0].todayTask)
        console.log(results.checkInList[0].beforeTask)
        cb(err,results)   
    });  
}



function getRoomTask(obj,a,b,cb){
    async.series({
       todayTask: function(cb){
          Task.todayRoomTask(obj[a].roomId,function(err,rows) {     
             cb(err,rows)
          })
       },
       beforeTask: function(cb){
          Task.beforeRoomTask(obj[a].roomId,function(err,rows) {     
             cb(err,rows)
          })
       }
    },function(err, results) {
        obj[a].todayTask = results.todayTask;
        obj[a].beforeTask = results.beforeTask;
        if(a < b-1){
           a+=1;
           getRoomTask(obj,a,b)
        }else{
          cb(obj)
        }     
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


/**
 * 修改入住信息页面
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.editCheckInPage = function(param,cb) {
    async.series({
       dataInfo: function(cb){
          CheckIn.getInfoById(param.id,function(err,obj) {
             obj.checkInDateStr = dateTime(obj.checkInTime,1);
             obj.checkInTimeStr = dateTime(obj.checkInTime,2);
             obj.checkOutDateStr = dateTime(obj.checkOutTime,1);
             obj.checkOutTimeStr = dateTime(obj.checkOutTime,2);
             cb(err,obj)
          })
       }
       
    },function(err, results) {
      console.log(results)
        cb(err,results)   
    });  
}







function dateTime(timeStamp,type){
       var datetime = new Date(parseInt(timeStamp) * 1000);
       if(type == 1){
        var year = datetime.getFullYear();
        var month = (datetime.getMonth()+1) < 10 ? "0"+(datetime.getMonth()+1) : datetime.getMonth()+1;
        var date = datetime.getDate() < 10 ? "0"+datetime.getDate() : datetime.getDate();
        return year+"-"+month+"-"+date;
       }else{
        var hours = datetime.getHours() < 10 ? "0"+datetime.getHours() : datetime.getHours();
        var minutes = datetime.getMinutes() < 10 ? "0"+datetime.getMinutes() : datetime.getMinutes();
        return hours+":"+minutes;
       }     
}


