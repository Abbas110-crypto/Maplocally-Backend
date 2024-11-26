const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/routes/Routes');
require('./src/config/Database');
require('dotenv').config();

const app = express();
app.use(express.json());

// Enable CORS for your frontend's origin
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Connect to all MongoDB clusters


// Use the product and auth routes
app.use('/api', authRoutes); // Add the auth route here

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
