/**
 * Created by zhaiyuan on 14-11-01.
 */
var db = require('../util/database')
var Attentions = require('../data/models/user');

function AttentionsHander(){

}

AttentionsHander.addUser=function(req,res){
    var user = new Attentions({
        username: "mengchi",
        account: "mengchi",
        password: "mengchi",
        type: 0,
        phone: "15201345941",
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
        friends_count: 1,
        fans_count: 1
    });
    user.save(function(err, newuser) {
        if (err) {
            res.json(500, {message: err.toString()});
            return;
        }
        console.log(newuser)
        res.json(201, newuser);
    });
};


AttentionsHander.getAllAttentions=function(req,res){
    console.log("搜索所有用户（目的添加好友）...");
    Attentions.find({},function(err,users) {

        if (err) {
            res.json(500, {message: err.toString()});
            return;
        }
        if (!users) {
            res.json(404, {message: "Not found."});
            return;
        }
        res.json(200, users);

    });

};

AttentionsHander.addAttentions=function(req,res){
    var blog = new Blog({
        title: "test title5",
        content: "my test content"
    });
    blog.save(function(err, newblog) {
        if (err) {
            res.json(500, {message: err.toString()});
            return;
        }
        console.log(newblog)
        res.json(201, newblog);
    });
};

AttentionsHander.deleteAttentions=function(req,res){
    var blog = new Blog({
        title: "test title5",
        content: "my test content"
    });
    blog.save(function(err, newblog) {
        if (err) {
            res.json(500, {message: err.toString()});
            return;
        }
        console.log(newblog)
        res.json(201, newblog);
    });
};

module.exports = AttentionsHander;