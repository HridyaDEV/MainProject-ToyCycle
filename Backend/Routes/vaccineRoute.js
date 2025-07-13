const express = require("express");
const router = express.Router();
const {
    addVaccine,
    getAllVaccines,
    deleteVaccine
} = require("../Controllers/vaccineController");

// POST: Add a new vaccine
router.post("/add", addVaccine);

// (Optional) GET: List all vaccines
router.get("/all", getAllVaccines);

// (Optional) DELETE: Remove a vaccine
router.delete("/delete/:id", deleteVaccine);

module.exports = router;
