const express = require('express');
const bodyParser = require('body-parser');
const userController = require('../Controllers/UserController')
const auth = require('../Helpers/Authentication')

const router = express.Router();

router.use(bodyParser.json());

router.post('/login', userController.login)
router.post('/register', userController.register)

module.exports = router