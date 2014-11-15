/**
 * Created by zhaiyuan on 14-11-01.
 */
var db = require('../util/database')

var AttentionsDao = require("../dao/AttentionsDao");
var Attentions = require('../data/models/user');
var CommentDao = require("../dao/CommentDao");
var CommentToBlogDao = require("../dao/CommentToBlogDao");
var RecipeDao = require("../dao/RecipeDao");
var BlogDao = require("../dao/BlogDao");
var TopicDao = require("../dao/TopicDao");
var TopicUploadCommentDao = require("../dao/TopicUploadCommentDao");
var BlogLikeDao = require("../dao/BlogLikeDao");
var TopicUploadLikeDao=require("../dao/TopicUploadLikeDao");

var User = require("./../data").user;
var Blog = require("./../data").Blog;
var Recipe = require("./../data").Recipe;
var Topic = require("./../data").Topic;
var CommentToBlogModel =require("./../data").CommentToBlog;
var TopicUploadCommentModel =require("./../data").TopicUploadComment;
var CommentsModel =require("./../data").Comments;
var BlogLikeModel =require("./../data").BlogLike;
var TopicUploadLikeModel=require("./../data").TopicUploadLike;

var BlogsHandler = require("../controller/blogsHandler");

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
    friends._id = "5464a08744ea60084850294a";
    friends.account = "ZHAIYUAN";
    friends.head = "2.img";

    var fans = {};
    fans._id = "5464a134462eaef3480abb39";
    fans.account = "ZHAI";
    fans.head = "2.img";

    AttentionsDao.addAttentions(fans._id,friends,function(err,users){
        //res.write(users);
        AttentionsDao.addAttentionsFans(friends._id,fans,function (err, users) {
            res.writeHead(500, {
                "Content-Type": "text/plain;charset=utf-8"
            });
            res.end("已关注！");
        });
    });

};

