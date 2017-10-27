var mysql = require('../mysql');
var Mapping = require('../../config/env/sqlMapping');

/**
 * 创建任务 
 * @param  {obj}   data   要创建的任务信息        
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.add = function(data, callback) {
	console.log(data)
    var nowDate = Date.parse(new Date())/1000;  
    mysql.query({
        sql: "INSERT INTO tbl_task SET executor= :executor, roomId=:roomId, content=:content, taskType=:taskType, state=:state, createTime=:createTime",
        params: {  
        	"executor": data.executor,
            "roomId" : data.roomId,
            "taskType" : data.taskType,
            "content": data.content,
            "state": 0,
            "createTime": nowDate
        }
    }, function(err) {
        if (err) {
            callback(err);
        }
        callback(null);

    })
}



/**
 * 获取任务列表
 * @param  {obj}   param   查询参数             
 * @param  {Function} callback 回调函数
 * @return {null}
 */ 
exports.getList = function(param, callback) {
    var sqlObj = {
        sql: "SELECT * FROM tbl_task order by id desc"
    };

    if(param.page && param.size){
        var page = Number(param.page);
        var size = Number(param.size);
        var limit_Start = (page - 1) * size;
        sqlObj = {
            sql: "SELECT a.*,b.name AS executorName,c.number AS roomNumber FROM tbl_task AS a LEFT JOIN tbl_users AS b ON b.idCode = a.executor LEFT JOIN tbl_roominfo AS c ON c.id=a.roomId order by a.id desc limit :limit_Start,:size",
            params: {
              "limit_Start": limit_Start,
              "size": size
            }
        }
    }

    mysql.query(sqlObj, function(err, rows) {
        if (err) {
            callback(err, null);
        }

        if (rows && rows.length > 0) {
            callback(null, rows);
        } else {
            callback(null, []);
        }
    })
}




/**
 * 根据房间Id获取当天任务状态 
 * @param  {number}   roomId   房间Id        
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.todayRoomTask = function(roomId, callback) {
    var todayStart = new Date();
    todayStart.setHours(0);
    todayStart.setMinutes(0);
    todayStart.setSeconds(0);
    var todayEnd = new Date();
    todayEnd.setHours(23);
    todayEnd.setMinutes(59);
    todayEnd.setSeconds(59);

    todayStart = Date.parse(todayStart)/1000;
    todayEnd = Date.parse(todayEnd)/1000;

    mysql.query({
        sql: "SELECT * FROM tbl_task WHERE roomId=:roomId AND CONVERT(createTIme,SIGNED) < :todayEnd AND CONVERT(createTIme,SIGNED) > :todayStart",
        params: {
            "roomId": roomId,
            "todayStart": todayStart,
            "todayEnd": todayEnd
        }
    }, function(err,rows) {
        if (err) {
            callback(err, null);
        }

        if (rows && rows.length > 0) {
            callback(null, rows);
        } else {
            callback(null, []);
        }
    })
}


/**
 * 根据房间Id获取今天之前未完成任务 
 * @param  {number}   roomId   房间Id        
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.beforeRoomTask = function(roomId, callback) {
    var todayStart = new Date();
    todayStart.setHours(0);
    todayStart.setMinutes(0);
    todayStart.setSeconds(0);


    todayStart = Date.parse(todayStart)/1000;

    mysql.query({
        sql: "SELECT * FROM tbl_task WHERE roomId=:roomId AND state=0 AND CONVERT(createTIme,SIGNED) < :todayStart",
        params: {
            "roomId": roomId,
            "todayStart": todayStart
        }
    }, function(err,rows) {
        if (err) {
            callback(err, null);
        }

        if (rows && rows.length > 0) {
            callback(null, rows);
        } else {
            callback(null, []);
        }
    })
}