const express = require('express');
const router = express.Router();
const {loginAdmin ,getAllUsers}  = require('../controllers/adminController');
const loginLimiter = require('../middleware/loginLimiter')


router.post('/login', loginLimiter, loginAdmin);

router.get('/user', getAllUsers);


module.exports = router;
