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

BlogHander.getABlogs=function(req,res){
    console.log("查询一条博客...");
    var blog_id = req.param('id');
    Blog.findOne({_id:blog_id},function(err,blog) {
        console.log("yeah");
        console.log(blog);
        if (err) {
            res.json(500, {message: err.toString()});
            return;
        }
        if (!blog) {
            res.json(404, {message: "Not found."});
            return;
        }
        res.render('showBlog',{title:blog.title,content:blog.content,message:message})

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
            id: req.session.user_id,
            account: req.session.account }

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
    var title = req.body.title;
    var content = req.body.content
    var conditions={_id:req.param('id')}
    var update={$set: { title:title, content:content, update_at:new Data()}}
    var options    = {upsert : true};
    var message="";
    Blog.update(conditions, update, options, function(error) {
        if (error) {
            console.log(error);
            message="update failed";
        } else {
            message="update successful";
            res.render('showBlog',{title:title,content:content,message:message})
        }
    });

};


module.exports = BlogHander;