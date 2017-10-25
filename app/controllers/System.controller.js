var System = require('../proxy/System.proxy');
var resUtil  = require("../libs/resUtil");
var config = require('../../config/env/statusConfig');
var encryption = require("../func/encryption");

/**
 * 系统管理员登陆
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.login = function(req, res, next) {
    if(!req.body.username || !req.body.password) return res.json(resUtil.generateRes(null, config.statusCode.STATUS_INVAILD_PARAMS));
    System.login(req.body.username,function(err,rows) {
        if (err) {
            return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
        }
        if(!rows){
        	//登陆账号不存在
        	return res.json(resUtil.generateRes(null, config.AdminStatus.USER_ERROR));
        }

        var password = encryption.md5(req.body.password,32);
        if(password == rows.password){
            //登陆账号密码都正确
            //登陆权限判定
            if(Number(rows.roleId) == 1 || Number(rows.roleId) == 3){
                req.session.administrator = rows;
                req.session.languageType = 1;
                res.json(resUtil.generateRes(rows, config.AdminStatus.SUCCESS));   
            }else{
                return res.json(resUtil.generateRes(rows, config.AdminStatus.NO_PERMISSION));
            }   	  	
        }else{
        	//登陆密码错误
            res.json(resUtil.generateRes(null, config.AdminStatus.PASSWORD_ERROR));
        }      
    })
}


/**
 * 退出后台登陆
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.exit = function(req,res,next) {
    delete req.session.administrator;
    res.json(resUtil.generateRes(null, config.AdminStatus.EXIT_SUCCESS))
}


/**
 * 切换语言
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.language = function(req,res,next){
       req.session.languageType = parseInt(req.query.type);
       res.json(resUtil.generateRes(null, config.statusCode.STATUS_OK));
}