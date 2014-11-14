/**
 * Created by mengchi on 14-11-13.
 */
var express = require('express');
var router = express.Router();
var topicHander = require('../controller/topicHandler');

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
    //res.redirect("/topic/createTopic");
    //res.render('showTopicUpload', { title: 'Express' ,picture:'haha'});
    res.render('index', { title: 'Express' });
});
router.get('/createTopic', function(req, res) {
    res.render('createTopic');
});
router.get('/showTopicDetail/:topic_id',topicHander.getATopic)
router.get('/showTopicList',topicHander.getAlltopics);
router.post('/publishTopic',topicHander.publishTopic);
router.post('/joinTopic',topicHander.uploadProduct);
router.get('/likeTopicUpload/:topicUpload_id',topicHander.likeTopicUpload);
router.get('/cancelLikeTopicUpload/:topicUpload_id',topicHander.cancelLikeTopicUpload);
router.post('/addCommentToTopicUpload',topicHander.addCommentToTopicUpload);
router.get('/getAllCommentToTopicUpload/:topicUpload_id',topicHander.getAllCommentToTopicUpload);
router.get('/deleteCommentToTopicUpload/:comment_id',topicHander.deleteCommentToTopicUpload);


module.exports = router;
