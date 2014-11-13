/**
 * chenmm
 * 2014/11/01
 * 收藏数据类型
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;;

var schema = new Schema({
    user: {
        _id:String,
        account: String,
        head: String
    },
    logTime: Date,
    recipeId: String
});

//mongoose.model('Collect', schema);
module.exports = schema;
