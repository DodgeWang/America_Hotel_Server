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
        $.get("/api/task/list", { page: pageNum, size: sizeNum }, function(obj) {
            console.log(obj)
            if (obj.status.code !== 0) {
                alert(obj.status.msg);
            } else {
                if (obj.data.length > 0) {
                    var htmlDom = '';
                    for (var i = 0; i < obj.data.length; i++) {
                        var id = obj.data[i].id;
                        var htmlStr = "<tr>\
                                        <td>" + obj.data[i].roomNumber + "</td>\
                                        <td>" + obj.data[i].taskType + "</td>\
                                        <td>" + obj.data[i].executor + "</td>\
                                        <td>" + obj.data[i].createTime + "</td>\
                                        <td>" + obj.data[i].state + "</td>";

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



    //删除房间
    function delRoom(id){
        var r = confirm("Are you sure you want to delete this data?")
        if (r == true) {
            $.get("/api/room/delete", { id: id }, function(obj) {
              if (obj.status.code !== 0) {
                alert(obj.status.msg);
              } else {
                dataList(page, size, 0)
              }
            })
        }
    }
