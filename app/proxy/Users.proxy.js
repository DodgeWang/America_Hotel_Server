var mysql = require('../mysql');
var Mapping = require('../../config/env/sqlMapping');

/**
 * 获取用户列表
 * @param  {number}   page   查询页数     
 * @param  {number}   size   查询条数         
 * @param  {Function} callback 回调函数
 * @return {null}
 */
// exports.getList = function(page, size, callback) {
//     var limit_Start = (page - 1) * size;
//     mysql.query({
//         sql: "SELECT * FROM tbl_users order by id desc limit :limit_Start,:size",
//         params: {
//             "limit_Start": limit_Start,
//             "size": size
//         }
//     }, function(err, rows) {
//         if (err) {
//             callback(err, null);
//         }

//         if (rows && rows.length > 0) {
//             callback(null, rows);
//         } else {
//             callback(null, []);
//         }
//     })
// }
// 
// 
// 
exports.getList = function(param, callback) {
    var sqlObj = {
        sql: "SELECT * FROM tbl_users order by id desc"
    };

    if(param.page && param.size){
        var page = Number(param.page);
        var size = Number(param.size);
        var limit_Start = (page - 1) * size;
        sqlObj = {
            sql: "SELECT * FROM tbl_users order by id desc limit :limit_Start,:size",
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




/**
 * 根据用户识别码删除用户所有信息           
 * @param  {num}   idCode   用户唯一识别码         
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.delete = function(idCode, callback) {
    mysql.query({
        sql: "DELETE tbl_users,tbl_userschool,tbl_userworks,tbl_userreferences FROM tbl_users\
              LEFT JOIN tbl_userschool ON tbl_userschool.userIdCode=tbl_users.idCode AND tbl_users.idCode = :idCode\
              LEFT JOIN tbl_userworks ON tbl_userworks.userIdCode=tbl_users.idCode AND tbl_users.idCode = :idCode\
              LEFT JOIN tbl_userreferences ON tbl_userreferences.userIdCode=tbl_users.idCode AND tbl_users.idCode = :idCode\
              WHERE (tbl_userschool.userIdCode=tbl_users.idCode )\
              OR (tbl_userworks.userIdCode=tbl_users.idCode)\
              OR (tbl_userreferences.userIdCode=tbl_users.idCode)\
              OR (tbl_users.idCode = :idCode);",
        params: {
            "idCode": idCode
        }
    }, function(err, rows) {
        if (err) {
            callback(err, null);
        }
        callback(null,null);
    })
}




/**
 * 修改用户密码  
 * @param  {str}   idCode   生成的用户识别码
 * @param  {str}   password   新密码        
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.editPassword = function(idCode, password, callback) {
    mysql.query({
        sql: "UPDATE tbl_users SET password= :password WHERE idCode= :idCode",
        params: {  
            "password": password,
            "idCode": idCode
        }
    }, function(err) {
        if (err) {
            callback(err);
        }
        callback(null);

    })
}




/**
 * 根据用户识别码获取用户基础信息    
 * @param  {num}   idCode   用户唯一识别码          
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.userBaseInfo = function(idCode, callback) {
    mysql.query({
        sql: "SELECT "+Mapping.mappingToStr(Mapping.userBaseInfo)+" FROM tbl_users WHERE idCode= :idCode",
        params: {
            "idCode": idCode
        }
    }, function(err, rows) {
        if (err) {
            callback(err, null);
        }

        if (rows && rows.length > 0) {
            callback(null, rows[0]);
        } else {
            callback(null, null);
        }
    })
}



/**
 * 添加用户基础信息    
 * @param  {str}   idCode   生成的用户识别码
 * @param  {obj}   data   要添加的用户基本信息          
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.addBaseInfo = function(idCode, data, callback) {
    mysql.query({
        sql: "INSERT INTO tbl_users SET idCode= :idCode, username=:username, password=:password, departmentId=:departmentId, roleId=:roleId, name=:name, SSN=:SSN, mailAddress=:mailAddress, zipCode=:zipCode, telephone=:telephone, age=:age, email=:email, daysWork=:daysWork, workNature=:workNature, workHours=:workHours, workAtNight=:workAtNight,workAvailableDate=:workAvailableDate, isLegalStatus=:isLegalStatus, haveCriminalRecord=:haveCriminalRecord,criminalRecord=:criminalRecord, haveDL=:haveDL, DLNumber=:DLNumber, DLIssuedState=:DLIssuedState, IsJionedArmy=:IsJionedArmy, isMemberNG=:isMemberNG, militarySpecialty=:militarySpecialty, createTime=now()",
        params: {
            "idCode": idCode,
            "username": data.Username,
            "password": data.Password,
            "departmentId": data.DepartmentId,
            "roleId": data.RoleId,
            "name": data.Name,
            "SSN": data.Social_security_Number,
            "mailAddress": data.Mailing_Address,
            "zipCode": data.city_state_Zip_Code,
            "telephone": data.Telephone,
            "age": data.Age,
            "email": data.Email,
            "daysWork": data.Days_work,
            "workNature": data.Work_nature,
            "workHours": data.Work_hours,
            "workAtNight": data.Work_at_night,
            "workAvailableDate": data.Work_available_date,
            "isLegalStatus": data.Is_Legal_status,
            "haveCriminalRecord": data.Have_Criminal_Record,
            "criminalRecord": data.Criminal_Record,
            "haveDL": data.Have_DL,
            "DLNumber": data.DL_Number,
            "DLIssuedState": data.DL_Issued_State,
            "IsJionedArmy": data.Is_Jioned_Army,
            "isMemberNG": data.Is_Member_NG,
            "militarySpecialty": data.Military_Specialty
        }
    }, function(err) {
        if (err) {
            callback(err);
        }
        callback(null);

    })
}



/**
 * 修改用户基础信息    
 * @param  {str}   idCode   生成的用户识别码
 * @param  {obj}   data   要添加的用户基本信息          
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.editBaseInfo = function(idCode, data, callback) {
    mysql.query({
        sql: "UPDATE tbl_users SET departmentId=:departmentId, roleId=:roleId, name=:name, SSN=:SSN, mailAddress=:mailAddress, zipCode=:zipCode, telephone=:telephone, age=:age, email=:email, daysWork=:daysWork, workNature=:workNature, workHours=:workHours, workAtNight=:workAtNight,workAvailableDate=:workAvailableDate, isLegalStatus=:isLegalStatus, haveCriminalRecord=:haveCriminalRecord,criminalRecord=:criminalRecord, haveDL=:haveDL, DLNumber=:DLNumber, DLIssuedState=:DLIssuedState, IsJionedArmy=:IsJionedArmy, isMemberNG=:isMemberNG, militarySpecialty=:militarySpecialty WHERE idCode= :idCode",
        params: {
            "idCode": idCode,
            "departmentId": data.DepartmentId,
            "roleId": data.RoleId,
            "name": data.Name,
            "SSN": data.Social_security_Number,
            "mailAddress": data.Mailing_Address,
            "zipCode": data.city_state_Zip_Code,
            "telephone": data.Telephone,
            "age": data.Age,
            "email": data.Email,
            "daysWork": data.Days_work,
            "workNature": data.Work_nature,
            "workHours": data.Work_hours,
            "workAtNight": data.Work_at_night,
            "workAvailableDate": data.Work_available_date,
            "isLegalStatus": data.Is_Legal_status,
            "haveCriminalRecord": data.Have_Criminal_Record,
            "criminalRecord": data.Criminal_Record,
            "haveDL": data.Have_DL,
            "DLNumber": data.DL_Number,
            "DLIssuedState": data.DL_Issued_State,
            "IsJionedArmy": data.Is_Jioned_Army,
            "isMemberNG": data.Is_Member_NG,
            "militarySpecialty": data.Military_Specialty
        }
    }, function(err) {
        if (err) {
            callback(err);
        }
        callback(null);

    })
}







/**
 * 根据用户识别码获取用户教育信息    
 * @param  {num}   idCode   用户唯一识别码 
 * @param  {num}   type   学校级别         
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.userSchoolInfo = function(idCode, type, callback) {
    mysql.query({
        sql: "SELECT "+Mapping.mappingToStr(Mapping.userSchool)+" FROM tbl_userschool WHERE userIdCode= :idCode AND type= :type",
        params: {
            "idCode": idCode,
            "type": type
        }
    }, function(err, rows) {
        if (err) {
            callback(err, null);
        }

        if (rows && rows.length > 0) {
            callback(null, rows);
        } else {
            callback(null, null);
        }
    })
}



/**
 * 添加用户教育信息  
 * @param  {str}   idCode   生成的用户识别码  
 * @param  {obj}   data   要添加的教育信息  
 * @param  {str}   type   信息所属类型（1:高中,2:大学）        
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.addSchool = function(idCode, data, type, callback) {
    mysql.query({
        sql: "INSERT INTO tbl_userschool SET name= :name, address= :address, yearCompleted= :yearCompleted, major= :major, degreeDiploma= :degreeDiploma, type= :type, userIdCode= :userIdCode",
        params: {  
            "name": data.Name,
            "address": data.Address,
            "yearCompleted": data.Years_Completed,
            "major": data.Major,
            "degreeDiploma": data.Degree_Diploma,
            "type": type,
            "userIdCode": idCode
        }
    }, function(err) {
        if (err) {
            callback(err);
        }
        callback(null);

    })
}


/**
 * 删除用户教育信息  
 * @param  {str}   idCode   生成的用户识别码
 * @param  {str}   type   信息所属类型（1:高中,2:大学）        
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.delSchool = function(idCode, type, callback) {
    mysql.query({
        sql: "DELETE FROM tbl_userschool WHERE userIdCode= :userIdCode AND type= :type",
        params: {  
            "type": type,
            "userIdCode": idCode
        }
    }, function(err) {
        if (err) {
            callback(err);
        }
        callback(null);

    })
}



/**
 * 根据用户识别码获取用户工作经历信息    
 * @param  {num}   idCode   用户唯一识别码         
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.userWorkInfo = function(idCode, callback) {
    mysql.query({
        sql: "SELECT "+Mapping.mappingToStr(Mapping.userWork)+" FROM tbl_userworks WHERE userIdCode= :idCode",
        params: {
            "idCode": idCode
        }
    }, function(err, rows) {
        if (err) {
            callback(err, null);
        }

        if (rows && rows.length > 0) {
            callback(null, rows);
        } else {
            callback(null, null);
        }
    })
}




/**
 * 添加用户工作经历  
 * @param  {str}   idCode   生成的用户识别码  
 * @param  {obj}   data   要添加的工作经历信息        
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.addWork = function(idCode, data, callback) {
    mysql.query({
        sql: "INSERT INTO tbl_userworks SET name= :name, supervisor= :supervisor,\
         address= :address, zipCode= :zipCode, phone= :phone, hours= :hours,\
          jobTitle= :jobTitle, startDate= :startDate, endDate= :endDate,\
           startSalary= :startSalary, endSalary= :endSalary, reasonLeaving= :reasonLeaving,\
            selfSummary= :selfSummary, couldContact= :couldContact, userIdCode= :userIdCode",
        params: {  
            "name": data.Name,
            "supervisor": data.Supervisor,
            "address": data.Address,
            "zipCode": data.ZipCode,
            "phone": data.Phone,
            "hours": data.Hours,
            "jobTitle": data.Job_Title,
            "startDate": data.Start_Date,
            "endDate": data.End_Date,
            "startSalary": data.Start_Salary,
            "endSalary": data.End_Salary,
            "reasonLeaving": data.Reason_Leaving,
            "selfSummary": data.Self_Summary,
            "couldContact": data.Could_Contact,
            "userIdCode": idCode 

        }
    }, function(err) {
        if (err) {
            callback(err);
        }
        callback(null);

    })
}



/**
 * 删除用户工作经历  
 * @param  {str}   idCode   生成的用户识别码       
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.delWork = function(idCode, callback) {
    mysql.query({
        sql: "DELETE FROM tbl_userworks WHERE userIdCode= :userIdCode",
        params: {  
            "userIdCode": idCode 
        }
    }, function(err) {
        if (err) {
            callback(err);
        }
        callback(null);

    })
}



/**
 * 根据用户识别码获取用户熟人信息    
 * @param  {str}   idCode   生成的用户识别码        
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.userReferencesInfo = function(idCode, callback) {
    mysql.query({
        sql: "SELECT "+Mapping.mappingToStr(Mapping.userReferences)+" FROM tbl_userreferences WHERE userIdCode= :idCode",
        params: {
            "idCode": idCode
        }
    }, function(err, rows) {
        if (err) {
            callback(err, null);
        }

        if (rows && rows.length > 0) {
            callback(null, rows);
        } else {
            callback(null, null);
        }
    })
}





/**
 * 添加熟人信息  
 * @param  {str}   idCode   生成的用户识别码  
 * @param  {obj}   data   要添加的熟人信息        
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.addReferences = function(idCode, data, callback) {
    mysql.query({
        sql: "INSERT INTO tbl_userreferences SET content= :content,userIdCode= :userIdCode",
        params: {  
            "content": data.Content,
            "userIdCode": idCode 

        }
    }, function(err) {
        if (err) {
            callback(err);
        }
        callback(null);

    })
}



/**
 * 删除用户熟人信息  
 * @param  {str}   idCode   生成的用户识别码       
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.delReferences = function(idCode, callback) {
    mysql.query({
        sql: "DELETE FROM tbl_userreferences WHERE userIdCode= :userIdCode",
        params: {  
            "userIdCode": idCode 
        }
    }, function(err) {
        if (err) {
            callback(err);
        }
        callback(null);

    })
}








