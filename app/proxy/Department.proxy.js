var mysql = require('../mysql');
var Mapping = require('../../config/env/sqlMapping');

/**
 * 获取部门列表        
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.getList = function(callback) {
    mysql.query({
        sql: "SELECT * FROM tbl_department order by id",
        params: {
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