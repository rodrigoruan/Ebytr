const express = require('express');

const router = express.Router();

const userControllers = require('../controllers/usersController');

router.post('/create', userControllers.createUser);
router.post('/login', userControllers.loginUser);

module.exports = router;
