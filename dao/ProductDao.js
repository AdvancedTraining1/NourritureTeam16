/*
 * chenmm
 * 2014/11/01
 * 作品数据访问类
 */

var DaoBase = require('./DaoBase'),
    ProductModel = require('./../data').Product;

var ProductDao = new DaoBase(ProductModel);

module.exports = ProductDao;

ProductDao.listProduct = function (recipeId,callback) {
    ProductModel.find({"recipeId":recipeId}).sort({'logTime':-1}).limit(10).exec(function(error,product){
        if(error) return callback(error,null);

        return callback(null, product);
    });
}

ProductDao.likeProduct = function (id,like,num,callback) {
    ProductModel.findByIdAndUpdate(id,{$push:{likeList:like},likeNum:num},function(error,recipe){
        if(error) return callback(error,null);

        return callback(null, recipe);
    });
}
