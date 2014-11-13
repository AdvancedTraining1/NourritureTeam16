/**
 * Created by mengchi on 14-10-30.
 */
var express = require('express');
var router = express.Router();
var BlogsHander = require('../controller/blogsHandler');

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

    console.log(req.session.user_id);
    /*var User = require('../data/models/user');
    var db = require('../util/database');
    var mongoose = require('mongoose');
    //var ObjectId = mongoose.Schema.Types.ObjectId;

    User.findOne({_id:req.session.user_id},function(err,user) {
      console.log(user);

    });*/
    //res.redirect("/blog/createBlog");
    res.render('index', { title: 'Express' });
});
router.get('/createBlog', function(req, res) {
    res.render('createBlog');
});
router.get('/showBlogDetail/:blog_id',BlogsHander.getABlogs)
router.get('/showBlogList',BlogsHander.getAllBlogs);
router.post('/publishBlog',BlogsHander.publishABlog);
router.post('/saveBlog',BlogsHander.saveABlog);
router.get('/modifyBlog/:blog_id',BlogsHander.modifyBlog);
router.post('/saveModifyBlog',BlogsHander.saveModifyBlog);
router.get('/deleteBlog/:blog_id',BlogsHander.deleteBlog);
router.get('/collectionBlog/:blog_id',BlogsHander.collectionBlog);
router.get('/cancellationBlog/:blog_id',BlogsHander.cancellationBlog);
router.get('/likeBlog/:blog_id',BlogsHander.likeBlog);
router.get('/cancelLikeBlog/:blog_id',BlogsHander.cancelLikeBlog);
router.post('/addCommentToBlog',BlogsHander.addCommentToBlog);
router.get('/showCommentListToBlog/:blog_id',BlogsHander.getAllCommentToBlog);
router.get('/deleteCommentToBlog/:comment_id',BlogsHander.deleteCommentToBlog);

module.exports = router;
