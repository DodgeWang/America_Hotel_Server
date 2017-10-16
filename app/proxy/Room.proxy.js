var mysql = require('../mysql');
var Mapping = require('../../config/env/sqlMapping');

/**
 * 获取房型列表
 * @param  {number}   page   查询页数     
 * @param  {number}   size   查询条数         
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.getTypeList = function(page, size, callback) {
    var limit_Start = (page - 1) * size;
    mysql.query({
        sql: "SELECT * FROM tbl_roomtype order by id desc limit :limit_Start,:size",
        params: {
            "limit_Start": limit_Start,
            "size": size
        }
    }, function(err, rows) {
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
 * 根据指定id删除房型  
 * @param  {str}   id  房型id      
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.typeDelete = function(id, callback) {
    mysql.query({
        sql: "DELETE FROM tbl_roomtype WHERE id= :id",
        params: {  
            "id": id 
        }
    }, function(err) {
        if (err) {
            callback(err);
        }
        callback(null);

    })
}



/**
 * 添加房型 
 * @param  {obj}   data   要添加的房型信息        
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.typeAdd = function(data, callback) {
    mysql.query({
        sql: "INSERT INTO tbl_roomtype SET type= :type",
        params: {  
            "type": data.type

        }
    }, function(err) {
        if (err) {
            callback(err);
        }
        callback(null);

    })
}


/**
 * 根据Id获取房型信息    
 * @param  {str}   id   房型Id      
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.roomTypeInfo = function(id, callback) {
    mysql.query({
        sql: "SELECT "+Mapping.mappingToStr(Mapping.roomType)+" FROM tbl_roomtype WHERE id= :id",
        params: {
            "id": id
        }
    }, function(err, rows) {
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



/**
 * 修改房型信息    
 * @param  {str}   id   房型Id
 * @param  {obj}   data   要修改的房型信息          
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.typeEdit = function(id, data, callback) {
    mysql.query({
        sql: "UPDATE tbl_roomtype SET type=:type WHERE id= :id",
        params: {
            "id": id,
            "type": data.type
        }
    }, function(err) {
        if (err) {
            callback(err);
        }
        callback(null);

    })
}


/**
 * 获取房间列表
 * @param  {number}   page   查询页数     
 * @param  {number}   size   查询条数         
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.getList = function(page, size, callback) {
    var limit_Start = (page - 1) * size;
    mysql.query({
        sql: "SELECT a.id, a.number, b.type FROM tbl_roominfo as a,tbl_roomtype as b where a.typeId = b.id order by a.id desc limit :limit_Start,:size",
        params: {
            "limit_Start": limit_Start,
            "size": size
        }
    }, function(err, rows) {
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
 * 添加房间 
 * @param  {obj}   data   要添加的房型信息        
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.add = function(data, callback) {
    console.log(data)
    mysql.query({
        sql: "INSERT INTO tbl_roominfo SET number= :number,typeId = :typeId",
        params: {  
            "number": data.roomNum,
            "typeId": data.roomType
        }
    }, function(err) {
        if (err) {
            callback(err);
        }
        callback(null);

    })
}



/**
 * 根据指定id删除房间  
 * @param  {str}   id  房型id      
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.delete = function(id, callback) {
    mysql.query({
        sql: "DELETE FROM tbl_roominfo WHERE id= :id",
        params: {  
            "id": id 
        }
    }, function(err) {
        if (err) {
            callback(err);
        }
        callback(null);

    })
}


/**
 * 根据Id获取房间信息    
 * @param  {str}   id   房型Id      
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.roomInfo = function(id, callback) {
    mysql.query({
        sql: "SELECT "+Mapping.mappingToStr(Mapping.room)+" FROM tbl_roominfo WHERE id= :id",
        params: {
            "id": id
        }
    }, function(err, rows) {
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



/**
 * 修改房间信息    
 * @param  {str}   id   房间Id
 * @param  {obj}   data   要修改的房间信息          
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.edit = function(id, data, callback) {
    console.log(data)
    mysql.query({
        sql: "UPDATE tbl_roominfo SET number=:number,typeId=:typeId WHERE id= :id",
        params: {
            "id": id,
            "number": data.number,
            "typeId": data.type
        }
    }, function(err) {
        if (err) {
            callback(err);
        }
        callback(null);

    })
}
