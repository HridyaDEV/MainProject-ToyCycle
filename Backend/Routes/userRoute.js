
const express = require('express');
const router = express.Router();
const { getUserProfile, getAllUsers, getUserById, getUserByIdDelete } = require('../Controllers/userController');
const { verifyToken } = require("../middleware/auth");

router.get('/profile', verifyToken, getUserProfile);
router.get('/all-users', getAllUsers)
router.get("/admin/user/:id", getUserById);
router.delete('/admin/user/:id', getUserByIdDelete);

module.exports = router;
