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

UserDao.delete = function (conditions,callback) {
    UsersModel.remove(conditions).exec(function(error,user){
        if(error) return callback(error,null);

        return callback(null, user);
        //return callback(null, 'RecipeDao.delete success');
    });
}

UserDao.update = function (conditions,update,options,callback) {
    UsersModel.update(conditions,update,options).exec(function(error,message){
        if(error) return callback(error,null);
        return callback(null, message);
    });
}

UserDao.getUsers = function (pageNo,pageSize,conditions,callback) {
    UsersModel.find(conditions).skip((pageNo-1)*pageSize).limit(pageSize).sort({'account':-1}).exec(function(error,users){
        if(error) return callback(error,null);
        return callback(null, users);
    });
}

UserDao.getUserNum = function (conditions,callback) {
	UsersModel.count(conditions).exec(function(error,num){
		if(error)
			return callback(error,null);
		return callback(null, num);
	});
}

UserDao.getUserByAccount=function (_account,callback) {
    UsersModel.findOne({account:_account}).exec(function(error,user){
        if(error)
            return callback(error,null);
        return callback(null, user);
    });
}



module.exports = UserDao;
