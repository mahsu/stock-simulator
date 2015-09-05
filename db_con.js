var mysql = require('mysql');
var config = require('./config.js');

var connection = mysql.createConnection(config.setup.mysql_url);

connection.connect(function(err) {
    if(err) {
      console.log(err);
      console.log("Could not connect to DB");
    }
    else{
        console.log("Connected to " + config.setup.mysql_url);
    }
});

connection.on('close', function(err) {
  if (err) {
    console.log(err);
    connection = mysql.createConnection(connection.config);
  } else {
    console.log('Connection closed normally.');
  }
});

exports.connection = connection;
