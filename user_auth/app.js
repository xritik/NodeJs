// at first go to Downloads and run "sudo systemctl start mongod"
// and type "mongosh" on terminal to connect with your server by CLI. 

// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

// Connect to MongoDB (replace 'your-mongodb-uri' with your actual MongoDB connection string)
mongoose.connect('mongodb://localhost:27017/mydb');

// Define a schema
const useSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
}, {versionKey: false});

// Create a model using the schema
const User = mongoose.model('User', useSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));


// Routes
app.get('/', (req, res) => {
  res.send('Welcome to home page!');
});

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/signup.html'); // Serve the signup form
});

// Handle sign-up form submission
app.post('/signup', async (req, res) => {
const { username, password } = req.body;

// Check if the user already exists
const existingUser = await User.findOne({ username });
if (existingUser) {
    return res.send('Username already taken. Please choose another.');
}

// Create a new user and save to the database
const newUser = new User({ username, password });
await newUser.save();

// Log the user in (store in session)
req.session.user = newUser;

// Redirect to the dashboard
res.redirect('/dashboard');
});



app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Check if the user exists in the database
  const user = await User.findOne({ username, password });

  if (user) {
    // Store the user in the session
    req.session.user = user;
    res.redirect('/dashboard');
  } else {
    res.send('Invalid username or password.');
  }
});

app.get('/dashboard', (req, res) => {
  // Check if the user is authenticated
  if (req.session.user) {
    res.send(`Welcome, ${req.session.user.username}! This is your dashboard.`);
  } else {
    res.redirect('/login');
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});