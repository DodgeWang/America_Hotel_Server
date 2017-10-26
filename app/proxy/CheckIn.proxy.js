var mysql = require('../mysql');
var Mapping = require('../../config/env/sqlMapping');



/**
 * 获取入住信息列表
 * @param  {obj}   param   查询参数             
 * @param  {Function} callback 回调函数
 * @return {null}
 */ 
exports.getList = function(param, callback) {
    var sqlObj = {
        sql: "SELECT * FROM tbl_checkin order by id desc"
    };

    if(param.page && param.size){
        var page = Number(param.page);
        var size = Number(param.size);
        var limit_Start = (page - 1) * size;
        sqlObj = {
            sql: "SELECT c.* FROM (SELECT a.*,b.number AS roomNumber,b.checkInStatus FROM tbl_checkin AS a LEFT JOIN tbl_roominfo AS b ON a.roomId=b.id) AS c WHERE c.checkInStatus=1 ORDER BY c.id desc limit :limit_Start,:size",
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
 * 添加入住信息 
 * @param  {obj}   data   要添加的入住信息        
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.add = function(data, callback) {
    console.log(data)
    mysql.query({
        sql: "INSERT INTO tbl_checkin SET roomId= :roomId,checkInTime = :checkInTime,checkOutTime = :checkOutTime,guestName = :guestName",
        params: {  
            "roomId": data.roomId,
            "checkInTime": data.checkInTime,
            "checkOutTime": data.checkOutTime,
            "guestName": data.guestName
        }
    }, function(err) {
        if (err) {
            callback(err);
        }
        callback(null);

    })
}



/**
 * 修改房间入住状态    
 * @param  {str}   roomId   房间Id
 * @param  {obj}   status   要修改的房间入住状态  0代表没人住   1代表有人住          
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.editCheckInStatus = function(roomId,status, callback) {
    console.log(roomId)
    console.log(status)
    mysql.query({
        sql: "UPDATE tbl_roominfo SET checkInStatus=:checkInStatus WHERE id= :id",
        params: {
            "id": roomId,
            "checkInStatus": status
        }
    }, function(err) {
        if (err) {
            callback(err);
        }
        callback(null);

    })
}