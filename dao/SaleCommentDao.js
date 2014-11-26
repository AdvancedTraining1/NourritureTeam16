/**
 * Created by zhangcan on 14-11-26.
 */
var DaoBase = require('./DaoBase'),
    SaleComment = require('./../data').CommentToBlog;

var SaleCommentDao = new DaoBase(SaleComment);

module.exports = SaleCommentDao;

SaleCommentDao.getAll = function (sale_id, callback) {
    SaleComment.find({blog_id:sale_id}).sort({'create_at':-1}).exec(function(error,comments){
        if(error)
            return callback(error, null);
        return callback(null, comments);
    });
};

SaleCommentDao.create = function(saleComment, callback){
    saleComment.save(function (error, newSaleComment){
        if(error)
            return callback(error,null);

        return callback(null, newSaleComment);
    });
}