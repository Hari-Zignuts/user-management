const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./src/config/db');
const userRouter = require('./src/routers/user');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/user', userRouter);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


// close the pool when app shuts down
process.on('SIGINT', () => {
    server.close(() => {
        console.log('Server closed');
        pool.end(() => {
        console.log('Database pool closed');
        process.exit(0);
        });
    });
    }
);
