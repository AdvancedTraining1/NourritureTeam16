/**
 * Created by zhaiyuan on 14-11-01.
 */
var db = require('../util/database')

var AttentionsDao = require("../dao/AttentionsDao");
var Attentions = require('../data/models/user');
var UserModel = require("./../data").user;

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
        account: "cc",
        password: password,
        type: 0,
        phone: "15201342222",
        sex: 0,
        head:"2.img",
        friends: {
            _id: 1,
            account : "zhaiyuan"
        },
        fans:{
            _id: 1,
            account : "zhaiyuan"
        },

        recipe_count: 2,
        topic_count: 2,
        blog_count: 2,
        comment_count: 2,
        friends_count: 3,
        fans_count: 3
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

module.exports = AttentionsHandler;