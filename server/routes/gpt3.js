const express = require('express');
const router = express.Router();
const { getRoomRentalAdvice } = require('../controllers/chataicontroller');

router.post('/', getRoomRentalAdvice);

module.exports = router;
