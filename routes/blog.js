/**
 * Created by mengchi on 14-10-30.
 */
var express = require('express');
var router = express.Router();
var BlogsHander = require('../controller/blogsHander');

/* GET home page. */
router.get("/",function(req,res){
    console.log("yes");

   /* user.save(function(err, newblog) {
        if (err) {
            message="save failed";
        }else{
            message="save successful";
        }
    });*/
    req.session.user_id = "5457938cdde4219d2ff330c3";
    req.session.account = "testAccount";

    /*console.log(req.session.user_id);
    var User = require('../data/models/user');
    var db = require('../util/database');
    var mongoose = require('mongoose');
    //var ObjectId = mongoose.Schema.Types.ObjectId;

    User.findOne({_id:req.session.user_id},function(err,user) {
      console.log(user);

    });
    //res.redirect("/blog/createBlog");*/
});
router.get('/createBlog', function(req, res) {
    res.render('createBlog');
});
router.get('/showBlogDetail',BlogsHander.getABlogs)
router.get('/showBlogList',BlogsHander.getAllBlogs);
router.post('/publishBlog',BlogsHander.publishABlog);
router.post('/saveBlog',BlogsHander.saveABlog);
router.post('/modifyBlog',BlogsHander.modifyABlog);

module.exports = router;
