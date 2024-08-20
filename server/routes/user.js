const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authmiddleware');
const upload = require('../config/multerconfig');
const {
  getProfile,
  updateProfile,
  getProfileById,
  deleteUser
} = require('../controllers/userController');

router.get('/profile', authMiddleware, getProfile);

router.put('/profile', authMiddleware, upload.single('profileImage'), updateProfile);

router.get('/profile/:id', getProfileById);

router.delete('/profile/:id',deleteUser);

module.exports = router;
