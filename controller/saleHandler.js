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
            res.json(500, {message: err.toString()});
            return;
        }
        res.json(sale);
    });
}

SaleHandler.getOne = function(req, res){
    //var id = req.params.sale_id;
    var id = "546747b89ac900691b0584ac";

    SaleDao.getOne(id,function(err, sale){
        if(err)
        {
            res.json(500, {message: err.toString()});
            return;
        }
        res.json(sale);
    });
}

/*SaleHandler.getAllByLast = function(req,res){
    SaleDao.getAllByLast(function(err, sale){
        if(err)
        {
            res.json(500, {message: err.toString()});
            return;
        }
        if(!sale)
        {
            res.json(400, {message:"No Sale"});
            return;
        }
        res.json(sale);
    });
}*/

SaleHandler.getOwn = function(req, res){
    SaleDao.getOwn(req.params.authorId, function (err, sale){
        if(err)
        {
            res.json(500, {message: err.toString()});
            return;
        }
        res.json(sale);
    });
}

SaleHandler.edit = function(req, res){
    req.setEncoding('utf-8');
    /*var postData = "";

    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });*/

    // 数据接收完毕，执行回调函数
    //req.addListener("end", function () {
        console.log('数据接收完毕');

        //var params = querystring.parse(postData);//GET & POST
        //var updateStr = modifyRecipe(params);
        var id = "5467475da0b38e3c1b57c47b";
        var updateStr = editSale(id);

        console.log(updateStr);
        SaleDao.edit(id,updateStr,function (err, sale) {
            res.writeHead(200, {
                "Content-Type": "text/plain;charset=utf-8"
            });
            res.end("编辑成功！");
        });
    //});
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
            res.writeHead(200, {
                "Content-Type": "text/plain;charset=utf-8"
            });
            res.end("发布成功！");
        });
    //});
}

SaleHandler.delete = function(req, res){
    //var idStr = req.params.ids.split(",");
    var idStr = ["01"];
    SaleDao.delete(idStr,function (err, sale) {
        res.writeHead(200, {
            "Content-Type": "text/plain;charset=utf-8"
        });
        res.end("删除成功！");
    });
}

SaleHandler.search = function(req, res){
    var keyword = "A"

    SaleDao.search(keyword, function(err, sale){
        if(err)
        {
            res.json(500, {message: err.toString()});
            return;
        }
        if(!sale)
        {
            res.json(404, "Not Found");
            return;
        }
        res.json(sale);
    })
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

function editSale(id){
    var sale = {};
    sale.title = "A little change on SellingThings";
    sale.author = {_id:"03",head:"headPath",account:"noob"};
    sale.content = "There`s no content";

    return sale;
}

module.exports = SaleHandler;