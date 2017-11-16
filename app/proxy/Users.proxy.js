const mysql = require('../mysql');
const Mapping = require('../../config/sqlMapping');

/**
 * 获取所有用户列表           
 * @param  {obj}   param   页数和每页条数         
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.getList = (param, callback) => {
    let sqlObj = {
        sql: "SELECT * FROM tbl_users order by id desc"
    };

    if(param.page && param.size){
        let page = parseInt(param.page);
        let size = parseInt(param.size);
        let limit_Start = (page - 1) * size;
        sqlObj = {
            sql: "SELECT a.*,b.role,c.department FROM tbl_users as a left join tbl_userrole as b on a.roleId=b.id left join tbl_department as c on a.departmentId=c.id order by a.id desc limit :limit_Start,:size",
            params: {
              "limit_Start": limit_Start,
              "size": size
            }
        }
    }

    mysql.query(sqlObj, (err, rows) => {
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
exports.delete = (idCode, callback) => {
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
    }, err => {
        if (err) {
            callback(err);
        }
        callback(null);
    })
}




/**
 * 修改用户密码  
 * @param  {str}   idCode   生成的用户识别码
 * @param  {str}   password   新密码        
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.editPassword = (idCode, password, callback) => {
    mysql.query({
        sql: "UPDATE tbl_users SET password= :password WHERE idCode= :idCode",
        params: {  
            "password": password,
            "idCode": idCode
        }
    }, err => {
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
exports.userBaseInfo = (idCode, callback) => {
    mysql.query({
        sql: "SELECT "+Mapping.mappingToStr(Mapping.userBaseInfo)+" FROM tbl_users WHERE idCode= :idCode",
        params: {
            "idCode": idCode
        }
    }, (err, rows) => {
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
exports.addBaseInfo = (idCode, data, callback) => {
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
    }, err => {
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
exports.editBaseInfo = (idCode, data, callback) => {
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
    }, err => {
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
exports.userSchoolInfo = (idCode, type, callback) => {
    mysql.query({
        sql: "SELECT "+Mapping.mappingToStr(Mapping.userSchool)+" FROM tbl_userschool WHERE userIdCode= :idCode AND type= :type",
        params: {
            "idCode": idCode,
            "type": type
        }
    }, (err, rows) => {
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
exports.addSchool = (idCode, data, type, callback) => {
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
    }, err => {
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
exports.delSchool = (idCode, type, callback) => {
    mysql.query({
        sql: "DELETE FROM tbl_userschool WHERE userIdCode= :userIdCode AND type= :type",
        params: {  
            "type": type,
            "userIdCode": idCode
        }
    }, err => {
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
exports.userWorkInfo = (idCode, callback) => {
    mysql.query({
        sql: "SELECT "+Mapping.mappingToStr(Mapping.userWork)+" FROM tbl_userworks WHERE userIdCode= :idCode",
        params: {
            "idCode": idCode
        }
    }, (err, rows) => {
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
exports.addWork = (idCode, data, callback) => {
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
    }, err => {
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
exports.delWork = (idCode, callback) => {
    mysql.query({
        sql: "DELETE FROM tbl_userworks WHERE userIdCode= :userIdCode",
        params: {  
            "userIdCode": idCode 
        }
    }, err => {
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
exports.userReferencesInfo = (idCode, callback) => {
    mysql.query({
        sql: "SELECT "+Mapping.mappingToStr(Mapping.userReferences)+" FROM tbl_userreferences WHERE userIdCode= :idCode",
        params: {
            "idCode": idCode
        }
    }, (err, rows) => {
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
exports.addReferences = (idCode, data, callback) => {
    mysql.query({
        sql: "INSERT INTO tbl_userreferences SET content= :content,userIdCode= :userIdCode",
        params: {  
            "content": data.Content,
            "userIdCode": idCode 

        }
    }, err => {
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
exports.delReferences = (idCode, callback) => {
    mysql.query({
        sql: "DELETE FROM tbl_userreferences WHERE userIdCode= :userIdCode",
        params: {  
            "userIdCode": idCode 
        }
    }, err => {
        if (err) {
            callback(err);
        }
        callback(null);

    })
}








