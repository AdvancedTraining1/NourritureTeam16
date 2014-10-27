var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('season', { title: '时另信息查询' });
});

router.post('/',function(req, res){
	req.on('data',function(data){
		var obj= JSON.parse(data.toString());
		var str = "查询信息为:" + obj.search;
		res.send(str);
	});
});


module.exports = router;
