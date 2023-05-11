const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'wsa1',
  password: 'wsa1234',
  database: 'animal_ngo'
});

module.exports = pool.promise();
