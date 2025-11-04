const mysql = require('mysql2');

// Create connection
const db = mysql.createConnection({
  host: 'localhost',      // MySQL server (keep 'localhost')
  user: 'root',           // Your MySQL username
  password: 'Qwerty@123',  // 🔹 replace with your MySQL password
  database: '_bookswapdb'     // 🔹 replace with your database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
  } else {
    console.log('✅ Connected to MySQL Database!');
  }
});

module.exports = db;
