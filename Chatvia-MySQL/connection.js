const dotenv = require('dotenv');
const mysql = require('mysql');

// configraration with env. 
dotenv.config();
var dbConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "chatvia",
  charset : 'utf8mb4'
});

dbConnection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = dbConnection;
