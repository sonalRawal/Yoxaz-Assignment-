const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.registerUser = async (email, password) => {
  const user = await User.create({
    email,
    password,
  });
  return user;
};

exports.loginUser = async (email, password) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.matchPassword(password))) {
    throw new Error('Invalid credentials');
  }
  return user;
};

exports.generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};