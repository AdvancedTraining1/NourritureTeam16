/**
 * Created by zhaiyuan on 14-11-9.
 */

var DaoBase = require('./DaoBase');
var User = require('./../data').user;
var Blog = require('./../data').blog;
var Attentions = require('../data/models/user');
var Recipe = require('./../data').Recipe;


var AttentionsDao = new DaoBase(User);

module.exports = AttentionsDao;

AttentionsDao.getAllAttentions = function (pageNo,pageSize,callback) {

    User.find({flag:true}).sort({'fans_count':-1}).skip((pageNo-1)*pageSize).limit(pageSize).exec(function(error,users){
        if(error)
            return callback(error,null);
        return callback(null, users);
    });

}

AttentionsDao.searchAllAttentions = function (pageNo,pageSize,queryStr,callback) {

    var str = ""+queryStr+".*";

    User.find({username:{ $regex: str}}).sort({'fans_count':-1}).skip((pageNo-1)*pageSize).limit(pageSize).exec(function(error,users){
        if(error) return callback(error,null);

        return callback(null, users);
    });
}

AttentionsDao.getNum = function (callback) {
    User.count({flag:true}).exec(function(error,num){
        if(error)
            return callback(error,null);
        return callback(null, num);
    });
};


AttentionsDao.searchNum = function (query,callback) {
    var str = ""+query+".*";
    //{ $regex: str} 第一种使用正则表达式的方式
    //*var str1 = new RegExp(query); //第二种使用正则表达式的方式

    User.count({username:{ $regex: str}}).exec(function(error,num){
        if(error)
            return callback(error,null);
        return callback(null, num);
    });
};
//---------------------------------------------------------------------------------------------------------------------------

AttentionsDao.addAttentions = function (id,friends,callback) {
    User.findByIdAndUpdate(id,{$push:{friends:friends},$inc:{friends_count:1}},function(error,users){
        return callback(null,users);
    });

}

AttentionsDao.addAttentionsFans = function (id,fans,callback) {
    User.findByIdAndUpdate(id,{$push:{fans:fans},$inc:{fans_count:1}},function(error,users){
        if(error) return callback(error,null);

        return callback(null, users);
    });

}


AttentionsDao.deleteAttentions = function (id,friends,callback) {
    User.findByIdAndUpdate(id,{$pull:{friends:friends},$inc:{friends_count:-1}},function(error,users){
        return callback(null,users);
    });

}

AttentionsDao.deleteAttentionsFans = function (id,fans,callback) {
    User.findByIdAndUpdate(id,{$pull:{fans:fans},$inc:{fans_count:-1}},function(error,users){
        if(error) return callback(error,null);

        return callback(null, users);
    });

}

AttentionsDao.lookFriendStatus = function (user, callback) {//a little problem??
    var list=[];

    for(var i= 0,len=user[0].friends.length;i<len;i++){

        var friendId=user[0].friends[i]._id;
        Blog.find({"author.id":friendId},function(err,blog){
            list=list+blog;
            //res.write(list);

            if(i+1==len) return callback(null,list);
        });

    }
}

AttentionsDao.addRecipe = function (newrecipe,callback){//recipe -----test
    newrecipe.save(function (error,newrec) {
        if(error) return callback(error,null);
        return callback(null,newrec);
    });
};

AttentionsDao.addTopic = function (newtopic,callback){//topic -----test
    newtopic.save(function (error,newtoc) {
        if(error) return callback(error,null);
        return callback(null,newtoc);
    });
};