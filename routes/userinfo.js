/**
 * Created by liuhanxu on 2014-11-12.
 */
var express = require('express');
var router = express.Router();
var UserinfoHandler = require('../controller/userinfoHandler');

router.get('/testinterface',function(req,res){
	res.render('testuserinfo');
});
router.post('/register',UserinfoHandler.register);
router.post('/login',UserinfoHandler.login);
router.post('/modifypass',UserinfoHandler.modifypass);
router.post('/modifyinfo',UserinfoHandler.modifyinfo);

module.exports = router;