const express = require('express');
const router = express.Router();
const upload = require('../config/multerconfig');
const {
  registerUser,
  loginUser
} = require('../controllers/authController');

router.post('/register', upload.single('profileImage'), registerUser);
router.post('/login', loginUser);

module.exports = router;
