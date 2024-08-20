const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI;

const connectDB = async () => {
        await mongoose.connect(mongoURI);
};

module.exports = connectDB;
