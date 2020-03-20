
const mysql = require('mysql');

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
  host: 'sql7.freesqldatabase.com',
  user: 'sql7327013',
  password: 'dM1JtNsGct',
  database: 'sql7327013',
  port: 3306
});


module.exports = db;
