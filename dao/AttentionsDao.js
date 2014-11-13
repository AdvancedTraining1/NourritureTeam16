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

AttentionsDao.getAllAttentions = function (querystr,callback) {
    var str = ""+querystr+".*";
    if(str==null||str==""){
        User.find({flag:true}).sort({'fans_count':-1}).limit(10).exec(function(error,users) {//是否查询全部
            if (error) return callback(error,null);

            return callback(null, users);

        });
    }else{
        User.find({username:{ $regex: str}}).sort({'fans_count':-1}).limit(10).exec(function(error,users){
            if(error) return callback(error,null);

            return callback(null, users);
        });
    }

}


AttentionsDao.addAttentions = function (id,friends) {
    User.findByIdAndUpdate(id,{$push:{friends:friends},$inc:{friends_count:1}});

}

AttentionsDao.addAttentionsFans = function (id,fans,callback) {
    User.findByIdAndUpdate(id,{$push:{fans:fans},$inc:{fans_count:1}},function(error,users){
        if(error) return callback(error,null);

        return callback(null, users);
    });

}


AttentionsDao.deleteAttentions = function (id,friends) {
    User.findByIdAndUpdate(id,{$pull:{friends:friends},$inc:{friends_count:-1}});

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