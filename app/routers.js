// var processData = require('../app/controllers/processData.controller');

module.exports = function(app) {

    /**
     * html page routers
     */
    //登陆页面
    app.get('/login', function(req, res) {
       res.render('login',{ layout: null});
    });
    app.get('/Users', function(req, res) {
       res.render('Users');
    });
    
}