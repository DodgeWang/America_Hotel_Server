/**
 * 时间戳和字符串转换
 * @param  {num}   len  生成识别码长度
 * @param  {num}   radix  进制
 * @param  {Function} next the next func
 * @return {null}     
 */


//字符串转时间戳
exports.toStamp = function(timeStr) {
    
    return '';
}



//时间戳转字符串
exports.toStr = function(nS) {
	var d = new Date(parseInt(nS) * 1000);
	console.log(d)
	var year=d.getYear();     
    var month=d.getMonth()+1;     
    var date=d.getDate();     
    var hour=d.getHours();     
    var minute=d.getMinutes();     
    var second=d.getSeconds();     
    return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
}