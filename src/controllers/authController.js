const authService = require('../services/authService');
const asyncHandler = require('../utils/asyncHandler');

exports.register = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.registerUser(email, password);
  const token = authService.generateToken(user._id);
  res.status(201).json({ success: true, token });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUser(email, password);
  const token = authService.generateToken(user._id);
  res.status(200).json({ success: true, token });
});