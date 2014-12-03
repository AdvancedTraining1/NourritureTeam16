/**
 * Created by huhao on 14-11-06.
 */
var mongoose = require('mongoose');
var userModel = require('../data').user;
var UserDao = require("../dao/UserDao");
var TopicDao = require('../dao/TopicDao');

//构造
function AdminHandler()
{

}

AdminHandler.addUser = function(req, res)
{
    req.on('data',function(data)
    {
        var obj = JSON.parse(data.toString());
        var str = '信息为:' + obj.name + ':' + obj.tel + ':' + obj.account + ':' + obj.type + ':' + obj.sex + ':' + obj.password;
	    //(name,account,cellphone,password,type,sex)
	    var user = createUser(obj.name,obj.account,obj.tel,obj.password,obj.type,obj.sex);
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
        res.send(str);
        //res.json(200, {message: "admin/add"});
    });
};

AdminHandler.updateUser = function(req, res)
{
    req.on('data',function(data)
    {
        //var obj = JSON.parse(data.toString());
        //var str = '信息为:' + obj.name + obj.tel + obj.account + obj.type;

        var conditions = {account : "3"};
        var update = {$set : {phone : "3",sex : "0"}};
        var options = {update : true};
        UserDao.update(conditions,update,options,function (err, data)
        {
            if(err)
            {
                console.log(err);

            }else
            {

                console.log(data);

            }

        });
        //res.send("admin/update");
        res.json(200, {message: "admin/update"});

    });
};

AdminHandler.getAllUsers = function(req,res)
{
    UserDao.getAllUsers(function (err, data)
    {
        if(err)
        {
            console.log(err);

        }else
        {

            console.log(data);

        }

    });
    //res.send("admin/getAllUsers");
    res.json(200, {message: "admin/getAllUsers"});
}

AdminHandler.getUserByAccount = function(req,res)
{
    req.on('data',function(data)
    {
        var obj = JSON.parse(data.toString());
	    //var str = '信息为:' + obj.name + ':'
	    var user = new userModel();
        UserDao.getUserById(obj.account,function (err, data)
        {
            if(err)
            {
                console.log(err);

            }else
            {
	            user = data;
                console.log(data);
            }

        });
	    var str = '信息为:' + user.name + ':' + user.tel + ':' + user.account + ':' + user.type + ':' + user.sex + ':' + user.password;
        res.send(str);
        //res.json(200, {message: "admin/getUserById"});
    });
}


AdminHandler.deleteUser = function(req,res)
{
//console.log("234324");
    req.on('data',function(data)
    {
        var id =[];
        //var obj = JSON.parse(data.toString());
        id[0] = "6";
        id[1] = "7";
        UserDao.delete(id,function (err, data)
        {
            if(err)
            {
                console.log(err);

            }else
            {

                console.log(data);
            }

        });
        //res.send("admin/delete");
        res.json(200, {message: "admin/delete"});
    });

}

function createUser(name,account,cellphone,password,type,sex)
{

    var user = new userModel();
    user.username = name;
    user.account= account;
    user.password= password;
    user.type = type;
    user.phone = cellphone;
    user.sex = sex;
//    user.head = "headIconPath";
//    var friends0 =[];
//    friends0[0] = {id:120,account:"amount1"};
//    friends0[1] = {id:121,account:"amount2"};
//    user.friends = friends0;
//    var fan0 =[];
//    fan0[0] = {id:120,account:"amount1"};
//    fan0[1] = {id:121,account:"amount2"};
//    user.fans = fan0;
//    user.recipe_count = 0;
//    user.topic_count = 0;
//    user.blog_count = 0;
//   user.comment_count = 0;
//    user.friends_count = 0;
//    user.fans_count = 0;

    return user;
};


module.exports = AdminHandler;
