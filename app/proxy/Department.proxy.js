const mysql = require('../mysql');

/**
 * 获取部门列表        
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.getList = callback => {
    mysql.query({
        sql: "SELECT * FROM tbl_department order by id",
        params: {
        }
    }, (err, rows) => {
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