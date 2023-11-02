const mongoose = require('mongoose');

const db = 'mongodb://127.0.0.1:27017/';



const connectDB = async () => {
  try {
  await mongoose.connect(db)
  console.log('MongoDB connection established')
  } catch (error) {
    console.log(error.message)
  }
};

module.exports = connectDB;