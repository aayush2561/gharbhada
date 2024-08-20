const jwt = require('jsonwebtoken');
const Joi = require('joi');
const User = require('../models/userModel');

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(100).required(),
  firstName: Joi.string().min(1).max(50).required(),
  lastName: Joi.string().min(1).max(50).required(),
  phoneNumber: Joi.string().min(10).max(15).required(),
  location: Joi.string().min(1).max(100).required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(100).required()
});

async function registerUser(req, res) {
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { username, email, password, firstName, lastName, phoneNumber, location, gender } = req.body;
  const profileImage = req.file ? req.file.filename : '';

  let user = await User.findOne({ email });
  if (user) return res.status(400).json({ message: 'User already exists' });

  user = new User({ username, email, password, firstName, lastName, phoneNumber, location, gender, profileImage });
  await user.save();

  res.status(201).json({ message: 'User registered successfully' });
}

async function loginUser(req, res) {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, { expiresIn: '1h' });
  res.json({ token });
}

module.exports = {
  registerUser,
  loginUser
};
