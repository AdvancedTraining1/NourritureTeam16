/**
 * Created by zhaiyuan on 2014-11-01.
 */
var express = require('express');
var router = express.Router();
var AttentionsHander = require('../controller/attentionsHander');

/* GET home page. */
router.get("/",function(req,res){
    req.session.user_id="54578976af75277b630cc379";
    req.session.account="zhaiyuan";
})

router.get('/register',function(req,res){
    res.render('register');
});
router.post('/addUser',AttentionsHander.addUser);
router.get('/getAllAttentions',AttentionsHander.getAllAttentions);
router.post('/addAttentions',AttentionsHander.addAttentions);
router.post('/deleteAttentions',AttentionsHander.deleteAttentions);

module.exports = router;
