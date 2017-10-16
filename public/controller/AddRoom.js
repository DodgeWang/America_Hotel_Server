$(function() {
    $.get("/api/room/typelist", { page: 1, size: 100 }, function(obj) {
            if (obj.status.code !== 0) {
                alert(obj.status.msg);
            } else {
                var htmlDom = '';
                if(obj.data.length > 0){
                  for(var i = 0; i < obj.data.length; i++){
                	htmlDom += "<option value='"+ obj.data[i].id +"'>"+ obj.data[i].type +"</option>";
                  }
                }
                $("#roomType").html(htmlDom);
            }
    })

    $('#form_sublime').on('click',function(){
        var roomNum = $('input[name="roomNum"]').val();//房间号
    	var roomType = $("#roomType").val();
        var param = {
          roomNum : roomNum,
          roomType : roomType
        }

        $.ajax({      
           url: '/api/room/add',  
           data: param,      
           dataType: "json",      
           type: "POST",     
           success: function (obj) { 
              if(obj.status.code === 0){
                alert("添加成功")
                $(window).attr('location','/room');
              }else{
                alert(obj.status.msg)
              }
           }      
        });  

    })
});
