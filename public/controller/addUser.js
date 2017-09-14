$(function() {
    console.log(window)
    var nowDate = new Date();
    var nowDate_Str = nowDate.getDate()+"-"+(nowDate.getMonth()+1)+"-"+nowDate.getFullYear()
    $('.date-box').attr("value",nowDate_Str);


    $('#form_sublime').on('click',function(){
        //登陆信息
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

        // console.log(Username);
        // console.log(Password);

        // console.log(Name);
        // console.log(Social_security_Number)
        // console.log(Mailing_Address)
        // console.log(city_state_Zip_Code)
        // console.log(Telephone)
        // console.log(Age)
        // console.log(Email)

        // console.log(Days_work)
        // console.log(Work_nature)
        // console.log(Work_hours)
        // console.log(Work_at_night)
        // console.log(Work_available_date)

        // console.log(Is_Legal_status)
        // console.log(Have_Criminal_Record)
        // console.log(Criminal_Record)
        // console.log(Have_DL)
        // console.log(DL_Number)
        // console.log(DL_Issued_State)

        // console.log(Is_Jioned_Army)
        // console.log(Is_Member_NG)
        // console.log(Military_Specialty)
        

        // console.log(High_School)
        // console.log(College_School)
        console.log(Work_Experience)
    })
})

function addHighSchool() {
    var boxDom = '<div class="row-fluid">\
          <div class="widget widget-padding span12">\
            <div class="widget-body highSchoolItem">\
              <div onclick="DeleteDom(this)" class="wdq-del-btn"><i class="icon-remove"></i></div>\
              <div class="widget-forms clearfix">\
                <form class="form-horizontal">\
                  <div class="control-group">\
                    <label class="control-label">School</label>\
                    <div class="controls">\
                      <input class="span7" type="text" name="School_Name">\
                    </div>\
                  </div>\
                  <div class="control-group">\
                    <label class="control-label">Mailing Address</label>\
                    <div class="controls">\
                      <input class="span7 tip" type="text" name="School_Address">\
                    </div>\
                  </div>\
                  <div class="control-group">\
                    <label class="control-label">Years Completed</label>\
                    <div class="controls">\
                      <div class="input-append date span5 datepicker datepicker-basic" data-date="" data-date-format="dd-mm-yyyy">\
                          <input size="16" type="text" name="Years_Completed" value="">\
                          <span class="add-on" onclick="wang(this)"><i class="icon-th"></i></span>\
                        </div>\
                    </div>\
                  </div>\
                  <div class="control-group">\
                    <label class="control-label">Major</label>\
                    <div class="controls">\
                      <input class="span7 tip" type="text" name="Major">\
                    </div>\
                  </div>\
                  <div class="control-group">\
                    <label class="control-label">Degree or Diploma</label>\
                    <div class="controls">\
                      <input class="span7 tip" type="text" name="Degree_Diploma">\
                    </div>\
                  </div>\
                </form>\
              </div>\
            </div>\
          </div>\
        </div>'
    var highSchoolBox = $('#highSchoolBox').find('.row-fluid');
    $(highSchoolBox[highSchoolBox.length - 1]).after(boxDom);
}




function addCollegeSchool() {
    var boxDom = '<div class="row-fluid">\
          <div class="widget widget-padding span12">\
            <div class="widget-body collegeItem">\
              <div onclick="DeleteDom(this)" class="wdq-del-btn"><i class="icon-remove"></i></div>\
              <div class="widget-forms clearfix">\
                <form class="form-horizontal">\
                  <div class="control-group">\
                    <label class="control-label">School</label>\
                    <div class="controls">\
                      <input class="span7" type="text" name="School_Name">\
                    </div>\
                  </div>\
                  <div class="control-group">\
                    <label class="control-label">Mailing Address</label>\
                    <div class="controls">\
                      <input class="span7 tip" type="text" name="School_Address">\
                    </div>\
                  </div>\
                  <div class="control-group">\
                    <label class="control-label">Years Completed</label>\
                    <div class="controls">\
                      <div class="input-append date span5 datepicker datepicker-basic" data-date="" data-date-format="dd-mm-yyyy">\
                          <input size="16" type="text" name="Years_Completed" value="">\
                          <span class="add-on"><i class="icon-th"></i></span>\
                        </div>\
                    </div>\
                  </div>\
                  <div class="control-group">\
                    <label class="control-label">Major</label>\
                    <div class="controls">\
                      <input class="span7 tip" type="text" name="Major">\
                    </div>\
                  </div>\
                  <div class="control-group">\
                    <label class="control-label">Degree or Diploma</label>\
                    <div class="controls">\
                      <input class="span7 tip" type="text" name="Degree_Diploma">\
                    </div>\
                  </div>\
                </form>\
              </div>\
            </div>\
          </div>\
        </div>'
    var collegeSchoolBox = $('#collegeSchoolBox').find('.row-fluid');
    $(collegeSchoolBox[collegeSchoolBox.length - 1]).after(boxDom);
}


