/**
 * Created by LiuHanxu on 14-11-12.
 */
var db = require('../util/database')

var UserDao = require("../dao/UserDao");
var UserModel = require("./../data").user;

var querystring = require('querystring');
var fs = require('fs');
var url = require('url');


function UserinfoHandler(){

}
UserinfoHandler.register=function(req,res){
    var username = req.param('username');
    var password = req.param('password');
    console.log("注册"+username+"密码"+password);

    var user = new UserModel({
        username: username,
        account: username,
        password: password,
        type: 0,
        phone: username,
        sex: 0,
        head:"",
        recipe_count: 2,
        topic_count: 2,
        blog_count: 2,
        comment_count: 2,
        friends_count: 3,
        fans_count: 3
    });
    UserDao.save(user,function (err, data)
    {
        if(err)
        {
            console.log(err);

        }else
        {

            console.log(data);

        }

    });
    res.send("已注册用户的用户名："+username);
};
UserinfoHandler.login=function(req,res){
    var username = req.param('username');
    var password = req.param('password');
    console.log("登陆handler");
    var user =UserDao.getUserByAccountAndPass(username,password, function (err, user)
    {
        req.session.user_id = user._id;
        req.session.account = user.account;
        req.session.userinfo=user;
        res.json(user);
    });

};

UserinfoHandler.modifypass=function(req,res){
    var username = req.param('password1');
    console.log("登陆handler");
    var user =UserDao.(username,password, function (err, user)
    {
        req.session.user_id = user._id;
        req.session.account = user.account;
        req.session.userinfo=user;
        res.json(user);
    });

};

module.exports = UserinfoHandler;