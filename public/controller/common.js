$('#LogoutBtn').click(function(){
	var r = confirm("Are you sure you want to quit the system?")
    if (r == true) {
        $.get("/System/exit", function(obj) {
            // if (obj.status.code === 0) window.open('/login', '_self');
        })
        window.open('/login', '_self')
    }
    
})