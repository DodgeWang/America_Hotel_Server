$('#LogoutBtn').click(function(){
	var r = confirm("Are you sure you want to quit the system?")
    if (r == true) {
        $.get("/api/system/exit", function(obj) {
            // if (obj.status.code === 0) window.open('/login', '_self');
        })
        window.open('/login', '_self')
    }   
})

$('#language').bind('input propertychange', function() {  
    $.get("/api/language", {type: $(this).val()}, function(obj) {
            if (obj.status.code !== 0) {
                console(obj.status.msg);
            } else {
               window.location.reload();
            }
        })
});