/**
 * Created by huhao on 14-11-06.
 */

var topicModel = require('../data').topic;
var TopicDao = require("../dao/TopicDao");

//构造
function TopicHandler()
{

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
