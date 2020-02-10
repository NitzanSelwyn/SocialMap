const express = require('express');
const bodyParser = require('body-parser');
const socialController = require('../Controllers/SocialController')
const { authenticateToken } = require('../Helpers/Authentication')

const router = express.Router();

router.use(bodyParser.json());

router.post('/upload', socialController.upload)
router.post('/get/:id', authenticateToken, socialController.getPosts)

module.exports = router