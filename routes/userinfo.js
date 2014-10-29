var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:userid', function(req, res) {
  res.render('userinfo', { title: 'Show userInfo' ,userid:req.params.userid});
});

router.post('/',function(req, res){
	req.on('data',function(data){
		var obj= JSON.parse(data.toString());
		var str = "查询信息为:" + obj.search;
		res.send(str);
	});
});


module.exports = router;
