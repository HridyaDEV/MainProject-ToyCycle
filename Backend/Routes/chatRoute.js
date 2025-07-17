const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const { getAllChats, getMessages, getOtherUserName } = require("../Controllers/chatController");

router.get("/messages/:user1/:user2",verifyToken, getMessages);
router.get("/allchats", verifyToken, getAllChats);
router.get("/other-user/:roomId", verifyToken, getOtherUserName);

module.exports = router;
