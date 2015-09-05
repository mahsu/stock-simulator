var express = require('express');
var router = express.Router();
var db = require('../db_con').connection;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/stock/:symbol', function(req, res, next) {
  db.query("SELECT * FROM price WHERE symbol=?",[req.params.symbol], function(err, data){
    res.send(data);
   });
});


module.exports = router;
