const express = require('express');
const router = express.Router();
const ContactController = require('../controllers/ContactController');

router.post('/submit-form' ,ContactController.sendForm);


module.exports = router;