const express = require("express");
const router = express.Router();
const { addVaccine, getAllVaccines,deleteVaccine } = require("../Controllers/vaccineController");

router.post("/add", addVaccine);
router.get("/all", getAllVaccines);
router.delete("/delete/:id", deleteVaccine);

module.exports = router;
