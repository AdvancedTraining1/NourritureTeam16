/**
 * Created by mengchi on 14-11-9.
 */
var DaoBase = require('./DaoBase'),
    CollectBlogModel = require('./../data').CollectBlog;

var CollectBlogDao = new DaoBase(CollectBlogModel);

module.exports = CollectBlogDao;

CollectBlogDao.create = function(collectBlog,callback){
    collectBlog.save(function (error, newCollectBlog){
        if(error) return callback(error,null);

        return callback(null, newCollectBlog);
    });
}