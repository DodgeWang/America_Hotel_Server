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
                          <span class="add-on" onclick="timeGet(this)"><i class="icon-th"></i></span>\
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
                          <span class="add-on" onclick="timeGet(this)"><i class="icon-th"></i></span>\
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
                          <span class="add-on" onclick="timeGet(this)"><i class="icon-th"></i></span>\
                        </div>\
                    </div>\
                  </div>\
                  <div class="control-group">\
                    <label class="control-label">End Date</label>\
                    <div class="controls">\
                      <div class="input-append date span5 datepicker datepicker-basic" data-date="" data-date-format="dd-mm-yyyy">\
                          <input size="16" type="text" name="Company_End_Date" value="">\
                          <span class="add-on" onclick="timeGet(this)"><i class="icon-th"></i></span>\
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
        $(workBox[workBox.length - 1]).after(boxDom);
}



function addReferences() {
    var referencesBox = $('#referencesBox').find('.references_Item');
    var boxDom = '<div class="control-group references_Item">\
                      <label class="control-label">No.'+ (referencesBox.length+1) +'</label>\
                      <div class="controls">\
                        <div class="span7" style="position:relative;">\
                          <textarea class="span12" rows="5" style="height:100px;"></textarea>\
                          <div onclick="DeleteDom(this)" class="wdq-del-btn-two"><i class="icon-remove"></i></div>\
                        </div>\
                      </div> \
                  </div>'
    $(referencesBox[referencesBox.length - 1]).after(boxDom);
}




function DeleteDom(nowDom){
  $(nowDom).parent().parent().parent().remove();
}


function timeGet(w){
  var nowDate = new Date();
    var nowDate_Str = nowDate.getDate()+"-"+(nowDate.getMonth()+1)+"-"+nowDate.getFullYear()
    var option = {
       format:nowDate_Str
    }
  $(w).parent().datepicker();
}