$(function() {

    $('.datepicker-basic').datepicker();

    $('#form_sublime').on('click',function(){
        //登陆信息
        var UserId = $('input[name="UserId"]').val();//用户名
        var Username = $('input[name="Username"]').val();//用户名
        var Password = $('input[name="Password"]').val();//密码

        //基础信息
        var Name = $('input[name="Name"]').val();//姓名
        var Social_security_Number = $('input[name="Social_security_Number"]').val();//社会保障号码
        var Mailing_Address = $('input[name="Mailing_Address"]').val();//住址
        var city_state_Zip_Code = $('input[name="city_state_Zip_Code"]').val();//邮政编码
        var Telephone = $('input[name="Telephone"]').val();//电话号码
        var Age = $('input[name="Age"]').val();//年龄
        var Email = $('input[name="Email"]').val();//邮箱
        
        //工作性质
        var Days_work =[];//工作日期（星期）
        $('input[name="Days_work"]:checked').each(function(){ 
          Days_work.push($(this).val()); 
        }); 
        var Work_nature = $("input[name='Work_nature']:checked").val();//工作性质（兼职或者全职）
        var Work_hours = $('input[name="Work_hours"]').val();//每周工作时长
        var Work_at_night = $("input[name='Work_at_night']:checked").val();//是否上夜班
        var Work_available_date = $('input[name="Work_available_date"]').val();//上班开始日期


        //附加信息
        var Is_Legal_status = $("input[name='Is_Legal_status']:checked").val();//是否是合法身份
        var Have_Criminal_Record = $("input[name='Have_Criminal_Record']:checked").val();//是否有犯罪记录
        var Criminal_Record = $('textarea[name="Criminal_Record"]').val();//犯罪记录描述
        var Have_DL = $("input[name='Have_DL']:checked").val();//是否有驾照
        var DL_Number = $('input[name="DL_Number"]').val();//驾照号码
        var DL_Issued_State = $('input[name="DL_Issued_State"]').val();//驾照颁发州市

        //服役信息
        var Is_Jioned_Army = $("input[name='Is_Jioned_Army']:checked").val();//是否参过军
        var Is_Member_NG = $("input[name='Is_Member_NG']:checked").val();//是否现在是国民警卫队成员
        var Military_Specialty = $('input[name="Military_Specialty"]').val();//部队专业


        
        //高中学历信息
        var High_School = [];
        $('.highSchoolItem').each(function(){ 
          var Item = {};
          Item.Name = $(this).find('input[name="School_Name"]').val();//学校名称
          Item.Address = $(this).find('input[name="School_Address"]').val();//学校地址
          Item.Years_Completed = $(this).find('input[name="Years_Completed"]').val();//毕业时间
          Item.Major = $(this).find('input[name="Major"]').val();//主修专业
          Item.Degree_Diploma = $(this).find('input[name="Degree_Diploma"]').val();//学位或文凭 
          High_School.push(Item)
        });


        //大学学历信息
        var College_School = [];
        $('.collegeItem').each(function(){ 
          var Item = {};
          Item.Name = $(this).find('input[name="School_Name"]').val();//学校名称
          Item.Address = $(this).find('input[name="School_Address"]').val();//学校地址
          Item.Years_Completed = $(this).find('input[name="Years_Completed"]').val();//毕业时间
          Item.Major = $(this).find('input[name="Major"]').val();//主修专业
          Item.Degree_Diploma = $(this).find('input[name="Degree_Diploma"]').val();//学位或文凭
          College_School.push(Item)
        });

        //工作经历
        var Work_Experience = [];
        $('.workItem').each(function(){ 
          var Item = {};
          Item.Name = $(this).find('input[name="Company_Name"]').val();//公司名称
          Item.Supervisor = $(this).find('input[name="Company_Supervisor"]').val();//公司主管
          Item.Hours = $(this).find('input[name="Company_Hours"]').val();//工作时长
          Item.Address = $(this).find('input[name="Company_Address"]').val();//公司地址
          Item.ZipCode = $(this).find('input[name="Company_ZipCode"]').val(); //公司邮编
          Item.Phone = $(this).find('input[name="Company_Phone"]').val();//联系电话
          Item.Job_Title = $(this).find('input[name="Company_Job_Title"]').val();//职位
          Item.Start_Date = $(this).find('input[name="Company_Start_Date"]').val();//上班时间
          Item.End_Date = $(this).find('input[name="Company_End_Date"]').val();//辞职时间
          Item.Start_Salary = $(this).find('input[name="Company_Start_Salary"]').val();//起薪
          Item.End_Salary = $(this).find('input[name="Company_End_Salary"]').val();//离职时薪水
          Item.Reason_Leaving = $(this).find('textarea[name="Company_Reason_Leaving"]').val();//离职理由
          Item.Self_Summary = $(this).find('textarea[name="Company_Self_Summary"]').val();//自我总结
          Item.Could_Contact = $(this).find('input[name="Company_Could_Contact"]:checked').val();//能否联系上家公司
          Work_Experience.push(Item)
        });

        //熟人信息
        var References = [];
        $('.references_Item').each(function(){ 
          var Item = {};
          Item.Content = $(this).find('textarea').val();//公司名称
          References.push(Item)
        });

        
        function toStr(data){
          for(var i = 0; i<data.length; i++){
             data[i]=JSON.stringify(data[i])
          }
          return data.join('_&_');
        }

        var param = {
          UserId : UserId,
          Username : Username,
          Password : Password,
          Name : Name,
          Social_security_Number : Social_security_Number,
          Mailing_Address : Mailing_Address,
          city_state_Zip_Code : city_state_Zip_Code,
          Telephone : Telephone,
          Age : Age,
          Email : Email,
          Days_work : Days_work.join('_&_'),
          Work_nature : Work_nature,
          Work_hours : Work_hours,
          Work_at_night : Work_at_night,
          Work_available_date : Work_available_date,
          Is_Legal_status : Is_Legal_status,
          Have_Criminal_Record : Have_Criminal_Record,
          Criminal_Record : Criminal_Record,
          Have_DL : Have_DL,
          DL_Number : DL_Number,
          DL_Issued_State : DL_Issued_State,
          Is_Jioned_Army : Is_Jioned_Army,
          Is_Member_NG : Is_Member_NG,
          Military_Specialty : Military_Specialty,
          High_School : toStr(High_School),
          College_School : toStr(College_School),
          Work_Experience : toStr(Work_Experience),
          References : toStr(References)
        }

        console.log(param)
        $.ajax({      
            url: '/Users/add',  
           data: param,      
           dataType: "json",      
           type: "POST",     
           success: function (responseJSON) {   
           }      
        });  

    })
});