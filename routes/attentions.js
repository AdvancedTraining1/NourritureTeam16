/**
 * Created by zhaiyuan on 2014-11-01.
 */
var express = require('express');
var router = express.Router();
var AttentionsHander = require('../controller/attentionsHander');

/* GET home page. */
router.get('/addUser',AttentionsHander.addUser);
router.get('/getAllAttentions',AttentionsHander.getAllAttentions);
router.get('/addAttentions',AttentionsHander.addAttentions);
router.get('/deleteAttentions',AttentionsHander.deleteAttentions);

module.exports = router;
