/**
 * 获取用户列表
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.getList = function(req, res, next) {
    console.log(req.query)
}


/**
 * 添加用户
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.add = function(req, res, next) {
            console.log(req.body)
    // var Hight = req.body.Hight;
    // for(var i = 0; i<Hight.split('__').length;i++){

    //     console.log(Hight.split('__')[i].Name)
    // }
	
}