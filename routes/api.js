var express = require('express');
var router = express.Router();
var db = require('../db_con').connection;

var symbol_cache = [];

router.get('/stocks/symbol/:symbol', function(req, res, next) {
  var date = req.query.start || "1990-02-01"
  date = res.toMsqld(new Date(date));
  var limit = parseInt(req.query.limit) || 60;
  console.log(date, limit);
  db.query("SELECT * FROM price WHERE symbol=? AND date_ex >= ? ORDER BY date_ex ASC LIMIT ?",[req.params.symbol,date,limit], function(err, data){
    if (err) console.log(err);
    res.send(data);
   });
});

router.get('/stocks/symbols', function(req, res, next) {
  if (symbol_cache.length == 0) {
    db.query("SELECT symbol FROM symbol ORDER BY symbol ASC", function(err, data) {
      if (err) console.log(err);
      symbol_cache = data.map(function(x) {
        return x.symbol;
      });
      res.send(symbol_cache);
    });
  }
  else res.send(symbol_cache);
});

module.exports = router;
