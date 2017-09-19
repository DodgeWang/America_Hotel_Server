module.exports = {
	//用户教育表映射 tbl_userschool
	userSchool: {
		Name: "name",
		Address: "address",
		Years_Completed: "yearCompleted",
		Major: "major",
		Degree_Diploma: "degreeDiploma"
	},

	//用户工作经历表映射 tbl_userworks
	userWork: {
		Name : "name",
        Supervisor : "supervisor",
        Hours : "hours",
        Address : "address",
        ZipCode : "zipCode",
        Phone : "phone",
        Job_Title : "jobTitle",
        Start_Date : "startDate",
        End_Date : "endDate",
        Start_Salary : "startSalary",
        End_Salary : "endSalary",
        Reason_Leaving : "reasonLeaving",
        Self_Summary : "selfSummary",
        Could_Contact :"couldContact"
	},

    //用户熟人信息表映射 tbl_usereferences
	userReferences: {
		Content: "content"
	},

	mappingToStr: function(obj){
		var strList = [];
        for(var i in obj){
          itemStr = obj[i] + ' AS ' + i;
          strList.push(itemStr)
        }
        return strList.join(",")
	}
}

