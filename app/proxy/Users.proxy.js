var mysql = require('../mysql');

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
 * 添加用户    
 * @param  {obj}   data   用户信息         
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.add = function(data, callback) {
    
}