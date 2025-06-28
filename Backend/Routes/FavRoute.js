const express = require("express");
const { toggleFavorite, getFavorites } = require("../Controllers/favController");
const router = express.Router();


router.post("/toggle/:toyId", toggleFavorite);
router.get("/:userId", getFavorites);

module.exports = router;
