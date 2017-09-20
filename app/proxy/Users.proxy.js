var mysql = require('../mysql');
var Mapping = require('../../config/env/sqlMapping');

/**
 * 获取用户列表
 * @param  {number}   page   查询页数     
 * @param  {number}   size   查询条数         
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.getList = function(page, size, callback) {
    var limit_Start = (page - 1) * size;
    mysql.query({
        sql: "SELECT * FROM tbl_users order by id desc limit :limit_Start,:size",
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
 * 根据用户id删除用户所有信息           
 * @param  {num}   idCode   用户唯一识别码         
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.delete = function(idCode, callback) {
    mysql.query({
        sql: "DELETE tbl_users,tbl_userschool,tbl_userworks,tbl_userreferences FROM tbl_users\
              LEFT JOIN tbl_userschool ON tbl_userschool.userIdCode=tbl_users.idCode AND tbl_users.idCode = :idCode\
              LEFT JOIN tbl_userworks ON tbl_userworks.userIdCode=tbl_users.idCode AND tbl_users.idCode = :idCode\
              LEFT JOIN tbl_userreferences ON tbl_userreferences.userIdCode=tbl_users.idCode AND tbl_users.idCode = :idCode\
              WHERE (tbl_userschool.userIdCode=tbl_users.idCode )\
              OR (tbl_userworks.userIdCode=tbl_users.idCode)\
              OR (tbl_userreferences.userIdCode=tbl_users.idCode)\
              OR (tbl_users.idCode = :idCode);",
        params: {
            "idCode": idCode
        }
    }, function(err, rows) {
        if (err) {
            callback(err, null);
        }
        callback(null,null);
    })
}

/**
 * 根据用户id获取用户基础信息    
 * @param  {num}   idCode   用户唯一识别码          
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.userBaseInfo = function(idCode, callback) {
    mysql.query({
        sql: "SELECT "+Mapping.mappingToStr(Mapping.userBaseInfo)+" FROM tbl_users WHERE idCode= :idCode",
        params: {
            "idCode": idCode
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
 * 添加用户基础信息    
 * @param  {obj}   data   要添加的用户基本信息          
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.addBaseInfo = function(data, callback) {
    mysql.query({
        sql: "INSERT INTO tbl_users VALUES ",
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
 * 根据用户id获取用户教育信息    
 * @param  {num}   idCode   用户唯一识别码 
 * @param  {num}   type   学校级别         
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.userSchoolInfo = function(idCode, type, callback) {
    mysql.query({
        sql: "SELECT "+Mapping.mappingToStr(Mapping.userSchool)+" FROM tbl_userschool WHERE userIdCode= :idCode AND type= :type",
        params: {
            "idCode": idCode,
            "type": type
        }
    }, function(err, rows) {
        if (err) {
            callback(err, null);
        }

        if (rows && rows.length > 0) {
            callback(null, rows);
        } else {
            callback(null, null);
        }
    })
}


/**
 * 根据用户id获取用户工作经历信息    
 * @param  {num}   idCode   用户唯一识别码         
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.userWorkInfo = function(idCode, callback) {
    mysql.query({
        sql: "SELECT "+Mapping.mappingToStr(Mapping.userWork)+" FROM tbl_userworks WHERE userIdCode= :idCode",
        params: {
            "idCode": idCode
        }
    }, function(err, rows) {
        if (err) {
            callback(err, null);
        }

        if (rows && rows.length > 0) {
            callback(null, rows);
        } else {
            callback(null, null);
        }
    })
}

/**
 * 根据用户id获取用户熟人信息    
 * @param  {num}   userId   用户id        
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.userReferencesInfo = function(idCode, callback) {
    mysql.query({
        sql: "SELECT "+Mapping.mappingToStr(Mapping.userReferences)+" FROM tbl_userreferences WHERE userIdCode= :idCode",
        params: {
            "idCode": idCode
        }
    }, function(err, rows) {
        if (err) {
            callback(err, null);
        }

        if (rows && rows.length > 0) {
            callback(null, rows);
        } else {
            callback(null, null);
        }
    })
}



/**
 * 添加新用户    
 * @param  {obj}   data   用户信息         
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.add = function(data, callback) {
    
}




