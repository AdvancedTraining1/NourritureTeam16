/**
 * Created by huhao on 14-11-06.
 */

var userModel = require('../data').user;
var UserDao = require("../dao/UserDao");

//构造
function AdminHandler()
{

}

AdminHandler.addUser = function(req, res)
{
    req.on('data',function(data)
    {
        var obj = JSON.parse(data.toString());
        var str = '信息为:' + obj.name + obj.tel + obj.account + obj.type;

        var user = createUser();
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

//        user.save(function (err) {
//            console.log(err);
//        });

//        userModel.find({username: 'userName1'}, function (err, admin) {
//            console.log("find it")
//        });

        res.send(str);
    });
};

function createUser()
{

    var user = new userModel();
    user.username="userName1";
    user.account="12221";
    user.password="123";
    user.type = 1;
    user.phone = "12345678910111";
    user.sex = 1;
    user.head = "headIconPath";
    var friends0 =[];
    friends0[0] = {id:120,account:"amount1"};
    friends0[1] = {id:121,account:"amount2"};
    user.friends = friends0;
    var fan0 =[];
    fan0[0] = {id:120,account:"amount1"};
    fan0[1] = {id:121,account:"amount2"};
    user.fans = fan0;
    user.recipe_count = 0;
    user.topic_count = 0;
    user.blog_count = 0;
    user.comment_count = 0;
    user.friends_count = 0;
    user.fans_count = 0;

    return user;
};

module.exports = AdminHandler;
