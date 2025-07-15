const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const { getAllChats, getMessages } = require("../Controllers/chatController");

router.get("/messages/:user1/:user2",verifyToken, getMessages);
router.get("/allchats", verifyToken, getAllChats);

module.exports = router;
