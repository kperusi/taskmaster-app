const mongoose = require('mongoose');


const dotenv = require('dotenv');
dotenv.config()
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://famousotuwashe:Magatuse2525@cluster0.3ojii.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;