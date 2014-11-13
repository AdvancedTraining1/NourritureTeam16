/**
 * this is edited by huhao
 * 2014.11.06
 * chenmm push me to do this i don't understand until now
 */

var DaoBase = require('./DaoBase');
var UsersModel = require('../data').user;

var UserDao = new DaoBase(UsersModel);

module.exports = UserDao;

UserDao.save = function (obj,callback)
{
    obj.save(function (err) {
        if (err)
            callback(err,null);
        else
            callback(null,'UserDao.prototype.save success');
    });
};

UserDao.getAllUsers = function (callback)
{
    UsersModel.find({},function(err,users) {
        if (err) {
            callback(err,null);
            return;
        }
        if (!users) {
           callback(null,"UserDao.getAllUsers no users");
            return;
        }
        callback(null,users);

    });

};

UserDao.delete = function (list,callback) {
    UsersModel.remove({account:{$in:list}}).exec(function(error,user){
        if(error) return callback(error,null);

        return callback(null, user);
        //return callback(null, 'RecipeDao.delete success');
    });
}

UserDao.update = function (conditions,update,options,callback) {
    UsersModel.update(conditions,update,options).exec(function(error,data){
        if(error) return callback(error,null);

        return callback(null, 'UserDao.update success');
        //return callback(null, 'RecipeDao.delete success');
    });
}

UserDao.getUserById = function (userId,callback) {
    UsersModel.find({"account":userId}).exec(function(error,user){
        if(error) return callback(error,null);

        return callback(null, user);
    });
}

module.exports = UserDao;
//UsersDAO.getById = function (id, callback) {
//    UsersModel.getById(id, function (err, user) {
//        if (err)
//            console.log(err);
//        console.log(user);
//    });
//};
//
//UsersDAO.getByName = function (name, callback) {
//    UsersModel.getByName(name, function (err, user) {
//        if (err)
//            console.log(err);
//        console.log(user);
//    });
//};