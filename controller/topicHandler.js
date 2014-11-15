/**
 * Created by huhao on 14-11-06.
 */

var TopicModel = require('../data').Topic;
var TopicDao = require("../dao/TopicDao");
var TopicUploadModel = require('./../data').TopicUpload;
var TopicUploadDao = require("../dao/TopicUploadDao");
var TopicUploadCommentModel = require('./../data').TopicUploadComment;
var TopicUploadCommentDao = require("../dao/TopicUploadCommentDao");
var TopicUploadLikeModel = require('./../data').TopicUploadLike;
var TopicUploadLikeDao = require("../dao/TopicUploadLikeDao");
var querystring = require("querystring");
//构造
function TopicHandler()
{

}

//mengchi part
TopicHandler.publishTopic = function(req,res){
//    var topicName = req.param('topicName');
//    var content = req.param('content');

    req.setEncoding('utf-8');
    var postData = "";
    console.log("ok");

    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
        console.log(postDataChunk);
    });

    req.addListener("end", function () {
        var params = querystring.parse(postData);

        var topicName = params.topicName;
        var content = params.content;

        var topic = new TopicModel({
            topicName: topicName,
            content: content,
            author: {
                id: req.session.user_id,
                account: req.session.account }

        });
        var message = ""
        TopicDao.create(topic,function (err, newtopic) {
            if (err) {
                message = "publish failed";
            } else {
                message = "publish successful";
            }
            var topic_id = newtopic._id;
            res.render('showtopic', {topicName: topicName, content: content, message: message, topic_id:topic_id})

        });

    })

}

TopicHandler.getAlltopics = function (req, res) {
    console.log("查询全部话题...");
    TopicDao.getAllTopics(function(err,topics){
        if (err) {
            res.json(500, {message: err.toString()});
            return;
        }
        if (!topics) {
            res.json(404, {message: "Not found."});
            return;
        }
        res.json(200, topics);

    })
};
TopicHandler.getATopic = function (req, res) {
    console.log("查询一个话题...");
    var topic_id = req.params.topic_id;
    console.log(topic_id);
    TopicDao.getOne(topic_id,function(err,topic){
        if (err) {
            res.json(500, {message: err.toString()});
            return;
        }
        if (!topic) {
            res.json(404, {message: "Not found."});
            return;
        }
        TopicUploadDao.getAllUploadToATopic(topic_id,function(error,uploads){
            if(error){
                res.json(500, {message: err.toString()});
                return;
            }
           // if(!uploads){
        res.render('showTopicUpload', {title: topic.topicName, picture: topic.content, topic_id:topic._id});
            //}

           // res.json(201, {topic: topic, uploads: uploads});

        })

    })
};

TopicHandler.uploadProduct = function(req, res){
//    var title = req.param('title');
//    var picture = req.param('picture');
//    var topic_id = req.param('topic_id');

    req.setEncoding('utf-8');
    var postData = "";
    console.log("ok");

    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
        console.log(postDataChunk);
    });

    req.addListener("end", function () {
        var params = querystring.parse(postData);
        var title = params.title;
        var picture = params.picture;
        var topic_id = params.topic_id;


        var topicUpload = new TopicUploadModel({
            topic_id: topic_id,
            title: title,
            picture: picture,
            author: {
                id: req.session.user_id,
                account: req.session.account }

        });
        var message = ""
        TopicUploadDao.create(topicUpload, function (err, newTopicUpload) {
            if (err) {
                console.log(err);
                message = "publish failed";
                res.json(500, {message: message});
                return;
            } else {
                message = "publish successful";
                res.json(200, newTopicUpload);
            }
        });

    });

}

TopicHandler.addCommentToTopicUpload=function(req, res){
//    var content = req.param('comment');
//    var user_id = req.session.user_id;
//    var account = req.session.account;
//    var topicUpload_id = req.param('_id');
//    var reply_id = req.param('comment_id');

    req.setEncoding('utf-8');
    var postData = "";
    console.log("ok");

    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
        console.log(postDataChunk);
    });

    req.addListener("end", function () {

        var params = querystring.parse(postData);
        var content = params.comment;
        var user_id = req.session.user_id;
        var account = req.session.account;
        var topicUpload_id = params._id;
        var reply_id = params.comment_id;

        var topicUploadComment = new TopicUploadCommentModel({
            author: {
                id: user_id,
                account: account },
            content: content,
            reply_id: reply_id,
            topicUpload_id:topicUpload_id
        });

        TopicUploadDao.getOne(topicUpload_id, function (err, topicUpload) {

            TopicUploadCommentDao.create(topicUploadComment, function (err, newTopicUploadComment) {
                if (err) {
                    console.log(err);
                    var message = "save failed";
                    res.json(500, {message: message});
                    return;
                } else {
                    var message = "save successful";
                    console.log(message);
                    var conditions = {_id: topicUpload_id}
                    console.log(topicUpload.comment_count);
                    var comment_count = topicUpload.comment_count + 1;
                    var update = {$set: { comment_count: comment_count} }
                    var options = { upsert: true};
                    TopicUploadDao.update(conditions, update, options, function (error, docs) {
                        if (error) {
                            console.log(error);
                            var message = "update failed";
                            res.json(500, {message: message});
                            return;
                        } else {
                            console.log("comment successful");
                            res.json(201, {message: "comment successful"});
                        }
                    });

                }
            })
        })


    });

}

TopicHandler.getAllCommentToTopicUpload = function (req, res) {
    var topicUpload_id = req.params.topicUpload_id;
    TopicUploadCommentDao.getAllCommentToTopicUpload(topicUpload_id,function(err,comments){
        if (err) {
            res.json(500, {message: err.toString()});
            return;
        }
        if (!comments) {
            res.json(404, {message: "Not found."});
            return;
        }
        res.json(200, comments);

    })
};


