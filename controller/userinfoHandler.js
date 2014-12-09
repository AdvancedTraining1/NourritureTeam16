/**
 * Created by LiuHanxu on 14-11-12.
 */
var db = require('../util/database')

var UserDao = require("../dao/UserDao");
var UserModel = require("./../data").user;
var querystring = require("querystring");
    //formidable = require('formidable'),
    //fs = require('fs'),
    //url = require('url'),
    //config=require("../util/config");


function UserinfoHandler(){

}
UserinfoHandler.register=function(req,res){

    req.setEncoding('utf-8');
    var postData = "";
    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });
    // 数据接收完毕，执行回调函数
    req.addListener("end", function () {
        var params = querystring.parse(postData);
        console.log(params);
        var username = params.username;
        var password = params.password;
        var email = params.email;
        console.log("注册---username:" + username + "-----密码:" + password);

        var user = new UserModel({
            username: username,
            account: username,
            password: password,
            email: email,
            head: "/public/head/defaulthead.jpeg"
        });
        for (var i1 = 0; i1++; i1 < 10) {
            var username = username + i1.toString();
        }

        UserDao.save(user, function (err, data) {
            if(err){
                res.writeHead(500, {
                    "Content-Type": "text/plain;charset=utf-8"
                });
                res.end("注册失败！");
            }else {
                req.session.user_id = user._id;
                req.session.account = user.account;
                req.session.head = user.head;
                res.writeHead(200, {
                    "Content-Type": "text/plain;charset=utf-8"
                });
                res.end("注册成功！");
            }

        });
    });
};

UserinfoHandler.login=function(req,res){
    req.setEncoding('utf-8');
    var postData = "";
    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });
    // 数据接收完毕，执行回调函数
    req.addListener("end", function () {
        var params = querystring.parse(postData);
        console.log("登陆handler------params:" + params);
        console.log(params);
        UserDao.getUserByAccountAndPass(params['username'], params['password'], function (err, user) {

            if(err&& err.length>0){
                res.json({message:"登录失败！",user:null});
                //res.writeHead(500, {
                //    "Content-Type": "text/plain;charset=utf-8"
                //});
                //res.end("登录失败！");
            }else if(user==null){
                res.json({message:"用户名不存在或密码错误，请重新登录！",user:null});
            } else{
                req.session.user_id = user._id;
                req.session.account = user.account;
                req.session.head = user.head;
                console.log(req.session.user_id);
                res.json({message:"登陆成功！",user:user});

                //res.writeHead(200, {
                //    "Content-Type": "text/plain;charset=utf-8"
                //});
                //res.end("登录成功！");
            }

        });
    });

};

UserinfoHandler.modifypass=function(req,res){
    req.setEncoding('utf-8');
    var postData = "";

    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });

    var params = querystring.parse(postData);
    var oldpass = params.passwordold;
    var newpass = params.passwordnew;

    console.log("修改密码handler");

    var conditions = {_id:req.session.user_id};
    var update={"password":newpass};

    var user =UserDao.update(conditions,update,null,function (err, message)
    {
        if(err)
        {
            console.log(err);

        }else
        {

            res.json(message);

        }
    });

};

UserinfoHandler.modifyinfo=function(req,res){
    req.setEncoding('utf-8');
    var postData = "";

    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });

    var params = querystring.parse(postData);

    var username = params.username;
    var head = params.head;
    console.log("修改个人信息handler");

    var conditions = {_id:req.session.user_id};
    var update={username:username,head:head};

    var user =UserDao.update(conditions,update,null,function (err, message)
    {
        if(err)
        {
            console.log(err);

        }else
        {

            res.json(message);

        }
    });

};

UserinfoHandler.viewUserinfo=function(req,res){

    var user_id =req.session.user_id;
    console.log("查看个人信息handler---user_id："+user_id);

    var user =UserDao.getUserById(user_id,function (err, user)
    {
        if(err)
        {
            console.log(err);

        }else
        {

            res.json(user);

        }
    });

};


module.exports = UserinfoHandler;