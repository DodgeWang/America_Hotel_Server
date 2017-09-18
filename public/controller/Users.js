    var page = 1;
    var size = 3;

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
        $.get("/Users/list", { page: pageNum, size: sizeNum }, function(obj) {
            console.log(obj)
            if (obj.status.code !== 0) {
                alert(obj.status.msg);
            } else {
                if (obj.data.length > 0) {
                    var htmlDom = '';
                    for (var i = 0; i < obj.data.length; i++) {
                        var username = obj.data[i].username;
                        var id = obj.data[i].id;
                        var htmlStr = "<tr>\
                                     <td>" + username + "</td>\
                                        <td>Admin</td>\
                                        <td>20-05-2012</td>\
                                        <td><span class='label label-success'>Active</span></td>\
                                        <td>\
                                          <div class='btn-group'>\
                                            <a class='btn btn-small dropdown-toggle' data-toggle='dropdown' href='#'>\
                                            Action\
                                               <span class='caret'></span>\
                                            </a>\
                                            <ul class='dropdown-menu pull-right'>\
                                              <li><a href='#'><i class='icon-edit'></i> Edit</a></li>\
                                              <li><a href='#'><i class='icon-trash'></i> Delete</a></li>\
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
                            $("#datalist tbody").empty();
                            break;
                        case 2:
                            alert('It’s the last page');
                            break;
                    }
                }
            }
        })
    }