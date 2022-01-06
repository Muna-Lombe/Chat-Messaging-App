const express = require('express');

const {signup, login} = require('../controllers/auth');

const router = express.Router();

//adding sign up and log in routes
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;