function addWork(){
  var boxDom = '<div class="row-fluid">\
          <div class="widget widget-padding span12">\
            <div class="widget-body workItem">\
              <div onclick="DeleteDom(this)" class="wdq-del-btn"><i class="icon-remove"></i></div>\
              <div class="widget-forms clearfix">\
                <form class="form-horizontal">\
                  <div class="control-group">\
                    <label class="control-label">Company</label>\
                    <div class="controls">\
                      <input class="span7" type="text" name="Company_Name">\
                    </div>\
                  </div>\
                  <div class="control-group">\
                    <label class="control-label">Name of last supervisor</label>\
                    <div class="controls">\
                      <input class="span7" type="text" name="Company_Supervisor">\
                    </div>\
                  </div>\
                  <div class="control-group">\
                    <label class="control-label">Hrs/week</label>\
                    <div class="controls">\
                      <input class="span7" type="text" name="Company_Hours">\
                    </div>\
                  </div>\
                  <div class="control-group">\
                    <label class="control-label">Address</label>\
                    <div class="controls">\
                      <input class="span7" type="text" name="Company_Address">\
                    </div>\
                  </div>\
                  <div class="control-group">\
                    <label class="control-label">City,State,and Zip Code</label>\
                    <div class="controls">\
                      <input class="span7" type="text" name="Company_ZipCode">\
                    </div>\
                  </div>\
                  <div class="control-group">\
                    <label class="control-label">Phone number</label>\
                    <div class="controls">\
                      <input class="span7" type="text" name="Company_Phone">\
                    </div>\
                  </div>\
                  <div class="control-group">\
                    <label class="control-label">Your last job title</label>\
                    <div class="controls">\
                      <input class="span7" type="text" name="Company_Job_Title">\
                    </div>\
                  </div>\
                  <div class="control-group">\
                    <label class="control-label">Start Date</label>\
                    <div class="controls">\
                      <div class="input-append date span5 datepicker datepicker-basic" data-date="" data-date-format="dd-mm-yyyy">\
                          <input size="16" type="text" name="Company_Start_Date" value="">\
                          <span class="add-on"><i class="icon-th"></i></span>\
                        </div>\
                    </div>\
                  </div>\
                  <div class="control-group">\
                    <label class="control-label">End Date</label>\
                    <div class="controls">\
                      <div class="input-append date span5 datepicker datepicker-basic" data-date="" data-date-format="dd-mm-yyyy">\
                          <input size="16" type="text" name="Company_End_Date" value="">\
                          <span class="add-on"><i class="icon-th"></i></span>\
                        </div>\
                    </div>\
                  </div>\
                  <div class="control-group">\
                    <label class="control-label">Starting Salary</label>\
                    <div class="controls">\
                      <div class="input-append">\
                        <input class="span7" type="text" name="Company_Start_Salary" placeholder="5.000"><span class="add-on">$</span>\
                      </div>\
                    </div>\
                  </div>\
                  <div class="control-group">\
                    <label class="control-label">Final Salary</label>\
                    <div class="controls">\
                      <div class="input-append">\
                        <input class="span7" type="text" name="Company_End_Salary" placeholder="5.000"><span class="add-on">$</span>\
                      </div>\
                    </div>\
                  </div>\
                  <div class="control-group">\
                    <label>Reason for leaving(be specific)</label>\
                    <div class="controls">\
                      <textarea class="span7" rows="5" style="height:100px;" name="Company_Reason_Leaving"></textarea>\
                    </div>\
                  </div>\
                  <div class="control-group">\
                    <label>List the jobs you held,duties performed,skills used or learned,advancements or promotions while you worked at this company.</label>\
                    <div class="controls">\
                      <textarea class="span7" rows="5" style="height:100px;" name="Company_Self_Summary"></textarea>\
                    </div>\
                  </div>\
                  <div class="control-group">\
                    <label>May we contact this employer?</label>\
                    <div class="controls controls-wdq">\
                      <label class="radio">\
                        <input type="radio" name="Company_Could_Contact" value="1" checked>\
                        Yes\
                      </label>\
                      <label class="radio">\
                        <input type="radio" name="Company_Could_Contact" value="0">\
                        No\
                      </label> \
                    </div>\
                  </div>\
                </form>\
              </div>\
            </div>\
          </div>\
        </div>'
        var workBox = $('#workBox').find('.row-fluid');
        console.log(workBox)
        $(workBox[workBox.length - 1]).after(boxDom);
}

function DeleteDom(nowDom){
  $(nowDom).parent().parent().parent().remove();
}


function wang(w){
  var nowDate = new Date();
    var nowDate_Str = nowDate.getDate()+"-"+(nowDate.getMonth()+1)+"-"+nowDate.getFullYear()
    var option = {
       format:nowDate_Str
    }
  $(w).parent().datepicker()
}
