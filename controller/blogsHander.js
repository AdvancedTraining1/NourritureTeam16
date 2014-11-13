/**
 * Created by mengchi on 14-10-30.
 */

var Blog = require('../data/models/blog');
var db = require('../util/database');
function BlogHander(){

}

BlogHander.getAllBlogs=function(req,res){
    console.log("查询全部博客...");
    Blog.find({},function(err,blogs) {
        console.log("yeah");
        console.log(blogs);
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
BlogHander.publishABlog=function(req,res){
    var title = req.param('title');
    var content = req.param('content');

    var blog = new Blog({
        title: title,
        content: content,
        type:"1",
        author: {
            id: "5457aa1f0233539703192dc9",
            account: "mengchi" }

    });
    var message=""
    blog.save(function(err, newblog) {
        if (err) {
            message="publish failed";
        }else{
            message="publish successful";
        }
        console.log("3newBlog"+newblog)
        // res.redirect('/blog/showAbog',{title:})
         // res.json(201, newblog);
        res.render('showBlog',{title:title,content:content,message:message})

        });
};

BlogHander.saveABlog=function(req,res){
    var title = req.param('title');
    var content = req.param('content');

    var blog = new Blog({
        title: title,
        content: content,
        type:"2"
    });
    var message=""
    blog.save(function(err, newblog) {
        if (err) {
            message="save failed";
        }else{
            message="save successful";
        }

        res.render('showBlog',{title:title,content:content,message:message})

    });
};

BlogHander.modifyABlog=function(req,res){
//not finish
    update_time = new Data();
    Blog.findOneAndUpdate(req.param('id'), req.body.title, req.body.content, update_time,
        function(err, blog){
            if (err) {
                res.json(500, {message: err.toString()});
                return;
            }
            if (!blog) {
                res.json(404, {message: "Not found."});
                return;
            }
            res.json(200, {message: "OK"});
        });
};


module.exports = BlogHander;