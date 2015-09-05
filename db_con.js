var mysql = require('mysql');
var config = require('config.js');

var connection = mysql.createConnection(config.setup.mysql_url);

connection.connect(function(err) {
    if(err) console.log("Could not connect to DB");
    else{
        console.log("Connected to "+conn_conf.database+' on '+conn_conf.host );
    }

exports.connection = connection;
