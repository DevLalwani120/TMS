// db.js

const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',  
  user: 'root', 
  password: '7410', 
  database: 'tms', 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Export the pool
module.exports = pool.promise();
