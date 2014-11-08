/**
 * Created by mengchi on 14-10-30.
 */

var Blog = require('../data/models/blog');
var Favorite = require('../data/models/favorite');
var db = require('../util/database');

function BlogHander() {

}

/*BlogHander.getABlogById=function(blog_id,callback){
 var blog_id = blog_id;
 Blog.findOne({_id:blog_id},function(err,blog) {
 console.log("yeah");
 console.log(blog);
 if (err) {
 message: err.toString();
 return callback(message);
 }
 if (!blog) {
 message: "Not found.";
 return callback(message);
 }

 callback(null,blog);
 })


 }*/

BlogHander.getAllBlogs = function (req, res) {
    console.log("查询全部博客...");
    Blog.find({}, function (err, blogs) {
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


BlogHander.getABlogs = function (req, res) {
    console.log("查询一条博客...");
    var blog_id = req.params.blog_id;
    /* BlogHander.getABlogById(blog_id,function(err,blog){
     if (err) {
     res.json(500, {message: err.toString()});
     return;
     }
     if (!blog) {
     res.json(404, {message: "Not found."});
     return;
     }
     res.render('showBlog',{title:blog.title,content:blog.content})
     });*/

    //var message=""
    Blog.findOne({_id: blog_id}, function (err, blog) {
        if (err) {
            res.json(500, {message: err.toString()});
            return;
        }
        if (!blog) {
            res.json(404, {message: "Not found."});
            return;
        }
        res.render('showBlog', {title: blog.title, content: blog.content})

    });
};


BlogHander.publishABlog = function (req, res) {
    var title = req.param('title');
    var content = req.param('content');

    var blog = new Blog({
        title: title,
        content: content,
        type: "1",
        author: {
            id: req.session.user_id,
            account: req.session.account }

    });
    var message = ""
    blog.save(function (err, newblog) {
        if (err) {
            message = "publish failed";
        } else {
            message = "publish successful";
        }
        console.log("3newBlog" + newblog)
        // res.redirect('/blog/showAbog',{title:})
        // res.json(201, newblog);
        res.render('showBlog', {title: title, content: content, message: message})

    });
};

BlogHander.saveABlog = function (req, res) {
    var title = req.param('title');
    var content = req.param('content');

    var blog = new Blog({
        title: title,
        content: content,
        type: "2"
    });
    var message = ""
    blog.save(function (err, newblog) {
        if (err) {
            message = "save failed";
        } else {
            message = "save successful";
        }

        res.render('showBlog', {title: title, content: content, message: message})

    });
};

BlogHander.modifyBlog = function (req, res) {
    var blog_id = req.params.blog_id;
    Blog.findOne({_id: blog_id}, function (err, blog) {
        if (err) {
            res.json(500, {message: err.toString()});
            return;
        }
        if (!blog) {
            res.json(404, {message: "Not found."});
            return;
        }
        console.log(blog._id);
        res.render('modifyBlog', {_id:blog._id,title: blog.title, content: blog.content})

    });

};

BlogHander.saveModifyBlog = function (req, res) {
    var title = req.body.title;
    var content = req.body.content
    var conditions = {_id: req.param('_id')}
    var update = {$set: { title: title, content: content, update_at: new Date()}}
    var options = {upsert: true};
    var message = "";
    Blog.update(conditions, update, options, function (error,docs) {
        if (error) {
            console.log(error);
            message = "update failed";
        } else {
            console.log(docs);
            message = "update successful";
            res.render('showBlog', {title: title, content: content, message: message})
        }
    });

};

BlogHander.deleteBlog = function (req, res) {
    var conditions = {_id: req.params.blog};
    Blog.remove(conditions, function (error) {
        if (error) {
            console.log(error);
        } else {
            console.log('delete ok!');
            res.json(201, {message: "delete ok!"});
        }
    });

}

BlogHander.collectionBlog = function (req, res) {
    var blog_id = req.params.blog_id;
    var user_id = req.session.user_id;
    Blog.findOne({_id: blog_id}, function (err, blog) {
        if (err) {
            res.json(500, {message: err.toString()});
            return;
        }
        if (!blog) {
            res.json(404, {message: "Not found."});
            return;
        }
        console.log("find one");
        var favorite = new Favorite({
            use_id: user_id,
            type: 2,
            blog_id: blog_id
        });

        favorite.save(function (err, newblog) {
            if (err) {
                var message = "save failed";
                res.json(500, {message: message});
                return;
            } else {
                var message = "save successful";
                console.log(message);
                var conditions = {_id: blog_id}
                console.log( blog.favorite_count);
                var favorite_count =blog.favorite_count+1;
                var update = {$set: { favorite_count:favorite_count} }
                var options = { upsert: true};
                Blog.update(conditions, update, options, function (error) {
                    if (error) {
                        console.log(error);
                        var message = "update failed";
                        res.json(500, {message: message});
                        return;
                    } else {
                        console.log("collection successful");
                        res.json(201, {message: "collection successful"});
                    }
                });

            }
        });
    });
}


BlogHander.cancellationBlog = function (req, res) {
    var blog_id = req.params.blog_id;
    var user_id = req.session.user_id;
    var conditions = {blog_id: blog_id,user_id:user_id}

    Blog.findOne({_id: blog_id}, function (err, blog) {
        if (err) {
            res.json(500, {message: err.toString()});
            return;
        }
        if (!blog) {
            res.json(404, {message: "Not found."});
            return;
        }
        console.log("find one");
        console.log( blog.favorite_count);
        var favorite_count =blog.favorite_count - 1;
        var update = {$set: { favorite_count: favorite_count} }
        var options = { upsert: true};
        Blog.update({_id: blog_id}, update, options, function (error) {
            if (error) {
                console.log(error);
                var message = "update failed";
                res.json(500, {message: message});
                return;
            } else {
                console.log("update successful");

            }
        });

    });

    Favorite.remove(conditions, function (error) {
        if (error) {
            console.log(error);
        } else {
            console.log('delete ok!');
            res.json(201, {message: "delete ok!"});
        }
    });
}

BlogHander.addCommentToBlog


module.exports = BlogHander;