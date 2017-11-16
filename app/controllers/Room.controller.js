const Room = require('../proxy/Room.proxy');
const Common = require('../proxy/Common.proxy');
const resUtil = require("../libs/resUtil");
const async = require('async');
const Status = require('../../config/status_config');
/**
 * 获取房型列表
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.getTypeList = (req, res, next) => {
    // if (!req.query.page || !req.query.size) return res.json(resUtil.generateRes(null, Status.INVAILD_PARAMS));
    let page = parseInt(req.query.page);
    let size = parseInt(req.query.size);
    Room.getTypeList(page, size, (err, rows) => {
        if (err) {
            return res.json(resUtil.generateRes(err, Status.ERROR));
        }
        res.json(resUtil.generateRes(rows, Status.SUCCESS));
    })
}


/**
 * 删除房型
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.typeDelete = (req, res, next) => {
    if (!req.query.id) return res.json(resUtil.generateRes(null, Status.INVAILD_PARAMS));
    let id = req.query.id;
    Room.typeDelete(id, (err, rows) => {
        if (err) {
            return res.json(resUtil.generateRes(null, Status.ERROR));
        }
        res.json(resUtil.generateRes(rows, Status.SUCCESS));
    })
}


/**
 * 添加房型
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.typeAdd = (req, res, next) => {
    let data = {
        type: req.body.typeName
    }
    Room.typeAdd(data, err => {
        if (err) {
            return res.json(resUtil.generateRes(err, Status.ERROR));
        }
        res.json(resUtil.generateRes(null, Status.SUCCESS));
    })
}


/**
 * 根据Id获取房型页面
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.roomTypeInfo = (id, cb) => {
    let data = {}

    Room.roomTypeInfo(id, (err, obj) => {
        if (obj != null) {
            data = obj;
        }
        cb(data);
    })
}



/**
 * 修改房型
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.typeEdit = (req, res, next) => {
    let id = req.body.id; //房型id
    let data = {
        type: req.body.typeName
    }

    Room.typeEdit(id, data, err => {
        if (err) {
            return res.json(resUtil.generateRes(err, Status.ERROR));
        }
        res.json(resUtil.generateRes(null, Status.SUCCESS));
    })
}



/**
 * 按页获取房间列表
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.getList = (req, res, next) => {
    if (!req.query.page || !req.query.size) return res.json(resUtil.generateRes(null, Status.INVAILD_PARAMS));
    let page = parseInt(req.query.page);
    let size = parseInt(req.query.size);
    Room.getList(page, size, (err, rows) => {
        if (err) {
            return res.json(resUtil.generateRes(null, Status.ERROR));
        }
        res.json(resUtil.generateRes(rows, Status.SUCCESS));
    })
}


/**
 * 获取全部房间列表
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.getAllList = (req, res, next) => {
    Room.getAllList((err, rows) => {
        if (err) {
            return res.json(resUtil.generateRes(err, Status.ERROR));
        }
        res.json(resUtil.generateRes(rows, Status.SUCCESS));
    })
}



/**
 * 获取全部房间列表2
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.getAllListTwo = cb => {
    Room.getAllList((err, rows) => {
        cb(rows)
    })
}





/**
 * 添加房间
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.add = (req, res, next) => {
    let data = {
        roomNum: req.body.roomNum,
        roomType: req.body.roomType
    }
    Room.add(data, err => {
        if (err) {
            return res.json(resUtil.generateRes(err, Status.ERROR));
        }
        res.json(resUtil.generateRes(null, Status.SUCCESS));
    })
}



/**
 * 删除房间
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.delete = (req, res, next) => {
    if (!req.query.id) return res.json(resUtil.generateRes(null, Status.INVAILD_PARAMS));
    let id = req.query.id;
    Room.delete(id, (err, rows) => {
        if (err) {
            return res.json(resUtil.generateRes(err, Status.ERROR));
        }
        res.json(resUtil.generateRes(rows, Status.SUCCESS));
    })
}




/**
 * 根据Id获取房间页面
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.roomInfoPage = (id, cb) => {
    async.series({
        roomInfo: cb => {
            Room.roomInfo(id, (err, obj) => {
                let data = {}
                if (obj != null) {
                    data = obj;
                }
                cb(err, data)
            })
        },
        typeList: cb => {
            Room.getAllTypeList( (err, rows) => {
                cb(err, rows)
            })
        }
    }, (err, results) => {
        cb(err, results)
    });
}


exports.roomListPage = (req, cb) => {
    async.series({
        roomList: cb => {
            Room.getListTwo(req, (err, rows) => {
                cb(err, rows)
            })
        },
        typeList: cb => {
            Room.getAllTypeList((err, rows) => {
                cb(err, rows)
            })
        }
    }, (err, results) => {
        cb(err, results)
    });

}


/**
 * 修改房间
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.edit = (req, res, next) => {
    let id = req.body.id; //房间id
    let data = {
        number: req.body.roomNum,
        type: req.body.roomType
    }
    Room.edit(id, data, err => {
        if (err) {
            return res.json(resUtil.generateRes(err, Status.ERROR));
        }
        res.json(resUtil.generateRes(null, Status.SUCCESS));
    })
}



/**
 * 获取指定房型下所有未入住的房间
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.noCheckIn = (req, res, next) => {
    let roomTypeId = req.query.roomTypeId; //房间类型ID
    Room.noCheckIn(roomTypeId, (err, rows) => {
        if (err) {
            return res.json(resUtil.generateRes(err, Status.ERROR));
        }
        res.json(resUtil.generateRes(rows, Status.SUCCESS));
    })
}



/**
 * 进入房间列表页
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.roomListPage = (param, cb) => {
    async.series({
        roomList: cb => {
            Room.getListTwo(param, (err, rows) => {
                cb(err, rows)
            })
        },
        typeList: cb => {
            Room.getAllTypeList( (err, rows) => {
                cb(err, rows)
            })
        },
        pageInfo: cb => {
            let str = 'tbl_roominfo';
            if (param.typeId) {
                str = 'tbl_roominfo where typeId=' + param.typeId;
            }
            Common.totleNum(str, (err, rows) => {
                cb(err, rows[0])
            })
        }
    }, (err, results) => {
        cb(err, results)
    });
}


/**
 * 进入房间类型列表页
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.typeListPage = (param, cb) => {
    async.series({
        typeList: cb => {
            Room.getTypeList(param.page, param.size, (err, rows) => {
                cb(err, rows)
            })
        },
        pageInfo: cb => {
            let str = 'tbl_roomtype';
            Common.totleNum(str, (err, rows) => {
                cb(err, rows[0])
            })
        }
    }, (err, results) => {
        cb(err, results)
    });
}