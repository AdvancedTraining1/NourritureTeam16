/**
 * Created by zhaiyuan on 14-11-01.
 */
var db = require('../util/database')

var AttentionsDao = require("../dao/AttentionsDao");
var Attentions = require('../data/models/user');
var CommentDao = require("../dao/CommentDao");

var User = require("./../data").user;
var Blog = require("./../data").blog;
var Recipe = require("./../data").Recipe;
var Topic = require("./../data").topic;

var querystring = require('querystring');
var fs = require('fs');
var url = require('url');


function AttentionsHandler(){

}

AttentionsHandler.addUser=function(req,res){
    var username = req.param('username');
    var password = req.param('password');

    var user = new Attentions({
        username: username,
        account: "ZHAI",
        password: password,
        type: 0,
        phone: "15201345555",
        sex: 0,
        head:"2.img",
        friends: [{
            _id: "54578976af75277b630cc379",
            account : "zhaiyuan",
            head: "1.img"
        },
        {
            _id: "5457aa1f0233539703192dc9",
            account : "mengchi",
            head: "2.img"
        }],
        fans:[{
            _id: "54578976af75277b630cc379",
            account : "zhaiyuan",
            head: "1.img"
        },
        {
            _id: "5457aa1f0233539703192dc9",
            account : "mengchi",
            head: "2.img"
        }],

        recipe_count: 2,
        topic_count: 2,
        blog_count: 2,
        comment_count: 2,
        friends_count: 2,
        fans_count: 2
    });
    user.save(function(err, newuser) {
        if (err) {
            res.json(500, {message: err.toString()});
            return;
        }
        console.log(newuser)
        res.json(201, newuser);
        res.render('index');
    });
};


AttentionsHandler.getAllAttentions=function(req,res){
    console.log("搜索所有用户（目的添加好友）...");

    AttentionsDao.getAllAttentions(req.params.queryStr,function (err, users) {
        res.json(users);
    });

};


AttentionsHandler.addAttentions=function(req,res){
    console.log("关注");

    var friends = {};
    friends._id = "545f8668ac06b99c410813ec";
    friends.account = "cc";
    friends.head = "2.img";

    var fans = {};
    fans._id = "545f7ff054e28bbc3d13df3c";
    fans.account = "bb";
    fans.head = "2.img";

        /*AttentionsDao.getById(fans._id,function(err,users){
            console.log(fans._id);
            //var num = users.friends_count + 1;console.log(users.friends_count);console.log(num);console.log(friends);
            AttentionsDao.addAttentions(fans._id,friends);
        });

        AttentionsDao.getById(friends._id,function(err,users){
            //var num = users.fans_count + 1;
            AttentionsDao.addAttentionsFans(friends._id,fans,function (err, users) {
                res.writeHead(500, {
                    "Content-Type": "text/plain;charset=utf-8"
                });
                res.end("已关注！");
            });
        });*/
    AttentionsDao.addAttentions(fans._id,friends);
    AttentionsDao.addAttentionsFans(friends._id,fans,function (err, users) {
        res.writeHead(500, {
            "Content-Type": "text/plain;charset=utf-8"
        });
        res.end("已关注！");
    });
};

AttentionsHandler.deleteAttentions=function(req,res){
    console.log("取消关注");

    var friends = {};
    friends._id = "545f8668ac06b99c410813ec";
    friends.account = "cc";
    friends.head = "2.img";

    var fans = {};
    fans._id = "545f7ff054e28bbc3d13df3c";
    fans.account = "bb";
    fans.head = "2.img";

    AttentionsDao.getById(fans._id,function(err,users){
        AttentionsDao.deleteAttentions(fans._id,friends);
    });

    AttentionsDao.getById(friends._id,function(err,users){
        AttentionsDao.deleteAttentionsFans(friends._id,fans,function (err, users) {
            res.writeHead(500, {
                "Content-Type": "text/plain;charset=utf-8"
            });
            res.end("已取消关注！");
        });
    });

};


AttentionsHandler.lookFriendStatus=function(req,res){
    console.log("查看好友动态");

    var sessionId="5464a134462eaef3480abb39";//ZHAI id

    User.find({_id:sessionId},function(err,user){

        /*AttentionsDao.lookFriendStatus(user,function(err,bloglist){
            res.json(bloglist);
        })
*/
        var list1=[];
        var list2=[];
        var list3=[];
        for(var i= 0,len=user[0].friends.length;i<len;i++){

            var friendId=user[0].friends[i]._id;
            Blog.find({"author.id":friendId},function(err,blog){
                list1=list1+blog;
                //if(i+1==len)
                res.write(list1);
            });
            Recipe.find({"author._id":friendId},function(err,recipe){
                list2=list2+recipe;
                //if(i+1==len)
                res.write(list2);
            });
            Topic.find({"author.id":friendId},function(err,topic){
                list3=list3+topic;
                //if(i+1==len)
                res.write(list3);
            });
        }

    });

};


AttentionsHandler.lookOneFriendStatus=function(req,res) {
    console.log("查看具体好友动态");

    var statusId = "5464f8be636edfe9339fe0b0";//blog,topic or recipe id

    /*Blog.find({_id: statusId}, function (err, blog) {
        res.json(blog);


    });*/


    Recipe.find({_id: statusId}, function (err, recipe) {
        res.json(recipe);

        CommentDao.listComment(statusId,function (err, commentList) {
            res.json(commentList);
        });

    });

   /*
    Topic.find({_id: statusId}, function (err, topic) {
        res.json(topic);
    });*/

};

AttentionsHandler.addRecipe=function(req,res){
    console.log("发布菜谱--test");

    var recipe = new Recipe({
        recipeName: "2",
        description: "2",
        author: {
            _id: "5457aa1f0233539703192dc9",
            head: "2.img",
            account: "mengchi" },
        material: [{
            materialName: "2",
            amount: "2"
        }],
        difficult: "2",
        cookTime: "2",
        step: [{
            stepNum: "2",
            stepExplain: "2",
            stepPhoto: "2"
        }],
        logTime: 2014-11-14,
        collectNum: 2,
        commentNum: 2,
        productNum: 2,
        flag: true

    });

        AttentionsDao.addRecipe(recipe,function(err,newrecipe){
            res.json(201, newrecipe);
            res.render('index');

        });

};

AttentionsHandler.addTopic=function(req,res){
    console.log("发布话题--test");

    var topic = new Topic({
        topicName:"2",
        content: "2",
        author: {
            id: "54578976af75277b630cc379",
            account: "zhaiyuan" },
        time: 2014-11-14,

        upload: {
            author: {
                id: "54578976af75277b630cc379",
                account:  "zhaiyuan" },
            picture : "3.img",
            upload_time:2014-11-14,
            like_count: 4
        },

        upload_count: 4

    });

    AttentionsDao.addTopic(topic,function(err,newtopic){
        res.json(201, newtopic);
        res.render('index');

    });

};

module.exports = AttentionsHandler;