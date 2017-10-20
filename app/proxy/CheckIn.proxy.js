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
            sql: "SELECT a.*,b.number AS roomNumber FROM tbl_checkin AS a LEFT JOIN tbl_roominfo AS b ON a.roomId=b.id ORDER BY id desc limit :limit_Start,:size",
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