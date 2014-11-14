/**
 * Created by mengchi on 14-11-13.
 */
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var TopicUploadSchema = new mongoose.Schema({

    topic_id:ObjectId,
    author: {
        id: ObjectId,
        account: String },
    picture: String,
    title:String,
    upload_time: { type: Date, default: Date.now },
    like_count: { type: Number, default: 0 },

    comment_count: { type: Number, default: 0 }

});
module.exports = TopicUploadSchema;