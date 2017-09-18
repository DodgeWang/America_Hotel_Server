var Users = require('../proxy/Users.proxy');
var resUtil  = require("../libs/resUtil");
var config = require('../../config/env/statusConfig');
// var encryption = require("../func/encryption");
/**
 * 获取用户列表
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.getList = function(req, res, next) {
    if (!req.query.page || !req.query.size) return res.json(resUtil.generateRes(null, config.statusCode.STATUS_INVAILD_PARAMS));
    var page = Number(req.query.page);
    var size = Number(req.query.size);
    Users.getList(page, size, function(err,rows) {
        if (err) {
            return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
        }
        res.json(resUtil.generateRes(rows, config.statusCode.STATUS_OK));       
    })
}


/**
 * 添加用户
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.add = function(req, res, next) {
    console.log(req.body)
    
    var data = {
          Username : req.body.Username,
          Password : req.body.Password,
          Name : req.body.Name,
          Social_security_Number : req.body.Social_security_Number,
          Mailing_Address : req.body.Mailing_Address,
          city_state_Zip_Code : req.body.city_state_Zip_Code,
          Telephone : req.body.Telephone,
          Age : req.body.Age,
          Email : req.body.Email,
          Days_work : req.body.Days_work.split("_&_"),
          Work_nature : req.body.Work_nature,
          Work_hours : req.body.Work_hours,
          Work_at_night : req.body.Work_at_night,
          Work_available_date : req.body.Work_available_date,
          Is_Legal_status : req.body.Is_Legal_status,
          Have_Criminal_Record : req.body.Have_Criminal_Record,
          Criminal_Record : req.body.Criminal_Record,
          Have_DL : req.body.Have_DL,
          DL_Number : req.body.DL_Number,
          DL_Issued_State : req.body.DL_Issued_State,
          Is_Jioned_Army : req.body.Is_Jioned_Army,
          Is_Member_NG : req.body.Is_Member_NG,
          Military_Specialty : req.body.Military_Specialty,
          High_School : strTo(req.body.High_School),
          College_School : strTo(req.body.College_School),
          Work_Experience : strTo(req.body.Work_Experience)
        }
    console.log(data)
    Users.add(data, function(err,rows){
    	
    })
	
}


function strTo(str){
    var arrayList = str.split("_&_");
    for(var i = 0; i<arrayList.length;i++){
    	arrayList[i] = JSON.parse(arrayList[i]);
    }
    return arrayList;
}