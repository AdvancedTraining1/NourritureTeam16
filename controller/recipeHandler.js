/*
 * chenmm
 * 2014/10/31
 * 菜谱Controller
 */

var RecipeDao = require("../dao/RecipeDao"),
    CommentDao = require("../dao/CommentDao"),
    CollectDao = require("../dao/CollectDao"),
    ProductDao = require("../dao/ProductDao"),
    RecipeModel = require("./../data").Recipe,
    CommentModel = require("./../data").CommentRecipe,
    ProductModel = require("./../data").Product,
    CollectModel = require("./../data").CollectRecipe,
    querystring = require('querystring'),
    formidable = require('formidable'),
    fs = require('fs'),
    url = require('url'),
    config=require("../util/config");

exports.a = function(req,res){
    res.redirect("../views/addRecipe.html");
}

exports.listOwn = function(req,res){
    RecipeDao.getOwn(req.params.authorId,function (err, recipe) {
        res.json(recipe);
    });
}

exports.modify = function(req,res){
    req.setEncoding('utf-8');
    var postData = "";

    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });

    // 数据接收完毕，执行回调函数
    req.addListener("end", function () {
        console.log('recipe-modify数据接收完毕');

        var params = querystring.parse(postData);//GET & POST  ////解释表单数据部分{name="zzl",email="zzl@sina.com"}

        var updateStr = modifyRecipe(params);

        RecipeDao.update(params.id,updateStr,function (err, recipes) {
            res.writeHead(200, {
                "Content-Type": "text/plain;charset=utf-8"
            });
            res.end("修改菜谱成功！");
        });
    });

}

exports.deleteRecipe = function(req,res){
    var idStr = req.params.ids.split(",");

    RecipeDao.delete(idStr,function (err, recipe) {
        res.writeHead(200, {
            "Content-Type": "text/plain;charset=utf-8"
        });
        res.end("删除菜谱成功！");
    });
}

exports.listAll = function (req, res) {
    RecipeDao.getAll(function (err, recipe) {
        //res.writeHead(200);
        res.json(recipe);
    });
};

exports.create = function (req, res){
    req.setEncoding('utf-8');
    var postData = "";

    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });

    // 数据接收完毕，执行回调函数
    req.addListener("end", function () {
        console.log('recipe数据接收完毕');

        var params = querystring.parse(postData);//GET & POST  ////解释表单数据部分{name="zzl",email="zzl@sina.com"}
        //console.log(params);
        params = null;


        var recipe = createRecipe();

        RecipeDao.create(recipe,function (err, recipes) {
            res.writeHead(200, {
                "Content-Type": "text/plain;charset=utf-8"
            });
            res.end("发布菜谱成功！");
        });
    });
};

exports.showOne = function (req, res) {
    RecipeDao.getById(req.params.id,function (err, recipe) {
        res.json(recipe);
    });
};

exports.searchRecipe = function(req,res){
    RecipeDao.searchRecipe(req.params.queryStr,function (err, recipe) {
        res.json(recipe);
    });
}

exports.listComment = function(req,res){
    CommentDao.listComment(req.params.recipeId,function (err, commentList) {
        res.json(commentList);
    });
}

exports.comment = function(req,res){
    req.setEncoding('utf-8');
    var postData = "";

    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });

    // 数据接收完毕，执行回调函数
    req.addListener("end", function () {
        console.log('recipe数据接收完毕');

        var params = querystring.parse(postData);//GET & POST  ////解释表单数据部分{name="zzl",email="zzl@sina.com"}

        var comment = createComment(params);

        CommentDao.create(comment,function (err, recipes) {
            res.writeHead(200, {
                "Content-Type": "text/plain;charset=utf-8"
            });
            res.end("评论成功！");
        });
    });
}

exports.collect = function (req,res) {
    req.setEncoding('utf-8');
    var postData = "";

    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });

    // 数据接收完毕，执行回调函数
    req.addListener("end", function () {
        console.log('recipe数据接收完毕');

        var params = querystring.parse(postData);//GET & POST  ////解释表单数据部分{name="zzl",email="zzl@sina.com"}

        var collect = createCollect(params);

        CollectDao.create(collect,function (err, recipes) {
            res.writeHead(200, {
                "Content-Type": "text/plain;charset=utf-8"
            });
            res.end("collect成功！");
        });
    });
}

exports.createProduct = function(req,res){
    req.setEncoding('utf-8');
    var postData = "";

    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });

    // 数据接收完毕，执行回调函数
    req.addListener("end", function () {
        console.log('recipe数据接收完毕');

        var params = querystring.parse(postData);//GET & POST  ////解释表单数据部分{name="zzl",email="zzl@sina.com"}

        var product = createProduct(params);

        ProductDao.create(product,function (err, recipes) {
            res.writeHead(200, {
                "Content-Type": "text/plain;charset=utf-8"
            });
            res.end("product成功！");
        });
    });
}


