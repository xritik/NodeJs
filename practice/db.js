// file to connect server with database.
const mongoose = require('mongoose');

// Define the MongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/hotels'

// Set up mongoDB connection
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Get the default connection
// Mongoose maintains a default connection object representing the mongoDB connection.
const db = mongoose.connection;

// Define event listeners for database connection.
db.on('connected', () => {
    console.log('Connected to mongoDB server');
});

db.on('error', (err) => {
    console.error('MongoDB server Error: ',err);
});

db.on('disconnected', () => {
    console.log('MongoDB server disconnected.');
});

// Export the dataBase connection
module.exports = db;