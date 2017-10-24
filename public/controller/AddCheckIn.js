$(function() {
    $.get("/api/room/typelist", { page: 1, size: 100 }, function(obj) {
            if (obj.status.code !== 0) {
                console(obj.status.msg);
            } else {
                var htmlDom = '';
                if(obj.data.length > 0){
                  for(var i = 0; i < obj.data.length; i++){
                	  htmlDom += "<option value='"+ obj.data[i].id +"'>"+ obj.data[i].type +"</option>";
                  }
                  noCheckInRoom(obj.data[0].id)
                }
                $("#roomType").html(htmlDom);
            }
    })
    
    $('#roomType').bind('input propertychange', function() {  
       console.log($(this).val())
       noCheckInRoom($(this).val())
    }); 
    
    function noCheckInRoom(typeId){
        $.get("/api/room/nocheckin", {roomTypeId: typeId}, function(obj) {
            if (obj.status.code !== 0) {
                console(obj.status.msg);
            } else {
                var htmlDom = '';
                if(obj.data.length > 0){
                  for(var i = 0; i < obj.data.length; i++){
                    htmlDom += "<option value='"+ obj.data[i].id +"'>"+ obj.data[i].number +"</option>";
                  }
                }
                $("#roomChoice").html(htmlDom);
            }
        })
    }


    $('#form_sublime').on('click',function(){
        var roomId = $('#roomChoice').val();//房间号
        var guestName = $('input[name="guestName"]').val();//客人名字
        var checkInDate = $('input[name="checkInDate"]').val();
        var checkInTime = $('input[name="checkInTime"]').val();
        var checkOutDate = $('input[name="checkOutDate"]').val();
        var checkOutTime = $('input[name="checkOutTime"]').val();

        var param = {
          roomId : roomId,
          guestName : guestName,
          checkInTime : dateTime(checkInDate,checkInTime),
          checkOutTime : dateTime(checkOutDate,checkOutTime)
        }

        $.ajax({      
           url: '/api/checkin/add',  
           data: param,      
           dataType: "json",      
           type: "POST",     
           success: function (obj) { 
              if(obj.status.code === 0){
                alert("添加成功")
                $(window).attr('location','/checkin');
              }else{
                alert(obj.status.msg)
              }
           }      
        });
    })



   function dateTime(date,time){
       date = date.split("-");
       time = time.split(":");
       var d = new Date();
       d.setFullYear(parseInt(date[2]));
       d.setMonth(parseInt(date[1])-1);
       d.setDate(parseInt(date[0]));
       d.setHours(parseInt(time[0]));
       d.setMinutes(parseInt(time[1]));
       d.setSeconds(0);

       var timestamp = Date.parse(d)/1000;
       return timestamp;
   }


});



