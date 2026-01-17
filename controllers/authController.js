const User = require('../models/User');
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const trimmedName = name.trim();
    if (!trimmedName) {
      return res.status(400).json({ message: 'Name cannot be empty' });
    }

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      return res.status(400).json({ message: 'Email cannot be empty' });
    }

    const trimmedPassword = password.trim();
    if (!trimmedPassword) {
      return res.status(400).json({ message: 'Password cannot be empty' });
    }

    const normalizedName = trimmedName.toLowerCase();
    const normalizedEmail = trimmedEmail.toLowerCase();

    const existingUser = await User.findOne({ name: normalizedName });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({
      name: normalizedName,
      email: normalizedEmail,
      password: trimmedPassword,
    });

    await newUser.save();
    console.info('Registration successful');

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      return res.status(400).json({ message: 'Email cannot be empty' });
    }

    const trimmedPassword = password.trim();
    if (!trimmedPassword) {
      return res.status(400).json({ message: 'Password cannot be empty' });
    }

    const normalizedEmail = trimmedEmail.toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = trimmedPassword === user.password;
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET_KEY || 'your-secret-key',
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      userId: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.log('Login Error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

module.exports = {
  register,
  login
};