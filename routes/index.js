var express = require('express');
var router = express.Router();
var db = require('../db_con').connection;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/stock/:symbol', function(req, res, next) {
  var date = res.toMsqld(new Date(req.query.start)) || "1990-02-01";
  var limit = parseInt(req.query.limit) || 60;
  console.log(date, limit);
  db.query("SELECT * FROM price WHERE symbol=? AND date_ex >= ? ORDER BY date_ex ASC LIMIT ?",[req.params.symbol,date,limit], function(err, data){
    res.send(data);
   });
});


module.exports = router;
