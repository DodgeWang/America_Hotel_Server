const Users = require('../proxy/Users.proxy');
const Common = require('../proxy/Common.proxy');
const Department = require('../proxy/Department.proxy');
const Role = require('../proxy/Role.proxy');
const resUtil  = require("../libs/resUtil");
const encryption = require("../func/encryption");
const UUID = require("../func/UUID");
const language = require('../../config/language_config');
const async = require('async');
const Status = require('../../config/status_config');



/**
 * 进入员工列表页
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.usersListPage = (param,cb) => {
    async.series({
       userList: cb => {
          Users.getList(param,(err,rows) => {
             cb(err,rows)
          })
       },
       pageInfo: cb => {
          let str = 'tbl_users';
          Common.totleNum(str, (err,rows) => {
             cb(err,rows[0])
          })
       }
    }, (err, results) => {
        cb(err,results)   
    });  
}





/**
 * 获取用户列表
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.getList = (req, res, next) => {
    Users.getList(req.query, (err,rows) => {
        if (err) {
            return res.json(resUtil.generateRes(err, Status.ERROR));
        }
        res.json(resUtil.generateRes(rows, Status.SUCCESS));       
    })
}


/**
 * 删除用户
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.delete = (req, res, next) => {
    if (!req.query.idCode) return res.json(resUtil.generateRes(null, Status.INVAILD_PARAMS));
    let idCode = req.query.idCode;
    Users.delete(idCode, err => {
        if (err) {
            return res.json(resUtil.generateRes(err, Status.ERROR));
        }
        res.json(resUtil.generateRes(null, Status.SUCCESS));       
    })
}



/**
 * 用户密码重置
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.resetpass = (req, res, next) => {
    if (!req.query.idCode) return res.json(resUtil.generateRes(null, Status.INVAILD_PARAMS));
    let idCode = req.query.idCode;
    let password = encryption.md5("000000",32);
    Users.editPassword(idCode, password, err => {
        if (err) {
            return res.json(resUtil.generateRes(err, Status.ERROR));
        }
        res.json(resUtil.generateRes(null, Status.SUCCESS));       
    })
}



/**
 * 添加用户
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.add = (req, res, next) => {
    console.log(req.body)

    let idCode = UUID.uuid(16, 16); //随机生成UUID唯一识别码
    let baseInfo = {
        Username: req.body.Username,
        Password: encryption.md5(req.body.Password,32),
        DepartmentId: req.body.DepartmentId,
        RoleId: req.body.RoleId,
        Name: req.body.Name,
        Social_security_Number: req.body.Social_security_Number,
        Mailing_Address: req.body.Mailing_Address,
        city_state_Zip_Code: req.body.city_state_Zip_Code,
        Telephone: req.body.Telephone,
        Age: req.body.Age,
        Email: req.body.Email,
        Days_work: req.body.Days_work,
        Work_nature: req.body.Work_nature,
        Work_hours: req.body.Work_hours,
        Work_at_night: req.body.Work_at_night,
        Work_available_date: req.body.Work_available_date,
        Is_Legal_status: req.body.Is_Legal_status,
        Have_Criminal_Record: req.body.Have_Criminal_Record,
        Criminal_Record: req.body.Criminal_Record,
        Have_DL: req.body.Have_DL,
        DL_Number: req.body.DL_Number,
        DL_Issued_State: req.body.DL_Issued_State,
        Is_Jioned_Army: req.body.Is_Jioned_Army,
        Is_Member_NG: req.body.Is_Member_NG,
        Military_Specialty: req.body.Military_Specialty
    }
        

    Users.addBaseInfo(idCode, baseInfo, err => {
    	if (err) {
            return res.json(resUtil.generateRes(err, Status.ERROR));
        }


        
        //添加高中教育信息
        addSchool(0,idCode,strTo(req.body.High_School), 1, res, function(){
          //添加大学教育信息
          addSchool(0,idCode,strTo(req.body.College_School), 2, res, function(){ 
             //添加工作经历信息
             addWork(0,idCode,strTo(req.body.Work_Experience), res, function(){
                //添加熟人信息
                addReferences(0,idCode,strTo(req.body.References), res,function(){
                  res.json(resUtil.generateRes(null, Status.SUCCESS));
                })  
             })
          })
        })
    })
}


/**
 * 根据用户Id获取用户详情
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.userInfoById = (req,res,next) => {
    if (!req.query.userIdCode) return res.json(resUtil.generateRes(null, Status.INVAILD_PARAMS));
    var Language = language(req);
    var idCode = req.query.userIdCode;
    var data = {}
    var departmentList = [];
    var roleList = [];
    Users.userBaseInfo(idCode, function(err,obj) {
        // if (err) {
        //     return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
        // }
        // var data = {}
        if(obj != null){
          data = obj;
          data.Days_work = null ? [] : data.Days_work.split(",");
        }
        
        Users.userSchoolInfo(idCode, 1, function(err,obj) {
          // if (err) {
          //   return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
          // }
          data.High_School = obj;
          Users.userSchoolInfo(idCode, 2, function(err,obj) {
            // if (err) {
            //   return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
            // }
            data.College_School = obj;
            Users.userWorkInfo(idCode, function(err,obj) {
              // if (err) {
              //   return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
              // }
              data.Work_Experience = obj;
              Users.userReferencesInfo(idCode, function(err,obj) {
                // if (err) {
                //   return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
                // }
                data.References = obj;
                Department.getList(function(err,rows) {
                   departmentList = rows;
                   Role.getList(function(err,rows) {
                      roleList = rows;
                      res.render('EditUser',{data:data,adminInfo:req.session.administrator,departmentList:departmentList,roleList:roleList,language:Language});
                   })            
                })
                
              })
            }) 
          }) 
        })           
    })
}



/**
 * 修改用户信息
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.edit = (req, res, next) => {
    var idCode = req.body.IdCode; //获取用户唯一识别码
    var baseInfo = {
        Name: req.body.Name,
        DepartmentId: req.body.DepartmentId,
        RoleId: req.body.RoleId,
        Social_security_Number: req.body.Social_security_Number,
        Mailing_Address: req.body.Mailing_Address,
        city_state_Zip_Code: req.body.city_state_Zip_Code,
        Telephone: req.body.Telephone,
        Age: req.body.Age,
        Email: req.body.Email,
        Days_work: req.body.Days_work,
        Work_nature: req.body.Work_nature,
        Work_hours: req.body.Work_hours,
        Work_at_night: req.body.Work_at_night,
        Work_available_date: req.body.Work_available_date,
        Is_Legal_status: req.body.Is_Legal_status,
        Have_Criminal_Record: req.body.Have_Criminal_Record,
        Criminal_Record: req.body.Criminal_Record,
        Have_DL: req.body.Have_DL,
        DL_Number: req.body.DL_Number,
        DL_Issued_State: req.body.DL_Issued_State,
        Is_Jioned_Army: req.body.Is_Jioned_Army,
        Is_Member_NG: req.body.Is_Member_NG,
        Military_Specialty: req.body.Military_Specialty
    }
        

    Users.editBaseInfo(idCode, baseInfo, function(err){
      if (err) {
            return res.json(resUtil.generateRes(err, Status.ERROR));
        }
        //添加高中教育信息
        editSchool(0,idCode,strTo(req.body.High_School), 1, res, function(){
          //添加大学教育信息
          editSchool(0,idCode,strTo(req.body.College_School), 2, res, function(){ 
             //添加工作经历信息
             editWork(0,idCode,strTo(req.body.Work_Experience), res, function(){
                //添加熟人信息
                editReferences(0,idCode,strTo(req.body.References), res, function(){
                  res.json(resUtil.generateRes(null, Status.SUCCESS));
                })  
             })
          })
        })
    })  
}












function strTo(str){
    var arrayList = str.split("_&_");
    for(var i = 0; i<arrayList.length;i++){
    	arrayList[i] = JSON.parse(arrayList[i]);
    }
    return arrayList;
}








function editSchool(i,idCode,list, type, res, cb) {
      Users.delSchool(idCode, type, function(err) {
          if (err) {
            return res.json(resUtil.generateRes(err, Status.ERROR));
          }
          Users.addSchool(idCode, list[i], type, function(err) {
            if (err) {
              return res.json(resUtil.generateRes(err, Status.ERROR));
            }
             if(i < list.length-1){
                i += 1;
                addSchool(i,idCode,list, type, res, cb)
              }else{
                cb()
             }
          }) 
      })
    }

    function editWork(i,idCode,list, res, cb) {
      Users.delWork(idCode, function(err) {
          if (err) {
            return res.json(resUtil.generateRes(err, Status.ERROR));
          }
          Users.addWork(idCode, list[i], function(err) {
            if (err) {
              return res.json(resUtil.generateRes(err, Status.ERROR));
            }
             if(i < list.length-1){
                i += 1;
                addWork(i,idCode,list, res, cb)
              }else{
                cb()
             }
          }) 
      })
    }


    function editReferences(i,idCode,list, res, cb) {
      Users.delReferences(idCode, function(err) {
          if (err) {
            return res.json(resUtil.generateRes(err, Status.ERROR));
          }
          Users.addReferences(idCode, list[i], function(err) {
            if (err) {
              return res.json(resUtil.generateRes(err, Status.ERROR));
            }
             if(i < list.length-1){
                i+= 1;
                addReferences(i,idCode,list, res, cb)
              }else{
                cb()
             }
          }) 
      })
    }

    function addSchool(i,idCode,list, type, res, cb) {
        Users.addSchool(idCode, list[i], type, function(err) {
          if (err) {
            return res.json(resUtil.generateRes(err, Status.ERROR));
          }
           if(i < list.length-1){
              i += 1;
              addSchool(i,idCode,list, type, res, cb)
            }else{
              cb()
           }
        }) 
    }

    function addWork(i,idCode,list, res, cb) {
        Users.addWork(idCode, list[i], function(err) {
          if (err) {
            return res.json(resUtil.generateRes(err, Status.ERROR));
          }
           if(i < list.length-1){
              i += 1;
              addWork(i,idCode,list, res, cb)
            }else{
              cb()
           }
        }) 
    }

    function addReferences(i,idCode,list, res, cb) {
        Users.addReferences(idCode, list[i], function(err) {
          if (err) {
            return res.json(resUtil.generateRes(err, Status.ERROR));
          }
           if(i < list.length-1){
              i += 1;
              addReferences(i,idCode,list, res, cb)
            }else{
              cb()
           }
        }) 
    }




