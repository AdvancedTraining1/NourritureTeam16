/**
 * Created by mengchi on 14-10-30.
 */
var db = require('../util/database')
var Blog = require('../data/models/blog');

function BlogHander(){

}

BlogHander.getAllBlogs=function(req,res){
    console.log("查询全部博客...");
    Blog.find({},function(err,blogs) {

        if (err) {
            res.json(500, {message: err.toString()});
            return;
        }
        if (!blogs) {
            res.json(404, {message: "Not found."});
            return;
        }
        res.json(200, blogs);

    });

};
BlogHander.createABlog=function(req,res){
    var blog = new Blog({
        title: "test title5",
        content: "my test content"
    });
    blog.save(function(err, newblog) {
        if (err) {
            res.json(500, {message: err.toString()});
            return;
        }
        console.log(newblog)
        res.json(201, newblog);
    });
};

module.exports = BlogHander;