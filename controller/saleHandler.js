/**
 * Created by zhangcan on 14-11-11.
 * wtf
 */
var mongoose = require('mongoose');
var SaleModel = require('../data').sale;
var SaleDao = require("../dao/SaleDao");

function SaleHandler(){

}

SaleHandler.getAll = function(req, res){
    SaleDao.getAll(function(err, sale){
       if(err)
       {
           console.log(err);
           res.json(500, {message: err.toString()});
           return;
       }
        res.json(200, sale);
    });
}

SaleHandler.getOwn = function(req, res){
    SaleDao.getOwn(req.params.authorId, function (err, sale){
        if(err)
        {
            console.log(err);
        }
        res.json(200, sale);
    });
}

SaleHandler.modify = function(req, res){
    req.setEncoding('utf-8');
    var postData = "";

    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });

    // 数据接收完毕，执行回调函数
    req.addListener("end", function () {
        console.log('数据接收完毕');

        var params = querystring.parse(postData);//GET & POST

        var updateStr = modifyRecipe(params);
        console.log(updateStr);
        SaleDao.update(params.id,updateStr,function (err, recipes) {
            res.writeHead(500, {
                "Content-Type": "text/plain;charset=utf-8"
            });
            res.end("修改成功！");
        });
    });
}

SaleHandler.create = function(req, res){
    /*req.setEncoding("utf-8");
    var postData = "";
    req.addListener("data", function(postDataChunk){
        postData += postDataChunk;
    });
*/
    //req.addListener("end",function(){
        console.log('数据接收完毕');

        //var params = querystring.parse(postData);//GET & POST

        var sale = createSale()

        SaleDao.create(sale,function (err, sale) {
            res.writeHead(500, {
                "Content-Type": "text/plain;charset=utf-8"
            });
            res.end("发布成功！");
        });
    //});
}

SaleHandler.delete = function(req, res){
    var idStr = req.params.ids.split(",");
    SaleDao.delete(idStr,function (err, sale) {
        res.writeHead(500, {
            "Content-Type": "text/plain;charset=utf-8"
        });
        res.end("删除成功！");
    });
}

function createSale(){
    var sale = new SaleModel();
    sale.title = "SellingThings";
    sale.author = {_id:"01",head:"headPath",account:"idiot"};
    sale.content = "What`s the content";
    sale.create_at = new Date();
    sale.update_at = new Date();
    sale.collectNum = 5;
    sale.commentNum = 10;

    return sale;
}

module.exports = SaleHandler;