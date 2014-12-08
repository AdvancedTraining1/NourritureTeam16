/**
 * Created by liuhanxu on 2014-11-12.
 */

var UserinfoHandler = require('../controller/userinfoHandler');
module.exports = function (app) {

	app.get('/testinterface',function(req,res){
		res.render('testuserinfo');
	});
	app.get('/show',function(req,res){
		res.render('userinfo/showUserinfo');
	});
	app.get('/service/userinfo/gotoRegister',function(req,res){
		res.render('userinfo/register');
	});
	app.post('/service/userinfo/register',UserinfoHandler.register);
	app.post('/service/userinfo/login',UserinfoHandler.login);
	app.post('/modifypass',UserinfoHandler.modifypass);
	app.post('/modifyinfo',UserinfoHandler.modifyinfo);
	app.post('/showuserinfo',UserinfoHandler.viewUserinfo);

};