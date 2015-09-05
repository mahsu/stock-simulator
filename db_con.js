var mysql = require('mysql');
var config = require('config.js');

function createConnection(){
  return mysql.createConnection(config.setup.mysql_url);
}

exports.createConnection = createConnection;
exports.mysql = mysql;
