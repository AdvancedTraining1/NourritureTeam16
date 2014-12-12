/**
 * Created by LiuHanxu on 14-11-12.
 */
var db = require('../util/database')

var UserDao = require("../dao/UserDao");
var UserModel = require('../data').user;
var querystring = require("querystring"),
    formidable = require('formidable'),
    fs = require('fs'),
    url = require('url'),
    config=require("../util/config");


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
        console.log(params);//{ username: 'aaa', password: 'aaa', email: '1412@sfd.com' }

        var username = params.username;
        var password = params.password;
        var email = params.email;
        console.log("注册---username:" + username + "-----密码:" + password);

        var user = new UserModel({
            username: username,
            account: username,
            password: password,
            email: email
        });

        UserDao.save(user, function (err, data) {
            if(err&& err.length>0){
                res.json({message:"注册失败！"});
            }else {
                res.json({message:"注册成功！"});
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
                req.session.user_name = user.username;
                req.session.password = user.password;
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

    console.log("修改密码handler");
    var params = querystring.parse(postData);
    var oldpass = params.passwordold;
    var newpass = params.passwordnew1;

    var oldpassOfUser=req.session.password;
    if(oldpass!=oldpassOfUser){
        res.json({message:"原密码输入不正确"});
        return 0;
    }
    var conditions = {_id:req.session.user_id};
    var update={"password":newpass};

    var user =UserDao.update(conditions,update,null,function (err, user)
    {
        if(err)
        {
            console.log(err);
            res.json({message:"修改密码失败！"});

        }else
        {
            req.session.password =newpass ;  //修改session中的值
            res.json({message:"修改密码成功！"});

        }
    });

};
UserinfoHandler.isLogin = function(req,res){
    var user_id = req.session.user_id;
    if(user_id.length>0){
        res.json({message:"1",username:req.session.user_name});
    }else{
        res.json({message:"2"});
    }
}

UserinfoHandler.modifyinfo=function(req,res){
    req.setEncoding('utf-8');
    var postData = "";

    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });

    var params = querystring.parse(postData);
    console.log("UserHandler---更改个人信息");
    var username = params['username'];
    var email = params['email'];
    console.log("修改个人信息handler");

    var conditions = {_id:req.session.user_id};
    var update={username:username,email:email};

    var user =UserDao.update(conditions,update,null,function (err, user)
    {
        if(err)
        {
            console.log(err);
            res.json({message:"修改失败！"});

        }else
        {

            res.json({message:"修改成功！"});

        }
    });

};

UserinfoHandler.viewUserinfo=function(req,res){

    var user_account =req.session.account;
    console.log("UserHandler---查看个人信息---user_account："+user_account);

    var user = UserDao.getUserByAccount(user_account,function (err, user)
    {
        if(err)
        {
            console.log(err);
            res.json({message:"获取个人信息失败....",user:null});

        }else
        {

            res.json({message:"获取个人信息成功！",user:user});

        }
    });

};


module.exports = UserinfoHandler;