const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authenticate = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  const user = await User.findById(decoded.id);
    req.user = user; 
    next();
};

module.exports = authenticate;
