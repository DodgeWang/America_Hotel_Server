$(function() {

    $('#form_sublime').on('click',function(){
        //登陆信息
        var typeId = $('input[name="typeId"]').val();//房型名
        var typeName = $('input[name="typeName"]').val();//房型名
      
        var param = {
          id : typeId,
          typeName : typeName
        }
        $.ajax({      
           url: '/api/room/typeedit',  
           data: param,      
           dataType: "json",      
           type: "POST",     
           success: function (obj) {  
              if(obj.status.code === 0){
                alert("修改成功")
                $(window).attr('location','/roomtype');
              }else{
                alert(obj.status.msg)
              } 
           }      
        });  

    })
});