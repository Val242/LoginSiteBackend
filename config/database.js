// config/db.js
const mongoose = require('mongoose');

const connectToDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://ebongvalentine70_db_user:lYlBresViTAeFL87@cluster0.ms7ge0g.mongodb.net/loginSite');
    //mongodb+srv://ebongvalentine70:<db_password>@cluster0.46sfar3.mongodb.net/
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectToDB;
//mongodb+srv://ebongvalentine70:<db_password>@cluster0.kspaxqe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0