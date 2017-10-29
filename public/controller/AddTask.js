$(function() {
    $.get("/api/users/list", {}, function(obj) {
            if (obj.status.code !== 0) {
                console.log(obj.status.msg);
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

    // $.get("/api/room/alllist", {}, function(obj) {
    //         if (obj.status.code !== 0) {
    //             console.log(obj.status.msg);
    //         } else {
    //             var htmlDom = '';
    //             if(obj.data.length > 0){
    //               for(var i = 0; i < obj.data.length; i++){
    //                 htmlDom += "<option value='"+ obj.data[i].id +"'>"+ obj.data[i].number +"</option>";
    //               }
    //             }
    //             $("#roomList").html(htmlDom);
    //         }
    // })

    $('#form_sublime').on('click',function(){
      var roomId = $('select[name="roomId"]').val();//房间Id
    	var taskType = $("#taskType").val();//任务类型
    	var executor = $('select[name="executor"]').val();//执行人员
    	var taskContent = $('textarea[name="taskContent"]').val();//任务内容
        var param = {
          roomId : roomId,
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
                $(window).attr('location','/task');
              }else{
                alert(obj.status.msg)
              }
           }      
        });  

    })
});
