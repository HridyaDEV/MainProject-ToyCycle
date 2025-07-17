
const express = require('express');
const router = express.Router();

const { getUserProfile, getAllUsers } = require('../Controllers/userController');
const { verifyToken } = require("../middleware/auth");

router.get('/profile', verifyToken, getUserProfile);
router.get('/all-users', getAllUsers)

module.exports = router;
