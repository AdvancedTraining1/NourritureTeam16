/**
 * chenmm
 * 2014-11-15
 */
var app = require('../app')
var assert = require("assert");
var request = require('request')
    ,webServer="http://localhost:3000";

describe('Recipe API',function(){

    before(function(){
        app.set('port', process.env.PORT || 3000);

        var server = app.listen(app.get('port'), function() {
            console.log('Express server listening on port ' + server.address().port);
        });
    });

    describe('/recipe/listAll', function () {
        it('should return html content, status should be 200', function (done) {
            request.get(webServer+"/recipe/listAll", function (error, response,body) {
                if (error) throw error;

                var status = response.statusCode;
                assert.equal(200, status);

                done();
            });
        });
    });

    describe('/recipe/create', function () {
        it('should return 发布菜谱成功 as a html body',function(done){
            request.post(webServer+"/recipe/create", function (error, response,body) {
                if (error) throw error;

                var status = response.statusCode;
                assert.equal("发布菜谱成功！", body);
                done();
            });
        });
    });
});
