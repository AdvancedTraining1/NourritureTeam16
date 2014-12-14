var express = require('express');
var router = express.Router();
var seasonHandler = require('../controller/seasonHandler');
/* GET home page. */
router.get('/season', function(req, res) {
  res.render('season/season');
});

router.get('/season_an', function(req, res) {
	res.render("common/index");
});
router.get('/listSeason',seasonHandler.listSeasonFood);

module.exports = router;
