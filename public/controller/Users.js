
    var page = 1;
    var size = 15;

    userList(page, size, 0)
    //上一页
    $("#prev_btn").click(function() {
        if (page === 1) return alert("It’s the first page");
        page -= 1;
        userList(page, size, 1);
    })

    //下一页
    $("#next_btn").click(function() {
        userList(page + 1, size, 2);
    })


    function userList(pageNum, sizeNum, type) {
        $.get("/api/users/list", { page: pageNum, size: sizeNum }, function(obj) {
            if (obj.status.code !== 0) {
                alert(obj.status.msg);
            } else {
                if (obj.data.length > 0) {
                    var htmlDom = '';
                    for (var i = 0; i < obj.data.length; i++) {
                        var username = obj.data[i].username;
                        var id = obj.data[i].id;
                        var idCode = obj.data[i].idCode;
                        var htmlStr = "<tr>\
                                        <td>" + obj.data[i].name + "</td>\
                                        <td>" + obj.data[i].username + "</td>\
                                        <td>" + obj.data[i].createTime + "</td>\
                                        <td><span class='label label-success'>Active</span></td>\
                                        <td>\
                                          <div class='btn-group'>\
                                            <a class='btn btn-small dropdown-toggle' data-toggle='dropdown' href='#'>\
                                            Action\
                                               <span class='caret'></span>\
                                            </a>\
                                            <ul class='dropdown-menu pull-right'>\
                                              <li><a href='/edituser?userIdCode="+idCode+"'><i class='icon-edit'></i> Edit</a></li>\
                                              <li><a style='cursor:pointer' onclick='passReset(\""+idCode+"\")'><i class='icon-lock'></i> Reset Password</a></li>\
                                              <li><a style='cursor:pointer' onclick='delUser(\""+idCode+"\")'><i class='icon-trash'></i> Delete</a></li>\
                                            </ul>\
                                          </div>\
                                        </td>\
                                      </tr>";

                        htmlDom += htmlStr;
                    }
                    $("#users tbody").html(htmlDom);
                    if (type === 2) page += 1;
                } else {
                    switch (type) {
                        case 0:
                            $("#users tbody").empty();
                            break;
                        case 2:
                            alert('It’s the last page');
                            break;
                    }
                }
            }
        })
    }


    //删除用户
    function delUser(idCode){
        var r = confirm("Are you sure you want to delete this data?")
        if (r == true) {
            $.get("/api/users/delete", { idCode: idCode }, function(obj) {
              if (obj.status.code !== 0) {
                alert(obj.status.msg);
              } else {
                userList(page, size, 0)
              }
            })
        }
    }

    //重置密码
    function passReset(idCode){
        $.get("/api/users/resetpass", { idCode: idCode }, function(obj) {
            if (obj.status.code !== 0) {
                alert(obj.status.msg);
            } else {
                userList(page, size, 0)
                alert("Reset password successfully！")
            }
        })
    }