AttentionsHandler.deleteAttentions=function(req,res){
    console.log("取消关注");

    var friends = {};
    friends._id = "5464a08744ea60084850294a";
    friends.account = "ZHAIYUAN";
    friends.head = "2.img";

    var fans = {};
    fans._id = "5464a134462eaef3480abb39";
    fans.account = "ZHAI";
    fans.head = "2.img";


    AttentionsDao.deleteAttentions(fans._id,friends,function(err,users){
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
    console.log("查看具体好友动态");                   //a little problem to do more

    var statusId = "5464f96cf6596eda34c8f7ca";//blog,topic or recipe id

    /*Blog.find({_id: statusId}, function (err, blog) {
        //res.json(blog);
        CommentToBlogDao.getAllCommentToBlog = function (statusId,callback) {
            CommentToBlogModel.find({blog_id:statusId}).sort({'create_at':-1}).exec(function(error,comments){
            if(error) return callback(error,null);
                return callback(null, comments);
            });
        };

    });*/


    Recipe.find({_id: statusId}, function (err, recipe) {
        //res.write(recipe);

        CommentDao.listComment(statusId,function (err, commentList) {
            res.json(commentList);
        });

    });

   /*
    Topic.find({_id: statusId}, function (err, topic) {    //topic problem
        res.json(topic);
    });*/

};

AttentionsHandler.commentStatus=function(req,res) {
    console.log("评论状态");

    var statusId = "5464fcf129b38dda3894efdc";
    //  blog  5464d32def0a5efc057c384f
    // topic  5464fcf129b38dda3894efdc
    // or recipe id   5464f8be636edfe9339fe0b1

    Blog.findOne({_id: statusId}, function (err, blog) {
        if(blog!=null){
            console.log(blog);
            var commentToBlog = new CommentToBlogModel({
                author: {
                    id: "5464a134462eaef3480abb39",
                    account: "ZHAI" },
                content: "1",
                reply_id: null,
                blog_id:statusId
            });

            BlogDao.getOne(statusId, function (err, blog) {

                CommentToBlogDao.create(commentToBlog, function (err, newCommentToBlog) {
                    if (err) {
                        console.log(err);
                        var message = "comment blog failed";
                        res.json(500, {message: message});
                        return;
                    } else {
                        var message = "comment blog successful";
                        console.log(message);
                        var conditions = {_id: statusId}
                        console.log(blog.comment_count);
                        var comment_count = blog.comment_count + 1;
                        var update = {$set: { comment_count: comment_count} }
                        var options = { upsert: true};
                        BlogDao.update(conditions, update, options, function (error, docs) {
                            if (error) {
                                console.log(error);
                                var message = "comment blog failed";
                                res.json(500, {message: message});
                                return;
                            } else {
                                console.log("comment blog successful");
                                res.json(201, {message: "comment blog successful"});
                            }
                        });

                    }
                })
            })
        }
    });

    Topic.findOne({_id: statusId}, function (err, topic) {
        if(topic!=null){
            var TopicUploadComment = new TopicUploadCommentModel({
                author: {
                    id: "5464a134462eaef3480abb39",
                    account: "ZHAI" },
                content: "1",
                reply_id: null,
                topicUpload_id:statusId
            });

            TopicDao.getOne(statusId, function (err, topic) {

                TopicUploadCommentDao.create(TopicUploadComment, function (err, newTopicUploadComment) {
                    if (err) {
                        console.log(err);
                        var message = "comment topic failed";
                        res.json(500, {message: message});
                        return;
                    } else {
                        var message = "comment topic successful";
                        console.log(message);
                        res.json(201, {message: message});
                    }
                })
            })
        }
    });

    Recipe.findOne({_id: statusId}, function (err, recipe) {//??????probelm
        if(recipe!=null){
            var RecipeComment = new CommentsModel({
                author: {
                    _id: "5464a134462eaef3480abb39",
                    account: "ZHAI" ,
                    head:"2.img"},
                content: "1",
                reply_id: statusId,
                logTime:2014-11-15
                //recipe_id:statusId
            });

            Recipe.findOne({_id: statusId}, function (err, recipe) {

                CommentDao.create(RecipeComment, function (err, newRecipeComment) {
                    if (err) {
                        console.log(err);
                        var message = "comment recipe failed";
                        res.json(500, {message: message});
                        return;
                    } else {
                        var message = "comment recipe successful";
                        console.log(message);
                        res.json(201, {message: "comment recipe successful"});

                    }
                })
            })
        }
    });
};


AttentionsHandler.likeStatus=function(req,res) {
    console.log("点赞");

    var statusId = "5464d32def0a5efc057c384f";
    //  blog  5464d32def0a5efc057c384f
    // topic  5464fcf129b38dda3894efdc
    // or recipe id   5464f8be636edfe9339fe0b1

    Blog.findOne({_id: statusId}, function (err, blog) {
        if (blog != null) {
            //BlogsHandler.likeBlog()
                var blogLike = new BlogLikeModel({
                    user: {
                        account: "ZHAI",
                        head:""
                    },
                    blog_id: statusId,
                    user_id: "5464a134462eaef3480abb39"
                });

                BlogLikeDao.create(blogLike,function (err,newBlogLike){
                    if (err) {
                        var message = "like blog failed";
                        res.json(500, {message: message});
                        return;
                    } else {
                        var message = "like blog successful";
                        console.log(message);
                        var conditions = {_id: statusId}
                        console.log( blog.like_count);
                        var like_count =blog.like_count+1;
                        var update = { $set: { like_count:like_count} }
                        var options = { upsert: true};
                        BlogDao.update(conditions, update, options, function (error,docs) {
                            if (error) {
                                console.log(error);
                                var message = "like blog failed";
                                res.json(500, {message: message});
                                return;
                            } else {
                                console.log("like blog successful");
                                res.json(201, {message: "like blog successful"});
                            }
                        });

                    }
                })

        }
    });

    Topic.findOne({_id: statusId}, function (err, topic){
       if(topic!=null) {
               var topicUploadLike = new TopicUploadLikeModel({
                   user: {
                       account: "ZHAI",
                       head:""
                   },
                   topicUpload_id: statusId,
                   user_id: "5464a134462eaef3480abb39"
               });

               TopicUploadLikeDao.create(topicUploadLike,function (err,newTopicUploadLike){
                   if (err) {
                       var message = "like topic failed";
                       res.json(500, {message: message});
                       return;
                   } else {
                       var message = "like topic successful";
                       console.log(message);
                       res.json(201, {message: "like topic successful"});

                   }
               })

       }
    });


    //recipe like? product like
};

AttentionsHandler.cancelLike=function(req,res) {
    console.log("取消点赞");

    var statusId = "5464d32def0a5efc057c384f";
    //  blog  5464d32def0a5efc057c384f
    // topic  5464fcf129b38dda3894efdc
    // or recipe id   5464f8be636edfe9339fe0b1

    Blog.findOne({_id: statusId}, function (err, blog){
        if(blog!=null){
            var like_count = blog.like_count - 1;
            var update = {$set: { like_count: like_count} }
            var options = { upsert: true};
            BlogDao.update({_id: statusId}, update, options, function (error) {
                if (error) {
                    var message = "cancel like blog failed";
                    res.json(500, {message: message});
                    return;
                } else {
                    console.log("cancel like blog successful");

                }
            });

            var conditions = {blog_id: statusId, user_id: "5464a134462eaef3480abb39"};
            BlogLikeDao.delete(conditions, function (error) {
                if (error) {
                    console.log(error);
                    res.json(500, {message: error});
                    return;
                } else {
                    console.log('cancel like blog ok!');
                    var message = "cancel like blog ok!"

                    res.json(201, {message: message});
                }
            })
        }
    });

    Topic.findOne({_id: statusId}, function (err, topic){
        if(topic!=null){

            var conditions = {topicUpload_id: statusId, user_id: "5464a134462eaef3480abb39"};
            TopicUploadLikeDao.delete(conditions, function (error) {
                if (error) {
                    console.log(error);
                    res.json(500, {message: error});
                    return;
                } else {
                    console.log('cancel like topic ok!');
                    var message = "cancel like topic ok!"

                    res.json(201, {message: message});
                }
            })
        }
    });

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