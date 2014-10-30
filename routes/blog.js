/**
 * Created by mengchi on 14-10-30.
 */
var express = require('express');
var router = express.Router();
var BlogsHander = require('../controller/blogsHander');

/* GET home page. */
router.get('/getAllblogs',BlogsHander.getAllBlogs);
router.get('/createABlog',BlogsHander.createABlog);

module.exports = router;
