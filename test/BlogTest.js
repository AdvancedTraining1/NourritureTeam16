/**
 * Created by mengchi on 14-11-14.
 */
var app = require('../app')
var assert = require("assert")
   // , www = require('../bin/www')
    , http = require('http')
var request = require('request')
    ,webServer="http://localhost:3000";

describe('Blog API',function(){

    before(function(){
        app.set('port', process.env.PORT || 3000);

        var server = app.listen(app.get('port'), function() {
            console.log('Express server listening on port ' + server.address().port);
        });
    });

    describe('/blog', function () {
        it('Get /blog should return 200', function (done) {
            request(webServer+"/blog/", function (error, response,body) {
                if (error) throw error;

                var status = response.statusCode;
                assert.equal(200, status);
                done();
            });
        });
    });

    describe('/createBlog', function () {
        it('Get /createBlog should return 200', function (done) {
            request(webServer+"/blog/createBlog", function (error, response,body) {
                if (error) throw error;

                var status = response.statusCode;
                assert.equal(200, status);
                done();
            });
        });
    });

    describe('/publishBlog', function () {
        it('Post /publishBlog should return 200', function (done) {
            var options = {
                host: 'localhost',
                port: 3000,
                path: '/blog/publishBlog',
                method: 'POST'
            };
            var data=require("querystring").stringify({title:"hello",content:"world"})
            var req=http.request(options, function(res) {
             //   if (error) throw error;
                console.log("Got response: " + res.statusCode);
                assert.equal(200, res.statusCode);
            });
            req.write(data);
            req.end();
            done();
        });
    });

});
