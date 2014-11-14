/**
 * Created by mengchi on 14-11-13.
 */
var DaoBase = require('./DaoBase'),
    CommentToBlogModel = require('./../data').CommentToBlog;

var CommentToBlogDao = new DaoBase(CommentToBlogModel);

module.exports = CommentToBlogDao;

CommentToBlogDao.getAllCommentToBlog = function (blod_id,callback) {
    CommentToBlogModel.find({blog_id:blod_id}).sort({'create_at':-1}).exec(function(error,comments){
        if(error) return callback(error,null);
        return callback(null, comments);
    });
};

CommentToBlogDao.create = function(commentToBlog,callback){
    commentToBlog.save(function (error, newCommentToBlog){
        if(error) return callback(error,null);

        return callback(null, newCommentToBlog);
    });
}