$(function() {

    $('#form_sublime').on('click',function(){
        var id = $('input[name="roomId"]').val();//房间Id
        var roomNum = $('input[name="roomNum"]').val();//房间号
    	  var roomType = $("#roomType").val();
        var param = {
          id : id,
          roomNum : roomNum,
          roomType : roomType
        }
        $.ajax({      
           url: '/api/room/edit',  
           data: param,      
           dataType: "json",      
           type: "POST",     
           success: function (obj) { 
            console.log(obj)
              if(obj.status.code === 0){
                alert("修改成功")
                $(window).attr('location','/room');
              }else{
                alert(obj.status.msg)
              }
           }      
        });  
    })

});