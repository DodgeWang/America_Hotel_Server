$(function(){
	$('#form_sublime').on('click',function(){
		var id = $('input[name="id"]').val();
        var checkInDate = $('input[name="checkInDate"]').val();
        var checkInTime = $('input[name="checkInTime"]').val();
        var checkOutDate = $('input[name="checkOutDate"]').val();
        var checkOutTime = $('input[name="checkOutTime"]').val();

        var param = {
          id : id,
          checkInTime : dateTime(checkInDate,checkInTime),
          checkOutTime : dateTime(checkOutDate,checkOutTime)
        }

        $.ajax({      
           url: '/api/checkin/edit',  
           data: param,      
           dataType: "json",      
           type: "POST",     
           success: function (obj) { 
              if(obj.status.code === 0){
                alert("修改成功")
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
       d.setFullYear(parseInt(date[0]));
       d.setMonth(parseInt(date[1])-1);
       d.setDate(parseInt(date[2]));
       d.setHours(parseInt(time[0]));
       d.setMinutes(parseInt(time[1]));
       d.setSeconds(0);

       var timestamp = Date.parse(d)/1000;
       return timestamp;
   }
})