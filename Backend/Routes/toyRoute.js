const express = require("express");
const { verifyToken } = require("../middleware/auth");
const router = express.Router();

const { sellToy, getNewToys, getAllToys, getToysBySeller, getToyById, getToysByCategory, deleteToy } = require("../Controllers/toyController");
const { upload } = require("../config/multer");

router.post("/sell", verifyToken, upload.single("image"), sellToy);
router.get('/new', getNewToys)
router.get("/all",verifyToken, getAllToys);
router.get("/mytoys", verifyToken, getToysBySeller)
router.get("/:id", getToyById)
router.get("/category/:category", getToysByCategory);
router.delete("/delete/:id", verifyToken, deleteToy)

module.exports = router;

