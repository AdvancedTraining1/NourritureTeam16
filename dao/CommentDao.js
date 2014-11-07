/**
 * this is edited by huhao
 * 2014.11.06
 * chenmm push me to do this i don't understand until now
 */

var DaoBase = require('./DaoBase');
var commentModel = require('../data').comment;

var CommentDao = new DaoBase(commentModel);

module.exports = CommentDao;


CommentDao.delete = function (conditions,callback) {
    commentModel.remove(conditions).exec(function(error,user){
        if(error) return callback(error,null);

        return callback(null, user);
        //return callback(null, 'RecipeDao.delete success');
    });
}


module.exports = CommentDao;
