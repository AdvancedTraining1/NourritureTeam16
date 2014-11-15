/**
 * this is edited by huhao
 * 2014.11.06
 * chenmm push me to do this i don't understand until now
 */

var DaoBase = require('./DaoBase');
var topicModel = require('../data').Topic;

var TopicDao = new DaoBase(topicModel);

module.exports = TopicDao;


TopicDao.create = function(topic,callback){
    topic.save(function (error, newtopic){
        console.log("dao" + topic);
        if(error) return callback(error,null);

        return callback(null, newtopic);
    });
}

TopicDao.getAllTopics = function (callback)
{
    topicModel.find({},function(err,topics) {
        if (err) {
            callback(err,null);
            return;
        }
        if (!topics) {
            callback(null,"no topic");
            return;
        }
        callback(null,topics);

    });

};
TopicDao.getOne = function (id,callback) {
    topicModel.findOne({_id:id}).exec(function(error,topic){
        if(error) return callback(error,null);
        return callback(null, topic);
    });
};


TopicDao.save = function (obj,callback)
{
    obj.save(function (err) {
        if (err)
            callback(err,null);
        else
            callback(null,'TopicDao.save success');
    });
};



TopicDao.delete = function (conditions,callback) {
    topicModel.remove(conditions).exec(function(error,user){
        if(error) return callback(error,null);

        return callback(null, user);
        //return callback(null, 'RecipeDao.delete success');
    });
}

TopicDao.update = function (conditions,update,options,callback) {
    topicModel.update(conditions,update,options).exec(function(error,data){
        if(error) return callback(error,null);

        return callback(null, 'UserDao.update success');
        //return callback(null, 'RecipeDao.delete success');
    });
}

//AdvertiseDao.getUserById = function (userId,callback) {
//    advertiseModel.find({"account":userId}).exec(function(error,user){
//        if(error) return callback(error,null);
//
//        return callback(null, user);
//    });
//}
TopicDao.searchTopic = function (search,callback) {
    topicModel.find({"topicName":search}).exec(function(error,user){
        if(error) return callback(error,null);

        return callback(null, user);
    });
}

module.exports = TopicDao;
