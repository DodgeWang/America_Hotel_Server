$(function() {


    $('#form_sublime').on('click',function(){
        //登陆信息
        var typeName = $('input[name="typeName"]').val();//房型名
      
        var param = {
          typeName : typeName
        }

        console.log(param)
        $.ajax({      
           url: '/api/room/typeadd',  
           data: param,      
           dataType: "json",      
           type: "POST",     
           success: function (obj) {   
              console.log(obj)
              if(obj.status.code === 0){
                alert("添加成功")
                $(window).attr('location','/roomtype');
              }else{
                alert(obj.status.msg)
              }
           }      
        });  

    })
});



