const express = require('express');
const router = express.Router();
const sendContactEmail = require('../controllers/contactcontroller');

router.post('/', sendContactEmail);

module.exports = router;
