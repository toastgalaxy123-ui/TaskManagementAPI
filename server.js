//1. Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//Load environment variable from .env file
dotenv.config();

//2. Initialize Express App
const app = express();
const PORT = process.env.PORT || 5000;

//3. Middleware
//Enable express to parse JSON bodies
app.use(express.json());

//4. DB Connection(Mongoose)
const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully!');
    } catch (err) {
        console.error('MongoDB connection failed:', err.message);
        //Exit process with failure
        process.exit(1);
    }
};

//Connect to DB
connectDB();

//5. Basic Route for Testing 
app.get('/', (req, res) => {
    console.log('Server running on port ${PORT}');
    console.log('Access at http://localhost:${PORT}');
});

// Import Auth Routes
const authRoutes = require('./routes/authRoutes');
// Import error handling 
const { errorHandler} = require('./middleware/errorMiddleware');
// Mount Auth Routes
// All routes in authRoutes.js will be prefixed with /api/auth
app.use('/api/auth', authRoutes);
// Error Handling Middleware
app.use(errorHandler);