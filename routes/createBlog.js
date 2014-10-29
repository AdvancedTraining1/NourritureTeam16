/**
 * Created by mengchi on 14-10-29.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Blog = require('../data/models/blog');
var db = require('../database')

/* GET home page. */
router.get('/', function(request, response) {
    var blog = new Blog({
        title: "test title3",
        content: "my test content"
    });
    blog.save(function(e, product, numberAffected) {
        if (e) response.send(e.message);
        var html = "<p>新增的数据为：" + JSON.stringify(product);
        html += "<p>影响的数据量为：" + numberAffected;
        response.send(html);
    });
});

module.exports = router;