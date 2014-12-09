/**
 * Created by zhaiyuan on 2014-11-01.
 */
//var express = require('express');
//var router = express.Router();
var AttentionsHandler = require('../controller/attentionsHandler');
//var BlogsHander = require('../controller/blogsHandler');

module.exports = function(app){

    app.get('/attention/friendStatusListRecipe',function(req,res){
        //console.log("+++++");
        res.render("attention/friendStatusListRecipe");  //views
    });
    app.get('/service/attention/lookFriendStatusRecipe',AttentionsHandler.lookFriendStatusRecipe);



    app.get('/attention/getAllAttention',function(req,res){
        res.render("attention/getAllAttention");  //views
    });
    app.get('/service/attention/searchAll',AttentionsHandler.searchAll);
    app.get('/service/attention/listAll',AttentionsHandler.listAll);



    app.get('/attention/addAttentions/',AttentionsHandler.addAttentions);
    app.get('/attention/deleteAttentions/',AttentionsHandler.deleteAttentions);


};

/*
router.get("/",function(req,res){
    req.session.user_id="54578976af75277b630cc379";
    req.session.account="zhaiyuan";
})

router.get('/register',function(req,res){
    res.render('register');
});
router.post('/addUser',AttentionsHandler.addUser);



router.get('/addRecipe/',AttentionsHandler.addRecipe);
router.get('/addTopic/',AttentionsHandler.addTopic);

router.get('/lookOneFriendStatus/',AttentionsHandler.lookOneFriendStatus);

router.get('/commentStatus/',AttentionsHandler.commentStatus);
router.get('/deleteComment/:comment_id',BlogsHander.deleteCommentToBlog);//??
router.get('/likeStatus/',AttentionsHandler.likeStatus);
router.get('/cancelLike/',AttentionsHandler.cancelLike);
*/



//module.exports = router;
