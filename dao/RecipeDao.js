/**
 * this is edited by chenmm
 * 2014.11.06
 * chenmm push me to do this i don't understand until now
 */

var DaoBase = require('./DaoBase'),
    Recipe = require('./../data').Recipe;

var RecipeDao = new DaoBase(Recipe);

module.exports = RecipeDao;

RecipeDao.getOwn = function (authorId,callback) {
    Recipe.find({"author.id":authorId}).sort({'logTime':-1}).limit(10).exec(function(error,recipe){
        if(error) return callback(error,null);

        return callback(null, recipe);
    });
}

RecipeDao.update = function(recipe,recipeNew,callback){
    Recipe.findOneAndUpdate(recipe,recipeNew).exec(function(error,recipes){
        if(error) return callback(error,null);

        return callback(null, recipes);
    });
}

RecipeDao.delete = function (list,callback) {
    Recipe.remove({account:{$in:list}}).exec(function(error,recipe){
        if(error) return callback(error,null);


        return callback(null, recipe);
    });
}

RecipeDao.getAll = function (callback) {
    Recipe.find({flag:true}).sort({'logTime':-1}).limit(10).exec(function(error,recipe){
        if(error) return callback(error,null);

        return callback(null, recipe);
    });
};

/*
RecipeDao.getByStep = function(id,step,callback){
    Recipe.find({"_id":id},step[step]).sort({'logTime':-1}).limit(10).exec(function(error,recipe){
        if(error) return callback(error,null);

        return callback(null, recipe);
    });
}*/

RecipeDao.searchRecipe = function (query,callback) {
    var str = ""+query+".*";
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
