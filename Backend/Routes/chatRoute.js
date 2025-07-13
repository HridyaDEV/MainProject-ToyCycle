const express = require("express");
const router = express.Router();
const chatController = require("../Controllers/chatController");

router.get("/messages/:user1/:user2", chatController.getMessages);

module.exports = router;
