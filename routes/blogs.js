/**
 * Created by mengchi on 14-10-19.
 */
var express = require('express');
var router = express.Router();


blogs = ['博客1','博客2'];
/* GET home page. */
router.get('/', function(req, res){
    getAllBlogs(req,res, function(err, user){
        if (err) return next(err);
        res.send(req.allblos);
    });
});

function getAllBlogs(req,res, next) {
    console.log("查询全部博客...");
    if (blogs) {
        req.allblos = blogs;
        next();
    } else {
        console.log('尚无博客');
    }
}



module.exports = router;
