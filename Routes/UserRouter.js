const express = require('express');
const bodyParser = require('body-parser');
const userController = require('../Controllers/UserController')

const router = express.Router();

router.use(bodyParser.json());

router.post('/login', userController.login)

module.exports = router