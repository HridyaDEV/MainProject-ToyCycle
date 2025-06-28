
const express = require('express');
const router = express.Router();

const { getUserProfile } = require('../Controllers/userController');
const { verifyToken } = require("../middleware/auth");

router.get('/profile', verifyToken, getUserProfile);

module.exports = router;
