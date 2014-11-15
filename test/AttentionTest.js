/**
 * Created by zhaiyuan on 14-11-15.
 */
var app = require('../app')
var assert = require("assert");
// , www = require('../bin/www')
// , http = require('http')
var request = require('request')
    ,webServer="http://localhost:3000";

describe('Attention API',function(){

    before(function(){
        app.set('port', process.env.PORT || 3000);

        var server = app.listen(app.get('port'), function() {
            console.log('Express server listening on port ' + server.address().port);
        });
    });

    describe('/attentions', function () {
        it('should return html content', function (done) {
            request(webServer+"/attentions/", function (error, response,body) {
                if (error) throw error;

                var status = response.statusCode;
                assert.equal(200, status);
                ///response.should.status(200).html;

                done();
            });
        });
    });


});
