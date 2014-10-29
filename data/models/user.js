/**
 * Created by mengchi on 14-10-17.
 */


var mongoose = require('mongoose');
<<<<<<< HEAD
var UserSchema = require('../schemas/topic.js');
=======
var UserSchema = require('../schemas/user.js');
>>>>>>> 6470541dfd3b1a8c5da1af5816f9907db2e0ce36

var User = mongoose.model('User',UserSchema);

module.exports = User;
