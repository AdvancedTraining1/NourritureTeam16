/**
 * chenmm
 * 2014/11/21
 * common routes
 */

module.exports = function (app) {

    //app.get('/top', function(req,res){
    //    res.render("common/top");
    //});
    //
    //app.get('/index', function(req,res){
    //    res.render("common/index");
    //});
    //
    //app.get('/main', function(req,res){
    //    res.render("common/main");
    //});
    //
    //app.get('/bottom', function(req,res){
    //    res.render("common/bottom");
    //});

    app.get('/index', function(req,res){
        res.render("common/main");
    });
};
