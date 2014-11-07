/**
 * chenmm
 * 2014/10/30
 * 菜谱数据访问类
 */

var DaoBase = require('./DaoBase'),
    Recipe = require('./../data').Recipe;

var RecipeDao = new DaoBase(Recipe);

module.exports = RecipeDao;

RecipeDao.getOwn = function (authorId,callback) {
    Recipe.find({"author.id":authorId,flag:true}).sort({'logTime':-1}).limit(10).exec(function(error,recipe){
        if(error) return callback(error,null);

        return callback(null, recipe);
    });
}

RecipeDao.update = function(id,recipeNew,callback){
    Recipe.findByIdAndUpdate(id,recipeNew,function(error,recipe){
        if(error) return callback(error,null);

        return callback(null, recipe);
    });
}

RecipeDao.delete = function (list,callback) {
    Recipe.remove({_id:{$in:list}}).exec(function(error,recipe){
        if(error) return callback(error,null);

        return callback(null, recipe);
    });
}

RecipeDao.getAll = function (callback) {
    Recipe.find({flag:true}).sort({'logTime':-1}).limit(1).exec(function(error,recipe){
        if(error) return callback(error,null);

        return callback(null, recipe);
    });
};

RecipeDao.searchRecipe = function (query,callback) {
    var str = ""+query+".*";
    //{ $regex: str} 第一种使用正则表达式的方式
    //var str1 = new RegExp(query); 第二种使用正则表达式的方式
    Recipe.find({recipeName:{ $regex: str}}).sort({'logTime':-1}).limit(10).exec(function(error,recipe){
        if(error) return callback(error,null);

        return callback(null, recipe);
    });
}

RecipeDao.listComment = function(id,callback){
    Recipe.find({_id:id},{commentList:1}).sort({'logTime':-1}).limit(10).exec(function(error,recipe){
        if(error) return callback(error,null);

        return callback(null, recipe);
    });
}

RecipeDao.comment = function (id,comment,callback) {
    Recipe.findByIdAndUpdate(id,{$push:comment},function(error,recipe){
        if(error) return callback(error,null);

        return callback(null, recipe);
    });
}
