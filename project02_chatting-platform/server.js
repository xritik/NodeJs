const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors
const app = express();
const PORT = 8080;


// CORS Configuration
const corsOptions = {
    origin: 'http://localhost:3000',  // Allow only requests from this origin
    credentials: true,                // Allow credentials (cookies) to be sent
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Middleware to parse JSON request bodies
    app.use(express.json());


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydb')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

// Define a User Schema and Model
const userSchema = new mongoose.Schema({
    fullname: String,
    username: String,
    password: String
});

const User = mongoose.model('User', userSchema);

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Check if the user exists in the database
    const user = await User.findOne({username, password });

    if (user) {
        res.status(200).json({ message: 'Login successful'});
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
});

app.post('/signup', async (req, res) => {
    const {fullname, username, password} = req.body;

    // Check if the user exists in the database
    const user = await User.findOne({username});

    if(user){
        return res.status(401).json({message: 'User already exists, please try again'});
    }
    try {
        // Create a new user and save it to the database
        const newUser = new User({fullname, username, password });
        await newUser.save();
        res.status(201).json({ message: `${fullname} added successfully` });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: 'An error occurred while creating the user' });
    }
});


// Dashboard Route
app.get('/dashboard', async (req, res) => {
    const loginUser = req.headers['login-user']; // Extract username from request headers
    if (!loginUser) {
        return res.status(401).json({ message: 'User not logged in' });
    }

    // Find the user by username
    const user = await User.findOne({ username: loginUser });

    if (user) {
        res.status(200).json({ fullname: user.fullname }); // Send the full name
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});


app.listen(PORT, () => console.log('Server is running at port', PORT));