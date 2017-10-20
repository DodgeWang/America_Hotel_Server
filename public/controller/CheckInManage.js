    var page = 1;
    var size = 15;

    dataList(page, size, 0)
    //上一页
    $("#prev_btn").click(function() {
        if (page === 1) return alert("It’s the first page");
        page -= 1;
        dataList(page, size, 1);
    })

    //下一页
    $("#next_btn").click(function() {
        dataList(page + 1, size, 2);
    })


    function dataList(pageNum, sizeNum, type) {
        $.get("/api/checkin/list", { page: pageNum, size: sizeNum }, function(obj) {
            if (obj.status.code !== 0) {
                alert(obj.status.msg);
            } else {
                if (obj.data.length > 0) {
                    var htmlDom = '';
                    for (var i = 0; i < obj.data.length; i++) {
                        var id = obj.data[i].id;
                        var htmlStr = "<tr>\
                                        <td>" + obj.data[i].roomNumber + "</td>\
                                        <td>" + obj.data[i].statusStr + "</td>\
                                        <td>" + obj.data[i].checkInTime + "</td>\
                                        <td>" + obj.data[i].checkOutTime + "</td>\
                                        <td></td>\
                                        <td></td>\
                                        <td>\
                                          <div class='btn-group'>\
                                            <a class='btn btn-small dropdown-toggle' data-toggle='dropdown' href='#'>\
                                            Action\
                                               <span class='caret'></span>\
                                            </a>\
                                            <ul class='dropdown-menu pull-right'>\
                                              <li><a href='/editroom?id="+id+"'><i class='icon-edit'></i> Edit</a></li>\
                                              <li><a style='cursor:pointer' onclick='delRoom(\""+id+"\")'><i class='icon-trash'></i> Delete</a></li>\
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


