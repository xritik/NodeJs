const express = require('express');
const cors = require('cors'); // Import cors
const app = express();
const PORT = 8080;
require('./db');
const User = require('./models/users');

// CORS Configuration
const corsOptions = {
    origin: 'http://localhost:3000',  // Allow only requests from this origin
    credentials: true,                // Allow credentials (cookies) to be sent
};
app.use(cors(corsOptions));  // Apply CORS middleware


app.use(express.json());  // Middleware to parse JSON request bodies




// Import the Login router Files
const loginRoutes = require('./routes/loginRoutes')
app.use('/login', loginRoutes);

// Import the SignUp router Files
const signupRoutes = require('./routes/signupRoutes')
app.use('/signup', signupRoutes);

// Import the Dashboard router Files
const dashboardRoutes = require('./routes/dashboardRoutes')
app.use('/dashboard', dashboardRoutes);

// Import the Chat router Files
const chatRoutes = require('./routes/chatRoutes')
app.use('/chat', chatRoutes);





app.get('/users', async (req, res) => {
    try {
        const allUsers = await User.find({}, { username: 1, fullname: 1, gender: 1, _id: 0 });
        res.status(200).json({users: allUsers})
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ message: 'An error occurred while fetching user data' });
    }
});


app.listen(PORT, () => console.log('Server is running at port', PORT));