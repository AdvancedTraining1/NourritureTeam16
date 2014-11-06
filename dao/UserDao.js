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
        callback(null,"UserDao.prototype.save success");
    });
};

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