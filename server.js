// server.js - Main Node.js server file
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');
const { spawn } = require('child_process');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// MongoDB connection
mongoose.connect('mongodb://localhost/lims_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' }
});

// Analysis Price Schema
const analysisPriceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    turnaroundTime: String,
    category: String
});

const User = mongoose.model('User', userSchema);
const AnalysisPrice = mongoose.model('AnalysisPrice', analysisPriceSchema);

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, 'your_jwt_secret', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// API Routes
// Login route
app.post('/api/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return res.status(400).send('User not found');

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send('Invalid password');

        const token = jwt.sign({ id: user._id, role: user.role }, 'your_jwt_secret');
        res.json({ token });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Analysis prices routes
app.get('/api/prices', authenticateToken, async (req, res) => {
    try {
        const prices = await AnalysisPrice.find();
        res.json(prices);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/api/prices', authenticateToken, async (req, res) => {
    try {
        const newPrice = new AnalysisPrice(req.body);
        await newPrice.save();
        res.json(newPrice);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Serve React app for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Create a test user if none exists
async function createTestUser() {
    try {
        const testUser = await User.findOne({ username: 'admin' });
        if (!testUser) {
            const hashedPassword = await bcrypt.hash('admin123', 10);
            await User.create({
                username: 'admin',
                password: hashedPassword,
                role: 'admin'
            });
            console.log('Test user created');
        }
    } catch (error) {
        console.error('Error creating test user:', error);
    }
}

// Initialize the database with some test data
async function initializeTestData() {
    try {
        const count = await AnalysisPrice.countDocuments();
        if (count === 0) {
            await AnalysisPrice.insertMany([
                {
                    name: 'Basic Water Analysis',
                    description: 'pH, conductivity, TDS analysis',
                    price: 99.99,
                    turnaroundTime: '24 hours',
                    category: 'Water'
                },
                {
                    name: 'Complete Soil Test',
                    description: 'Nutrient analysis, pH, organic matter',
                    price: 149.99,
                    turnaroundTime: '48 hours',
                    category: 'Soil'
                }
            ]);
            console.log('Test analysis prices created');
        }
    } catch (error) {
        console.error('Error creating test data:', error);
    }
}

// Start server and initialize data
mongoose.connection.once('open', async () => {
    console.log('Connected to MongoDB');
    await createTestUser();
    await initializeTestData();

    app.listen(port, () => {
        console.log(`LIMS server running on port ${port}`);
    });
});

module.exports = app;
