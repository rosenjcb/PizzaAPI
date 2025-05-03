const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./src/models/user');
const passwordEncrypt = require('./src/helpers/passwordEncrypt');

async function seedAdminUser() {
  try {
    await mongoose.connect(process.env.MONGODB || 'mongodb://localhost:27017/pizzaApp');

    const existing = await User.findOne({ email: 'admin@site.com' });
    if (existing) {
      console.log('Admin user already exists.');
    } else {
      await User.create({
        username: 'admin',
        email: 'admin@site.com',
        password: 'aA?123456',
        isAdmin: true,
        isActive: true,
      });
      console.log('Admin user created!');
    }

    mongoose.disconnect();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedAdminUser();
