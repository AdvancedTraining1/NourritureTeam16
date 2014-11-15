/**
 * Created by zhangcan on 14-11-11.
 * Today is f**king my day
 */
var DaoBase = require('./DaoBase'),
    Sale = require('./../data').sale;

var SaleDao = new DaoBase(Sale);

module.exports = SaleDao;

SaleDao.getAll = function (callback) {
    Sale.find({}).sort({update_at:1}).limit(10).exec(function(err, sale){
        if(err)
            return callback(err, null);
        return callback(null, sale);
    });
}

SaleDao.getOne = function (id, callback) {
    Sale.find({_id:id}).sort({update_at:1}).limit(10).exec(function(err, sale){
        if(err)
            return callback(err, null);
        return callback(null, sale);
    });
}

SaleDao.getOwn = function (authorId, callback) {
    Sale.find({"author._id":authorId}, function(err, sale){
       if(err)
       {
           return callback(err, null);
       }
       return callback(null, sale);
    });
}

/*SaleDao.getAllByLast = function (callback) {
 Sale.find({}).sort({update_at:1}).limit(10).exec(function(err, sale){
 if(err)
 return callback(err, null);
 return callback(null, sale);
 });
 }*/

SaleDao.edit = function (id, newSale, callback){
    Sale.findByIdAndUpdate(id, newSale, function(err, sale){
        if(err)
        {
            return callback(err, null);
        }
        return callback(null, sale);
    });
}

SaleDao.delete = function (list, callback) {
    Sale.remove({_id:{$in:list}}).exec(function(error,sale) {
        if (error)
        {
            return callback(error, null);
        }
        return callback(null, sale);
    });
}

SaleDao.search = function (keyword, callback) {
    var query = "" + keyword + ".*";
    Sale.find({title:{ $regex: query}}).sort({update_at:1}).exec(function(err, sale){
        if (err)
        {
            return callback(err, null);
        }
        return callback(null, sale);
    });
}