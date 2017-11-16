module.exports = {
    SUCCESS: {
        code: 0,
        msg: '成功'
    },
    ERROR: {
        code: 1,
        msg: '错误'
    },
    INVAILD_PARAMS: {
        code: 1,
        msg: '上传参数错误'
    },
    // NOTFOUND: {
    //     code: 2,
    //     msg: '没有找到相关数据'
    // }, //means data not found not url request
    
    
    // DBERROR: {
    //     code: 4,
    //     msg: '数据库错误'
    // },


    Login: {
       SUCCESS: {
           code:0,
           msg:'登陆成功'
       },
       USER_ERROR: {
           code:1,
           msg: '登陆用户不存在'
           // msg: "Login account does not exist"
       },
       PASSWORD_ERROR: {
           code:1,
           msg: '密码错误'
           // msg: "Password error"
       }, 
       NO_PERMISSION: {
           code:1,
           msg: '没有足够权限'
       },
       // RESET_SUCCESS: {
       //     code:0,
       //     msg: '密码修改成功'
       // },
       // RESET_ERROR: {
       //     code:1,
       //     msg: '密码不正确'
       // }
    }
}