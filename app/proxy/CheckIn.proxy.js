const mysql = require('../mysql');



/**
 * 获取入住信息列表
 * @param  {obj}   param   查询参数             
 * @param  {Function} callback 回调函数
 * @return {null}
 */ 
exports.getList = (param, callback) => {
    let sqlObj = {
        sql: "SELECT * FROM tbl_checkin order by id desc"
    };

    if(param.page && param.size){
        let page = parseInt(param.page);
        let size = parseInt(param.size);
        let limit_Start = (page - 1) * size;
        sqlObj = {
            sql: "SELECT c.* FROM (SELECT a.*,b.number AS roomNumber,b.checkInStatus FROM tbl_checkin AS a LEFT JOIN tbl_roominfo AS b ON a.roomId=b.id) AS c WHERE c.checkInStatus=1 ORDER BY c.id desc limit :limit_Start,:size",
            params: {
              "limit_Start": limit_Start,
              "size": size
            }
        }
    }

    mysql.query(sqlObj, (err, rows) => {
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
exports.add = (data, callback) => {
    mysql.query({
        sql: "INSERT INTO tbl_checkin SET roomId= :roomId,checkInTime = :checkInTime,checkOutTime = :checkOutTime,guestName = :guestName",
        params: {  
            "roomId": data.roomId,
            "checkInTime": data.checkInTime,
            "checkOutTime": data.checkOutTime,
            "guestName": data.guestName
        }
    }, err => {
        if (err) {
            callback(err);
        }
        callback(null);

    })
}


/**
 * 修改入住信息 
 * @param  {obj}   data   要添加的入住信息        
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.edit = (data, callback) => {
    mysql.query({
        sql: "UPDATE tbl_checkin SET checkInTime = :checkInTime,checkOutTime = :checkOutTime WHERE id= :id",
        params: {  
            "id": data.id,
            "checkInTime": data.checkInTime,
            "checkOutTime": data.checkOutTime
        }
    }, err => {
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
exports.editCheckInStatus = (roomId,status, callback) => {
    mysql.query({
        sql: "UPDATE tbl_roominfo SET checkInStatus=:checkInStatus WHERE id= :id",
        params: {
            "id": roomId,
            "checkInStatus": status
        }
    }, err => {
        if (err) {
            callback(err);
        }
        callback(null);

    })
}



/**
 * 根据Id获取入住信息 
 * @param  {number}   id   入住信息Id       
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.getInfoById = (id, callback) => {
    mysql.query({
        sql: "SELECT a.*,b.number,c.type FROM tbl_checkin AS a LEFT JOIN tbl_roominfo AS b ON a.roomId=b.id LEFT JOIN tbl_roomtype AS c ON b.typeId = c.id WHERE a.id=:id ORDER BY a.id desc",
        params: {  
            "id": id
        }
    }, (err,rows) => {
        if (err) {
            callback(err, null);
        }

        if (rows && rows.length > 0) {
            callback(null, rows[0]);
        } else {
            callback(null, null);
        }
    })
}