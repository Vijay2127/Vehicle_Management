require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

// Enhanced Atlas connection with error handling
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 30000,
  retryWrites: true,
  w: 'majority',
  appName: 'Cluster0' // Match your Atlas app name
})
.then(() => console.log('🔄 Connecting to MongoDB Atlas...'))
.catch(err => {
  console.error('❌ Atlas Connection Error:', err.message);
  console.log('ℹ️ Verify:');
  console.log('1. Internet connection');
  console.log('2. IP is whitelisted in Atlas');
  console.log('3. Credentials in .env are correct');
  process.exit(1);
});

async function createAdmin() {
  try {
    console.log('🔍 Checking for existing admin...');
    const existingAdmin = await User.findOne({ username: 'admin' }).maxTimeMS(10000);

    if (existingAdmin) {
      console.log('ℹ️ Admin already exists. Credentials:');
      console.log('👤 Username: admin');
      console.log('🔑 Password: admin123');
      return process.exit(0);
    }

    const admin = new User({
      username: 'admin',
      password: await bcrypt.hash('admin123', 10),
      role: 'admin'
    });

    await admin.save();
    console.log('✅ Admin created successfully!');
    console.log('👤 Username: admin');
    console.log('🔑 Password: admin123');
    console.log('⚠️ Change these credentials in production!');
  } catch (err) {
    console.error('❌ Creation Error:', err.message);
  } finally {
    mongoose.disconnect();
  }
}

mongoose.connection.on('connected', createAdmin);