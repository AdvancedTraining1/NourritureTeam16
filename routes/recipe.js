var express = require('express');
var app = express();
var router = express.Router();

var recipes = [{name:"1",time:30},{name:"2",time:40}];

app.route('/recipe/listAll')
    .get(function(req, res) {
        res.send(recipes);
    })

app.listen(3000);
module.exports = router;
