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
    mysql.query({
        sql: "INSERT INTO tbl_task SET executor= :executor, roomId=:roomId, content=:content, taskType=:taskType, state=:state, createTime=now()",
        params: {  
        	"executor": data.executor,
            "roomId" : data.roomId,
            "taskType" : data.taskType,
            "content": data.content,
            "state": 0
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