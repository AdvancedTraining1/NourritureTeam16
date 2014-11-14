/**
 * Created by zhaiyuan on 14-11-01.
 */

var mongoose = require('mongoose');

//the url of DB
<<<<<<< HEAD

var dbURL = 'mongodb://localhost/nourrituredatabase';

=======
var dbURL = 'mongodb://localhost/nourrituredb';
//var dbURL = 'mongodb://localhost/test';
>>>>>>> 8890f3f87f49685ac66334186340d2875afb1fcd
mongoose.connect(dbURL);
// reference to the database connection 为这个连接创建一个引用
var db = mongoose.connection;

// expose to modules that require database.js 把这个引用暴露给引用 database 模块的其他模块
module.exports = db;
