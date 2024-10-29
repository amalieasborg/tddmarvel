const express = require('express');
const morgan = require('morgan');
const homeRoutes = require('./routes/homeRoutes');
const path = require("path");

const app = express();

//middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // For at kunne parse JSON-body data
app.use(morgan('dev')); //logger

//routes
app.use('/',homeRoutes );

//fejlhåndtering af ukendte ruter
app.use((req,res,next) => {
    res.status(404).json('Ruten blev ikke fundet');
})



module.exports = app;