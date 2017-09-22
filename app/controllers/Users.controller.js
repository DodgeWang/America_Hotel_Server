var Users = require('../proxy/Users.proxy');
var resUtil  = require("../libs/resUtil");
var config = require('../../config/env/statusConfig');
var encryption = require("../func/encryption");
var UUID = require("../func/UUID");
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
 * 删除用户
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.delete = function(req, res, next) {
    if (!req.query.idCode) return res.json(resUtil.generateRes(null, config.statusCode.STATUS_INVAILD_PARAMS));
    var idCode = req.query.idCode;
    Users.delete(idCode, function(err,rows) {
        if (err) {
            return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
        }
        res.json(resUtil.generateRes(rows, config.statusCode.STATUS_OK));       
    })
}



/**
 * 用户密码重置
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.resetpass = function(req, res, next) {
    if (!req.query.idCode) return res.json(resUtil.generateRes(null, config.statusCode.STATUS_INVAILD_PARAMS));
    var idCode = req.query.idCode;
    var password = encryption.md5("000000",32);
    Users.editPassword(idCode, password, function(err,rows) {
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

    var idCode = UUID.uuid(16, 16); //随机生成UUID唯一识别码
    var baseInfo = {
        Username: req.body.Username,
        Password: encryption.md5(req.body.Password,32),
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
        

    Users.addBaseInfo(idCode, baseInfo, function(err){
    	if (err) {
            return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
        }
        
        //添加高中教育信息
        addSchool(0,idCode,strTo(req.body.High_School), 1, res, function(){
          //添加大学教育信息
          addSchool(0,idCode,strTo(req.body.College_School), 2, res, function(){ 
             //添加工作经历信息
             addWork(0,idCode,strTo(req.body.Work_Experience), res, function(){
                //添加熟人信息
                addReferences(0,idCode,strTo(req.body.References), res,function(){
                  res.json(resUtil.generateRes(null, config.statusCode.STATUS_OK));
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
exports.userInfoById = function(req,res,next) {
    if (!req.query.userIdCode) return res.json(resUtil.generateRes(null, config.statusCode.STATUS_INVAILD_PARAMS));
    var idCode = req.query.userIdCode;
    var data = {}
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
                res.render('EditUser',{data:data,adminInfo:req.session.administrator});
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
exports.edit = function(req, res, next) {
    console.log(req.body)

    var idCode = req.body.IdCode; //获取用户唯一识别码
    var baseInfo = {
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
        

    Users.editBaseInfo(idCode, baseInfo, function(err){
      if (err) {
            return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
        }
        //添加高中教育信息
        editSchool(0,idCode,strTo(req.body.High_School), 1, res, function(){
          //添加大学教育信息
          editSchool(0,idCode,strTo(req.body.College_School), 2, res, function(){ 
             //添加工作经历信息
             editWork(0,idCode,strTo(req.body.Work_Experience), res, function(){
                //添加熟人信息
                editReferences(0,idCode,strTo(req.body.References), res, function(){
                  res.json(resUtil.generateRes(null, config.statusCode.STATUS_OK));
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
            return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
          }
          Users.addSchool(idCode, list[i], type, function(err) {
            if (err) {
              return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
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
            return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
          }
          Users.addWork(idCode, list[i], function(err) {
            if (err) {
              return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
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
            return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
          }
          Users.addReferences(idCode, list[i], function(err) {
            if (err) {
              return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
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
            return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
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
            return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
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
            return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
          }
           if(i < list.length-1){
              i += 1;
              addReferences(i,idCode,list, res, cb)
            }else{
              cb()
           }
        }) 
    }



// var data = {
//           UserId : 1,
//           Username : "wangdaiqiang@qq.com",
//           Password : "123456",

//           Name : "wangdaiqiang",
//           Social_security_Number : "510622199308152716",
//           Mailing_Address : "四川省绵竹市",
//           city_state_Zip_Code : "618200",
//           Telephone : "18281865016",
//           Age : "25",
//           Email : "453831794@qq.com",

//           Days_work : [1,2,3,0],
//           Work_nature : 0,
//           Work_hours : "13",
//           Work_at_night : 0,
//           Work_available_date : "19-9-2017",

//           Is_Legal_status : 0,
//           Have_Criminal_Record : 0,
//           Criminal_Record : "抢劫",
//           Have_DL : 0,
//           DL_Number : "9859598",
//           DL_Issued_State : "华盛顿",

//           Is_Jioned_Army : 0,
//           Is_Member_NG : 0,
//           Military_Specialty : "狙击手",

//           High_School : [{
//             Name : "绵竹实验中学",
//             Address : "绵竹滨河路东段",
//             Years_Completed : "20-06-2009",
//             Major : "无",
//             Degree_Diploma : "初中" 
//           },{
//             Name : "绵竹中学",
//             Address : "绵竹新城",
//             Years_Completed : "20-06-2012",
//             Major : "理科",
//             Degree_Diploma : "高中" 
//           }],
//           College_School : [{
//             Name : "四川文理学院",
//             Address : "达州南坝街",
//             Years_Completed : "20-06-2016",
//             Major : "计算机科学与技术",
//             Degree_Diploma : "本科" 
//           },{
//             Name : "清华大学",
//             Address : "北京",
//             Years_Completed : "20-06-2019",
//             Major : "计算机",
//             Degree_Diploma : "硕士" 
//           }],
//           Work_Experience : [{
//             Name : "四川有乐信息技术有限公司",
//             Supervisor : "张国良",
//             Hours : "8",
//             Address : "成都市高新区益州大道移动互联创业大厦1011",
//             ZipCode : "658741",
//             Phone : "18281865044",
//             Job_Title : "前端工程师",
//             Start_Date : "01-12-2015",
//             End_Date : "19-09-2017",
//             Start_Salary : "3000",
//             End_Salary : "7000",
//             Reason_Leaving : "技术提升不够",
//             Self_Summary : "在公司学到了很多东西",
//             Could_Contact :0
//           },{
//             Name : "四川有乐信息技术有限公司2",
//             Supervisor : "张国良",
//             Hours : "8",
//             Address : "成都市高新区益州大道移动互联创业大厦1011",
//             ZipCode : "658741",
//             Phone : "18281865044",
//             Job_Title : "前端工程师",
//             Start_Date : "01-12-2015",
//             End_Date : "19-09-2017",
//             Start_Salary : "3000",
//             End_Salary : "7000",
//             Reason_Leaving : "技术提升不够",
//             Self_Summary : "在公司学到了很多东西",
//             Could_Contact :1
//           }],
//           References: [{
//             Content : "熟人信息一"
//           },{
//             Content : "熟人信息二"
//           }]
//         }

