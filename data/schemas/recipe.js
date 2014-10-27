/**
 * Created by mengchi on 14-10-17.
 */

var mongoose = require('mongoose');
var RecipeSchema = new mongoose.Schema({
    recipeName: { type: String, index: true },
    description:{ type: String},
    material:{ type: String },
    step:{ type: String },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    author: {
        id: ObjectId,
        account: String },

    praiseList:{
        id: ObjectId,
        account: String
    },

    product:{
        author:{
            id: ObjectId,
            account: String
        },
        time: { type: Date, default: Date.now },
        picture:String,
        content: String,
        like_count: { type: Number, default: 0 }
    },

    comment_list: { type:ObjectId},

    praise_count: { type: Number, default: 0 },
    favorite_count:{ type: Number, default: 0 },
    comment_count: { type: Number, default: 0 },
    product_count: { type: Number, default: 0 }

});

module.exports = RecipeSchema;