var express = require('express');
var router = express.Router();
var db = require('../db_con').connection;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/d3', function(req, res, next) {
  res.render('d3', { title: 'Express' });
});

module.exports = router;
