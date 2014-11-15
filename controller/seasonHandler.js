/**
 * Created by huhao on 14-11-06.
 */

var seasonModel = require('../data').season;
var SeasonDao = require("../dao/SeasonDao");

//构造
function SeasonHandler()
{

}

SeasonHandler.add = function(req, res)
{
    req.on('data',function(data)
    {
        //var obj = JSON.parse(data.toString());
        //var str = '信息为:' + obj.name + obj.tel + obj.account + obj.type;

        var season = createSeason();
        SeasonDao.save(season,function (err, data)
        {
            if(err)
            {
                console.log(err);

            }else
            {

                console.log(data);

            }

        });
        //res.send("season/add");
        res.json(200, {message: "season/add"});
    });
};

SeasonHandler.update = function(req, res)
{
    req.on('data',function(data)
    {
        //var obj = JSON.parse(data.toString());
        //var str = '信息为:' + obj.name + obj.tel + obj.account + obj.type;

        var conditions = {name : "seasonname"};
        var update = {$set : {picture : "www.qq.com"}};
        var options = {update : true};
        SeasonDao.update(conditions,update,options,function (err, data)
        {
            if(err)
            {
                console.log(err);

            }else
            {

                console.log(data);

            }

        });
       // res.send("season/update");
        res.json(200, {message: "season/update"});

    });
};

SeasonHandler.getAll = function(req,res)
{
    SeasonDao.getAllSeasonFood(function (err, data)
    {
        if(err)
        {
            console.log(err);

        }else
        {

            console.log(data);

        }



    });

    //res.send("season/getAll");
    res.json(200, {message: "season/getAll"});
}

//AdvertiseHandler.getUserById = function(req,res)
//{
//    req.on('data',function(data)
//    {
//        var obj = JSON.parse(data.toString());
//        var id = obj.userid;
//        UserDao.getUserById(12221,function (err, data)
//        {
//            if(err)
//            {
//                console.log(err);
//
//            }else
//            {
//                //console.log('3432');
//                console.log(data);
//            }
//
//        });
//        res.send(obj.userid);
//
//    });
//}


SeasonHandler.delete = function(req,res)
{
    req.on('data',function(data)
    {
        var conditions ={name : "seasonname"};
        //var obj = JSON.parse(data.toString());
        SeasonDao.delete(conditions,function (err, data)
        {
            if(err)
            {
                console.log(err);

            }else
            {

                console.log(data);
            }

        });
        //res.send("season/delete");
        res.json(200, {message: "season/delete"});
    });

}

SeasonHandler.searchSeasonFood = function(req,res)
{
    req.on('data',function(data)
    {
        //先这么写吧
        //var obj = JSON.parse(data.toString());
        var keyword = "search";
        SeasonDao.searchSeasonFood(keyword,function (err, data)
        {
            if(err)
            {
                console.log(err);

            }else
            {
                //console.log('3432');
                console.log(data);
            }

        });
        //res.send("season/search");
        res.json(200, {message: "season/search"});
    });
}

function createSeason()
{
    var season = new seasonModel();
    season.name = "seasonname";
    season.month = "11";
    season.picture = "picture";
    season.type = 1;
    season.time = new Date();
    season.create_at = new Date();
    season.update_at = new Date();

    return season;
};

module.exports = SeasonHandler;