exports.listProduct = function(req,res){
    ProductDao.listProduct(req.params.recipeId,function (err, productList) {
        res.json(productList);
    });
}

exports.likeProduct = function(req,res){
    req.setEncoding('utf-8');
    var postData = "";

    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });

    // 数据接收完毕，执行回调函数
    req.addListener("end", function () {
        console.log('recipe数据接收完毕');

        var params = querystring.parse(postData);//GET & POST  ////解释表单数据部分{name="zzl",email="zzl@sina.com"}

        var like = createLike(params);

        ProductDao.getById(params.id,function(err,product){
            var num = product.likeNum + 1;
            ProductDao.likeProduct(params.id,like,num,function (err, recipes) {
                res.writeHead(200, {
                    "Content-Type": "text/plain;charset=utf-8"
                });
                res.end("like成功！");
            });
        });

    });
}

exports.upload = function(req,res){

    var form = new formidable.IncomingForm();
    form.uploadDir = "./../upload/temp/";//改变临时目录
    form.parse(req, function(error, fields, files){
        for(var key in files){
            var file = files[key];
            console.log(file.type);
            var fName = (new Date()).getTime();

            switch (file.type){
                case "image/jpeg":
                    fName = fName + ".jpg";
                    break;
                case "image/png":
                    fName = fName + ".png";
                    break;
                default :
                    fName =fName + ".png";
                    break;
            }
            console.log(file.size);
            var uploadDir = "./../public/" + fName;
            fs.rename(file.path, uploadDir, function(err) {
                if (err) {
                    res.write(err+"\n");
                    res.end();
                }
                res.end(config.host+"/"+fName);
            });
        }
    });
}

function createRecipe(){
    var recipe = new RecipeModel();
    recipe.recipeName="recipeName1";
    recipe.logTime = new Date();
    recipe.description="description1";
    var material0 =[];
    material0[0] = {materialName:"name1",amount:"amount1"};
    material0[1] = {materialName:"name2",amount:"amount2"};
    recipe.material = material0;
    recipe.difficult = "difficult1";
    recipe.cookTime = "time1";
    var step0 = [];
    step0[0]={stepNum: 1, stepExplain: "explain1", stepPhoto: "photo1"};
    step0[1]={stepNum: 2, stepExplain: "explain2", stepPhoto: "photo2"};
    recipe.step=step0;
    recipe.collectNum=0;
    recipe.commentNum=0;
    recipe.productNum=0;
    recipe.flag = true;
    recipe.author={_id:"001",head:"headPath",account:"user1"};

    return recipe;
}

function modifyRecipe(recipes,params){
    var recipe = {};

    recipe.recipeName="recipeName1";
    recipe.logTime = new Date();
    recipe.description="description1";
    var material0 =[];
    material0[0] = {materialName:"name1",amount:"amount1"};
    material0[1] = {materialName:"name2",amount:"amount2"};
    recipe.material = material0;
    recipe.difficult = "difficult1";
    recipe.cookTime = "time1";
    var step0 = [];
    step0[0]={stepNum: 1, stepExplain: "explain1", stepPhoto: "photo1"};
    step0[1]={stepNum: 2, stepExplain: "explain2", stepPhoto: "photo2"};
    recipe.step=step0;
    recipe.collectNum=2;
    recipe.commentNum=2;
    recipe.productNum=2;
    recipe.flag = true;
    recipe.author={_id:"001",head:"headPath",account:"user1"};

    return recipe;
}

function createComment(params,user){
    var comment = new CommentModel();
    comment.author._id = "001";
    comment.author.head = "head1";
    comment.author.account = "account";
    comment.logTime = new Date();
    comment.content = "content1";
    comment.replyId = "01";
    comment.replyUserId = "02";
    return comment;
}

function createCollect(params){
    var collect = new CollectModel();
    collect.user._id = "001";
    collect.user.account = "account1";
    collect.user.head = "head1";
    collect.logTime = new Date();
    collect.recipeId = "01";
    return collect;
}

function createProduct(params){
    var product = new ProductModel();
    product.author._id = "001";
    product.author.account = "account1";
    product.author.head = "head1";
    product.logTime = new Date();
    product.picture = "picture1";
    product.content = "content1";
    product.likeNum = 0;
    product.likeList = [];
    product.recipeId = "11";
    return product;
}

function createLike(params){
    var like = {};
    like._id = "002";
    like.account = "account2";
    like.head = "head2"
    return like;
}
