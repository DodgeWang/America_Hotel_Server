var mysql = require('../mysql');
/**
 * 获取指定数据表数据总数
 * @param  {String} tblName 数据表名        
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.totleNum = function(tblName, callback) {
    mysql.query({
        sql: "SELECT COUNT(*) AS totle FROM "+tblName,
        params: {}
    }, function(err, rows) {
        if (err) {
            callback(err, null);
        }
        callback(null, rows);
        
    })
}