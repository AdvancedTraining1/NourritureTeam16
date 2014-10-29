/*
 * GET users listing.
 */

var Recipe = require("./../data/models/recipe");
var path = require('path');

exports.list = function (req, res) {
    res.send("respond with a resource");
};

exports.create = function (req, res) {
    var createUser = new UsersModel(req.body);
    UsersModel.findOne({name:req.body.name}, function (err, user) {
        if (err)
            return res.json({err:err});
        if (user) {
            return res.json({err:"用户名已经存在"});
        }
        createUser.save(function (err, user) {
            if (err) {
                return res.json({err:err});
            }
            req.session["user"] = user;
            res.json();
        });
    });

};

exports.login = function (req, res) {
    UsersModel.findOne({name:req.body.name}, function (err, user) {
        if (err)
            return res.json({err:err});
        if (!user) {
            return res.json({err:'用户名不存在'});
        }
        if (!user.authenticate(req.body.password))
            return res.json({err:'密码错误'});
        req.session["user"] = user;
        res.json(user);
    });
};

exports.logout = function (req, res) {
    req.session["user"] = null;
    var html = path.normalize(__dirname + '/../views/index.html');
    res.sendfile(html);
};

exports.listAll = function (req, res){
    console.log("----find recipe")
    Recipe.find('',function (err , recipe) {
	if(err)
	    return res.json({err:err});
	if(!recipe)
	    return res.json({meg:'无菜谱'});
	res.json(recipe);
    });
};
