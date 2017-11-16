const Task = require('../proxy/Task.proxy');
const resUtil  = require("../libs/resUtil");
const Common = require('../proxy/Common.proxy');
const async = require('async');
const timeFunc = require('../func/timeFunc');
const Status = require('../../config/status_config');

/**
 * 创建任务
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.add = (req, res, next) => {
    let data = {
        roomId : req.body.roomId,
        taskType : req.body.taskType,
        executor: req.body.executor,
        content: req.body.taskContent
    } 
    Task.add(data, err => {
    	if (err) {
            return res.json(resUtil.generateRes(err, Status.ERROR));
        }
        res.json(resUtil.generateRes(null, Status.SUCCESS));
    })
}


/**
 * 获取任务列表
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.getList = (req, res, next) => {
    Task.getList(req.query, (err,rows) => {
        if (err) {
            return res.json(resUtil.generateRes(err, Status.ERROR));
        }

        rows.map( item => {
           if(item.state == 0){
              item.state = "未完成"
           }else{
              item.state = "已完成"
           }

           switch(item.taskType)
            {
             case 1:
               item.taskType = "保洁"
               break;
             case 2:
               item.taskType = "查房"
               break;
             case 3:
               item.taskType = "报修"
               break;
             default:
               item.taskType = "其他"
            }
           
        })
        
        
        res.json(resUtil.generateRes(rows, Status.SUCCESS));       
    })
}


/**
 * 进入任务列表页
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.taskListPage = (param,cb) => {
    async.series({
       taskList: cb => {
          Task.getList(param, (err,rows) => {
            rows.map( item => {
                 if(item.state == 0){
                    item.state = "未完成"
                 }else{
                    item.state = "已完成"
                 }

                 switch(item.taskType)
                  {
                   case 1:
                     item.taskType = "保洁"
                     break;
                   case 2:
                     item.taskType = "查房"
                     break;
                   case 3:
                     item.taskType = "报修"
                     break;
                   default:
                     item.taskType = "其他"
                  }
                  item.createTimeStr = timeFunc.toStr(item.createTime);
           
            })      
           
             cb(err,rows)
          })
       },
       pageInfo: cb => {
          let str = 'tbl_task';
          Common.totleNum(str, (err,rows) => {
             cb(err,rows[0])
          })
       }
    }, (err, results) => {
        cb(err,results)   
    });  
}
