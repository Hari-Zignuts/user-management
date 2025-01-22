const { Pool } = require('pg');

// Configure the connection pool
const pool = new Pool({
  user: 'postgres', // Replace with your PostgreSQL username
  host: 'localhost', // Replace with your PostgreSQL host
  database: 'users-management', // Replace with your PostgreSQL database name
  password: 'ztlab138', // Replace with your PostgreSQL password
  port: 5433, // Default PostgreSQL port
});

pool.on('connect', () => {
  console.log('Connected to the PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on the PostgreSQL client', err);
  process.exit(-1);
});

// Export the pool for use in other files
module.exports = pool;
