const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors
const app = express();
const PORT = 8080;

// Middleware to parse JSON request bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydb')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

// Define a User Schema and Model
const userSchema = new mongoose.Schema({
    username: String,
    password: String  // Add a password field here
});

const User = mongoose.model('User', userSchema);

app.use(cors());

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Check if the user exists in the database
    const user = await User.findOne({ username });

    if (user) {
        res.status(200).json({ message: `Login successful ${username}` });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
});

app.post('/sign-in', async (req, res) => {
    const {username, password} = req.body;

    // Check if the user exists in the database
    const user = await User.findOne({username});

    if(user){
        return res.status(401).json({message: 'User already exists, please try again'});
    }
    try {
        // Create a new user and save it to the database
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({ message: `${username} added successfully` });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: 'An error occurred while creating the user' });
    }
});

app.listen(PORT, () => console.log('Server is running at port', PORT));