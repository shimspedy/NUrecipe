const pool = require('./db');

pool.getConnection((err, connection) => {
  if (err) {
    console.error('MySQL connection failed:', err.message);
    process.exit(1);
  } else {
    console.log('MySQL connection successful!');
    connection.release();
    process.exit(0);
  }
});
