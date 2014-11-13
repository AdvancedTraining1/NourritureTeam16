/**
 * Created by zhaiyuan on 2014-11-01.
 */
var express = require('express');
var router = express.Router();
var AttentionsHandler = require('../controller/attentionsHandler');

/* GET home page. */
router.get("/",function(req,res){
    req.session.user_id="54578976af75277b630cc379";
    req.session.account="zhaiyuan";
})

router.get('/register',function(req,res){
    res.render('register');
});
router.post('/addUser',AttentionsHandler.addUser);
router.get('/getAllAttentions/:queryStr',AttentionsHandler.getAllAttentions);
router.get('/addAttentions/',AttentionsHandler.addAttentions);
router.get('/deleteAttentions/',AttentionsHandler.deleteAttentions);


router.get('/lookFriendStatus/',AttentionsHandler.lookFriendStatus);

router.get('/addRecipe/',AttentionsHandler.addRecipe);
router.get('/addTopic/',AttentionsHandler.addTopic);

router.get('/lookOneFriendStatus/',AttentionsHandler.lookOneFriendStatus);

router.get('/commentStatus/',AttentionsHandler.commentStatus);
//router.get('/deleteComment/',AttentionsHandler.deleteComment);
router.get('/likeStatus/',AttentionsHandler.likeStatus);
router.get('/cancelLike/',AttentionsHandler.cancelLike);



module.exports = router;
