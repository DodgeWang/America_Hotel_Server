const CheckIn = require('../proxy/CheckIn.proxy');
const resUtil  = require("../libs/resUtil");
const timeFunc  = require("../func/timeFunc");
const Common = require('../proxy/Common.proxy');
const async = require('async');
const Task = require('../proxy/Task.proxy');
const Status = require('../../config/status_config');


/**
 * 获取入住信息列表
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.getList = (req, res, next) => {
    CheckIn.getList(req.query, (err,rows) => {
        if (err) {
            return res.json(resUtil.generateRes(err, Status.ERROR));
        }
        for(let i=0;i<rows.length;i++){
        	rows[i].checkInTime = timeFunc.toStr(rows[i].checkInTime);
            rows[i].checkOutTime = timeFunc.toStr(rows[i].checkOutTime);
            // if(parseInt(rows[i].status) == 1){
            //     rows[i].statusStr = "入住中"
            // }else{
            //     rows[i].statusStr = "已退房"
            // }
        }
        res.json(resUtil.generateRes(rows, Status.SUCCESS));       
    })
}

/**
 * 添加入住信息
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.add = (req, res, next) => {
    let data = {
        roomId: req.body.roomId,
        guestName: req.body.guestName,
        checkInTime: req.body.checkInTime,
        checkOutTime: req.body.checkOutTime,
    } 
    CheckIn.add(data, err => {
        if (err) {
            return res.json(resUtil.generateRes(err, Status.ERROR));
        }
        CheckIn.editCheckInStatus(data.roomId,1, err => {
           if (err) {
              return res.json(resUtil.generateRes(err, Status.ERROR));
            }
           res.json(resUtil.generateRes(null, Status.SUCCESS));
        })
    })
}



/**
 * 修改入住信息
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.edit = (req, res, next) => {
    let data = {
        id: req.body.id,
        checkInTime: req.body.checkInTime,
        checkOutTime: req.body.checkOutTime,
    } 
    CheckIn.edit(data, err => {
        if (err) {
            return res.json(resUtil.generateRes(err, Status.ERROR));
        }
        res.json(resUtil.generateRes(null, Status.SUCCESS));
    })
}


/**
 * 入住列表管理页
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.checkInListPage = (param,cb) => {
    async.series({
       checkInList: cb => {
          // CheckIn.getList(param,function(err,rows) {
          //    for(var i=0;i<rows.length;i++){
          //      rows[i].checkInTime = timeFunc.toStr(rows[i].checkInTime);
          //      rows[i].checkOutTime = timeFunc.toStr(rows[i].checkOutTime);
          //    }
          //    cb(err,rows)
          // })
          
          CheckIn.getList(param, (err,rows) => {
            if (rows.length > 0) {
                let i = 0;
                getRoomTask(rows, i, rows.length, obj => {
                  for (let i = 0; i < rows.length; i++) {
                    rows[i].checkInTime = timeFunc.toStr(rows[i].checkInTime);
                    rows[i].checkOutTime = timeFunc.toStr(rows[i].checkOutTime);
                  }
                  cb(err,rows)
                })
            }else{
               cb(err,rows)
            }      
          })
       },
       pageInfo: cb => {
          let str = 'tbl_checkin';
          Common.totleNum(str,(err,rows) => {
             cb(err,rows[0])
          })
       }
    },(err, results) => {
        // console.log("today",results.checkInList[0].todayTask)
        // console.log("beforeTask",results.checkInList[0].beforeTask)
        // console.log("results",results)
        cb(err,results)   
    });  
}



function getRoomTask(obj,a,b,cb){
    async.series({
       todayTask: cb => {
          Task.todayRoomTask(obj[a].roomId, (err,rows) => {
             let o = {
                clean:[],
                inspect:[],
                repair:[]
             }
             for (let value of rows) {
                if(value.taskType == 1){
                  o.clean.push(value)
                }
                if(value.taskType == 2){
                  o.inspect.push(value)
                }
                if(value.taskType == 3){
                  o.repair.push(value)
                }
             }    
             cb(err,o)
          })
       },
       beforeTask: cb => {
          Task.beforeRoomTask(obj[a].roomId, (err,rows) => {     
             cb(err,rows)
          })
       }
    }, (err, results) => {
        obj[a].todayTask = results.todayTask;
        obj[a].beforeTask = results.beforeTask;
        if(a < b-1){
           a+=1;
           getRoomTask(obj,a,b)
        }else{
          cb(obj)
        }     
    });  
}




/**
 * 退房
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.checkout = (req, res, next) => {
    let data = {
        roomId: req.query.roomId
    } 
    CheckIn.editCheckInStatus(data.roomId,0, err => {
           if (err) {
              return res.json(resUtil.generateRes(err, Status.ERROR));
            }
           res.json(resUtil.generateRes(null, Status.SUCCESS));
    })
}


/**
 * 修改入住信息页面
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.editCheckInPage = (param,cb) => {
    async.series({
       dataInfo: cb => {
          CheckIn.getInfoById(param.id,(err,obj) => {
             obj.checkInDateStr = dateTime(obj.checkInTime,1);
             obj.checkInTimeStr = dateTime(obj.checkInTime,2);
             obj.checkOutDateStr = dateTime(obj.checkOutTime,1);
             obj.checkOutTimeStr = dateTime(obj.checkOutTime,2);
             cb(err,obj)
          })
       }
       
    },(err, results) => {
      // console.log(results)
        cb(err,results)   
    });  
}







function dateTime(timeStamp,type){
       let datetime = new Date(parseInt(timeStamp) * 1000);
       if(type == 1){
        let year = datetime.getFullYear();
        let month = (datetime.getMonth()+1) < 10 ? "0"+(datetime.getMonth()+1) : datetime.getMonth()+1;
        let date = datetime.getDate() < 10 ? "0"+datetime.getDate() : datetime.getDate();
        return year+"-"+month+"-"+date;
       }else{
        let hours = datetime.getHours() < 10 ? "0"+datetime.getHours() : datetime.getHours();
        let minutes = datetime.getMinutes() < 10 ? "0"+datetime.getMinutes() : datetime.getMinutes();
        return hours+":"+minutes;
       }     
}


