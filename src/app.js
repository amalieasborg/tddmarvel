const express = require('express');
const morgan = require('morgan');
const homeRoutes = require('./routes/homeRoutes');
const path = require('path');

const app = express();

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // For parsing JSON request bodies
app.use(morgan('dev')); // Logger

// Routes
app.use('/heroes', homeRoutes); // Use '/heroes' as a prefix for your API routes

// 404 Error Handling
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

module.exports = app;
