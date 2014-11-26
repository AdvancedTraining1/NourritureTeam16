/**
 * chenmm
 * 2014/11/21
 * common routes
 */

module.exports = function (app) {

    app.get('/index', function(req,res){
        res.render("common/totalIndex");
    });
};