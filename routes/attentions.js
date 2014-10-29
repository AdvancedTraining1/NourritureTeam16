/**
 * Created by zhaiyuan on 2014-10-20.
 */
var express = require('express');
var router = express.Router();


attentions = ['用户1','用户2','用户3'];
/* GET home page. */
router.get('/', function(req, res){
    getAllAttentions(req,res, function(err, user){
        if (err) return next(err);
        res.send(req.allAttentions);
    });
});

function getAllAttentions(req,res, next) {
    console.log("查看我关注的人...");
    if (attentions) {
        req.allAttentions = attentions;
        next();
    } else {
        console.log('还未关注任何人');
    }
}



module.exports = router;
