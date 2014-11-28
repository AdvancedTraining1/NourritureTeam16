var express = require('express');
var router = express.Router();
var saleHandler = require('../controller/saleHandler');

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

router.get('/createTradePost',function(req,res){
    res.render('sale/createTradePost');
});

router.get('/getAll',saleHandler.getAll);
router.get('/getOne',saleHandler.getOne);
router.get('/getOwn',saleHandler.getOwn);
router.get('/delete',saleHandler.delete);
router.get('/create',saleHandler.create);
router.get('/edit',saleHandler.edit);
router.get('/search',saleHandler.search);

module.exports = router;
