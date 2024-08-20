const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 3, 
  message: 'Too many login attempts from this IP, please try again later.',
  keyGenerator: (req) => req.ip
});

module.exports = loginLimiter;
