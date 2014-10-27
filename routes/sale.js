var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('sale', { pageTitle: '卖东西啦' });
});

router.post('/',function(req, res){
	req.on('data',function(data){
		var obj= JSON.parse(data.toString());
		var str = obj.search + ", u r fooled idiot" ;
		res.send(str);
	});
});


module.exports = router;
