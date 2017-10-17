$(function() {
    $.get("/api/users/list", {}, function(obj) {
            if (obj.status.code !== 0) {
                alert(obj.status.msg);
            } else {
                var htmlDom = '';
                if(obj.data.length > 0){
                  for(var i = 0; i < obj.data.length; i++){
                	htmlDom += "<option value='"+ obj.data[i].idCode +"'>"+ obj.data[i].name +"</option>";
                  }
                }
                $("#userList").html(htmlDom);
            }
    })

    $('#form_sublime').on('click',function(){
        var roomNumber = $('input[name="roomNumber"]').val();//房间号
    	var taskType = $("#taskType").val();//任务类型
    	var executor = $('select[name="executor"]').val();//执行人员
    	var taskContent = $('textarea[name="taskContent"]').val();//任务内容
        var param = {
          roomNumber : roomNumber,
          taskType : taskType,
          executor: executor,
          taskContent: taskContent
        }
        $.ajax({      
           url: '/api/task/add',  
           data: param,      
           dataType: "json",      
           type: "POST",     
           success: function (obj) { 
              if(obj.status.code === 0){
                alert("添加成功")
                $(window).attr('location','/addtask');
              }else{
                alert(obj.status.msg)
              }
           }      
        });  

    })
});