// const express = require('express');
// const app = express();
// const db = require('./db')

// const bodyparser = require('body-parser');   // by using bodyparser we don't need to handle with the formate of data(sending to db server by client).
// app.use(bodyparser.json()); // req.body

// const Person = require('./models/Person')

// app.get('/', (req, res) => {
//     res.send('Welcome to my Hotel')
// })

// // POST route to add a person
// app.post('/person', async (req, res) => {
//     try{
//         const data = req.body;  // Assuming the request body contains the person data

//         // Create a newPerson document using the mongoose Model
//         const newPerson = new Person(data);

//         // Save the new person to the database.
//         const response = await newPerson.save()
//         console.log('data saved successfully')
//         res.status(200).json(response);
//     }
//     catch(err){
//         console.log(err)
//         res.status(500).json({error: 'Internal server error'})
//     }
// })

// app.listen(3500, () => console.log('Server is running at port 3500'));







const express = require('express');
const app = express();
const mongoose = require('mongoose');
const mongoURL = 'mongodb://localhost:27017/hotel';
const db = mongoose.connection;

const bodyparser = require('body-parser')
app.use(bodyparser.json());

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

db.on('connected', () => {
    console.log('Connected to mongoDB server')
});
db.on('error', (err) => {
    console.log('MongoDB server Error: ', err)
});
db.on('disconnected', () => {
    console.log('MongoDB server Disconnected')
})

const personSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number
    },
    work:{
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String,
    },
    salary:{
        type: Number,
        required: true
    }
})

const Person = mongoose.model('Person', personSchema);


app.get('/', (req, res) => {
    res.send('Welcome to home page!!');
});

app.get('/hello', async (req, res) => {
    const response = await Person.find();
    res.json(response);
})

app.post('/person', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();

        console.log('Data saved successfully')
        res.status(200).json(response);
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal Server Error'})
    }
})

app.listen(3500, () => console.log('Server is Running at port 3500'));