$(function(){
	$('#submitBtn').click(function(){
		var username = $('#username').val();
		var password = $('#password').val();
		var param = {
			username: username,
			password: password
		}
		console.log(param)
		$.post("/System/login",param,function(obj){
            console.log(obj)
            if(obj.status.code === 0){
            	$(window).attr('location','/Users');
            }else{
            	alert(obj.status.msg)
            }
        })
	})
})