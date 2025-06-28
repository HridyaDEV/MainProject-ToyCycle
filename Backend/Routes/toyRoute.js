const express = require("express");
const { verifyToken } = require("../middleware/auth");
const router = express.Router();

const { sellToy, getNewToys, getAllToys, getToysBySeller, getToyById } = require("../Controllers/toyController");
const { upload } = require("../config/multer");

router.post("/sell",verifyToken, upload.single("image"), sellToy);
router.get('/new',getNewToys)
router.get("/all", getAllToys);
router.get("/mytoys",verifyToken, getToysBySeller)
router.get("/:id", getToyById)



module.exports = router;

