const express = require('express');
const bodyParser = require('body-parser');
const socialController = require('../Controllers/SocialController')
const { authenticateToken } = require('../Helpers/Authentication')

const router = express.Router();

router.use(bodyParser.json());

router.post('/upload', authenticateToken, socialController.upload)
router.get('/userposts', socialController.getUsersPost)
router.get('/feed', socialController.getFeed)
router.post('/follow', socialController.followUser)

module.exports = router