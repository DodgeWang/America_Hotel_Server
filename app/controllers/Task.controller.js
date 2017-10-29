var Task = require('../proxy/Task.proxy');
var resUtil  = require("../libs/resUtil");
var config = require('../../config/env/statusConfig');
var Common = require('../proxy/Common.proxy');
var async = require('async');
var timeFunc = require('../func/timeFunc');

/**
 * 创建任务
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.add = function(req, res, next) {
    var data = {
        roomId : req.body.roomId,
        taskType : req.body.taskType,
        executor: req.body.executor,
        content: req.body.taskContent
    } 
    Task.add(data, function(err){
    	if (err) {
            return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
        }
        res.json(resUtil.generateRes(null, config.statusCode.STATUS_OK));
    })
}


/**
 * 获取任务列表
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.getList = function(req, res, next) {
    Task.getList(req.query, function(err,rows) {
        if (err) {
            return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
        }
        
        for(var i=0;i<rows.length;i++){
        	if(rows[i].state == 0){
        		rows[i].state = "未完成"
        	}else{
        		rows[i].state = "已完成"
        	}

        	switch(rows[i].taskType)
             {
             case 1:
               rows[i].taskType = "保洁"
               break;
             case 2:
               rows[i].taskType = "查房"
               break;
             case 3:
               rows[i].taskType = "报修"
               break;
             default:
               rows[i].taskType = "其他"
             }
        }
        res.json(resUtil.generateRes(rows, config.statusCode.STATUS_OK));       
    })
}


/**
 * 进入任务列表页
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.taskListPage = function(param,cb) {
    async.series({
       taskList: function(cb){
          Task.getList(param,function(err,rows) {
            for(var i=0;i<rows.length;i++){
               if(rows[i].state == 0){
                 rows[i].state = "未完成"
               }else{
                 rows[i].state = "已完成"
               }

               switch(rows[i].taskType)
                 {
                 case 1:
                  rows[i].taskType = "保洁"
                  break;
                 case 2:
                   rows[i].taskType = "查房"
                   break;
                 case 3:
                   rows[i].taskType = "报修"
                   break;
                 default:
                   rows[i].taskType = "其他"
                }
              rows[i].createTimeStr = timeFunc.toStr(rows[i].createTime);
             }
             cb(err,rows)
          })
       },
       pageInfo: function(cb){
          var str = 'tbl_task';
          Common.totleNum(str,function(err,rows) {
             cb(err,rows[0])
          })
       }
    },function(err, results) {
        cb(err,results)   
    });  
}