TopicHandler.deleteCommentToTopicUpload = function (req, res) {

    var conditions = {_id:req.params.comment_id};
    TopicUploadCommentDao.delete(conditions,function(error){
        if (error) {
            console.log(error);
        } else {
            console.log('delete ok!');
            res.json(201, {message: "delete ok!"});
        }
    });

}

TopicHandler.likeTopicUpload = function (req, res) {
    var topicUpload_id = req.params.topicUpload_id;
    var user_id = req.session.user_id;
    TopicUploadDao.getOne(topicUpload_id,function (err, topicUpload){
        if (err) {
            res.json(500, {message: err.toString()});
            return;
        }
        if (!topicUpload) {
            res.json(404, {message: "Not found."});
            return;
        }
        console.log("find one");
        var topicUploadLike = new TopicUploadLikeModel({
            user: {
                account: req.session.account,
                head:""
            },
            topicUpload_id: topicUpload_id,
            user_id: user_id
        });

        TopicUploadLikeDao.create(topicUploadLike,function (err,newTopicUploadLike){
            if (err) {
                var message = "save failed";
                res.json(500, {message: message});
                return;
            } else {
                var message = "save successful";
                console.log(message);
                var conditions = {_id: topicUpload_id}
                console.log( topicUpload.like_count);
                var like_count =topicUpload.like_count+1;
                var update = { $set: { like_count:like_count} }
                var options = { upsert: true};
                TopicUploadDao.update(conditions, update, options, function (error,docs) {
                    if (error) {
                        console.log(error);
                        var message = "update failed";
                        res.json(500, {message: message});
                        return;
                    } else {
                        console.log("like successful");
                        res.json(201, {message: "like successful"});
                    }
                });

            }
        })
    });

}


TopicHandler.cancelLikeTopicUpload = function (req, res) {
    var topicUpload_id = req.params.topicUpload_id;
    var user_id = req.session.user_id;
    var message = ""
    TopicUploadDao.getOne(topicUpload_id, function (err, topicUpload) {
        if (err) {
            res.json(500, {message: err.toString()});
            return;
        }
        if (!topicUpload) {
            res.json(404, {message: "Not found."});
            return;
        }
        console.log("find one");

        var like_count = topicUpload.like_count - 1;
        var update = {$set: { like_count: like_count} }
        var options = { upsert: true};
        TopicUploadDao.update({_id: topicUpload_id}, update, options, function (error) {
            if (error) {
                var message = "update failed";
                res.json(500, {message: message});
                return;
            } else {
                console.log("update successful");

            }
        });

    });
    var conditions = {topicUpload_id: topicUpload_id, user_id: user_id};

    TopicUploadLikeDao.delete(conditions, function (error) {
        if (error) {
            console.log(error);
            res.json(500, {message: error});
            return;
        } else {
            console.log('delete ok!');
            var message = "delete ok!"

            res.json(201, {message: message});
        }
    })
}



TopicHandler.add = function(req, res)
{
    req.on('data',function(data)
    {
        var obj = JSON.parse(data.toString());
        var str = '信息为:' + obj.name + obj.tel + obj.account + obj.type;

        var topic = createTopic();
        TopicDao.save(topic,function (err, data)
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



    });
};

TopicHandler.update = function(req, res)
{
    req.on('data',function(data)
    {
        var obj = JSON.parse(data.toString());
        var str = '信息为:' + obj.name + obj.tel + obj.account + obj.type;

        var conditions = {author : {id:111,account:"amount111"}};
        var update = {$set : {content : "www.qq.com"}};
        var options = {update : true};
        TopicDao.update(conditions,update,options,function (err, data)
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


    });
};

TopicHandler.getAll = function(req,res)
{
    TopicDao.getAllTopics(function (err, data)
    {
        if(err)
        {
            console.log(err);

        }else
        {

            console.log(data);

        }



    });
}

//AdvertiseHandler.getUserById = function(req,res)
//{
//    req.on('data',function(data)
//    {
//        var obj = JSON.parse(data.toString());
//        var id = obj.userid;
//        UserDao.getUserById(12221,function (err, data)
//        {
//            if(err)
//            {
//                console.log(err);
//
//            }else
//            {
//                //console.log('3432');
//                console.log(data);
//            }
//
//        });
//        res.send(obj.userid);
//
//    });
//}


TopicHandler.delete = function(req,res)
{
    req.on('data',function(data)
    {
        var conditions ={author : {id:111 , account:"amount111"}};
        var obj = JSON.parse(data.toString());
        TopicDao.delete(conditions,function (err, data)
        {
            if(err)
            {
                console.log(err);

            }else
            {

                console.log(data);
            }

        });
        res.send(obj.userid);

    });

}

TopicHandler.searchTopic = function(req,res)
{
    req.on('data',function(data)
    {
        //先这么写吧
        var obj = JSON.parse(data.toString());
        var search = "search";
        TopicDao.searchTopic(search,function (err, data)
        {
            if(err)
            {
                console.log(err);

            }else
            {
                //console.log('3432');
                console.log(data);
            }

        });
        res.send(obj.userid);

    });
}

function createTopic()
{
    var topic = new topicModel();
    topic.name = "topicname";
    topic.content = "topiccontent";
    var author = [];
    author[0] = {id:120,account:"amount111"};
    topic.author = author;
    topic.time = new Date();
    var upload = [];
    var uploadtime = new Date();
    upload[0] = {author:{id:120,account: "don't no"}, picture : "123123",upload_time : uploadtime,like_count : 1};
    topic.upload_count = 1;

    return topic;
};

module.exports = TopicHandler;
