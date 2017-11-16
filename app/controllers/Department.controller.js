const Department = require('../proxy/Department.proxy');
const resUtil  = require("../libs/resUtil");
const Status = require('../../config/status_config');

/**
 * 获取部门列表
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.getList = (req, res, next) => {
    Department.getList( (err,rows) => {
        if (err) {
            return res.json(resUtil.generateRes(err, Status.ERROR));
        }
        res.json(resUtil.generateRes(rows, Status.SUCCESS));       
    })
}