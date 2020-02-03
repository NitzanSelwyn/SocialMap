const express = require('express');
const bodyParser = require('body-parser');
const socialController = require('../Controllers/SocialController')
const auth = require('../Helpers/Authentication')

const router = express.Router();

router.use(bodyParser.json());

router.post('/upload', auth.authenticateToken, socialController.upload)

module.exports = router