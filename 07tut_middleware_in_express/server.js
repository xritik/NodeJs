const express = require('express');
const app = express();
const path = require('path')
const cors = require('cors')
const {logger} = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;

// Custom middleware logger
app.use(logger);

// Cross Origin Resource Sharing (CORS)
const whitelist = ['https://www.google.com', 'http://127.0.0.1:5500', 'http://localhost:3500']
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));



// 1 :- built-in middleware to handle urlencoded data
//      in other words : form data
//      'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({extended: false}));

// 2 :- built-in middleware for json
app.use(express.json());

// 3 :- serve static files
app.use(express.static(path.join(__dirname, '/public')));




app.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'))
})

app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page.html')
})

app.all('*', (req, res) => {
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }else if(req.accepts('json')){
        res.json({error: "404 Not Found"});
    }else{
        res.type('txt').send("404 Not Found");
    }
})

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is Listening at port ${PORT}`))