
const Vaccine = require("../Models/vaccineModel")

exports.addVaccine = async (req, res) => {
  try {
    const { name, disease, description, recommendedWeeks, gender } = req.body;

    if (!name || !recommendedWeeks) {
      return res.status(400).json({ message: "Name and recommendedWeeks are required." });
    }

    const newVaccine = new Vaccine({
      name,
      disease,
      description,
      recommendedWeeks,
      gender: gender || "All"
    });

    await newVaccine.save();
    res.status(201).json({ message: "✅ Vaccine added successfully." });
  } catch (err) {
    console.error("Error adding vaccine:", err);
    res.status(500).json({ message: "❌ Failed to add vaccine." });
  }
};


//  Get all vaccines
exports.getAllVaccines = async (req, res) => {
    try {
        const vaccines = await Vaccine.find();
        res.status(200).json(vaccines);
    } catch (err) {
        console.error("Error fetching vaccines:", err);
        res.status(500).json({ message: "❌ Failed to fetch vaccines." });
    }
};

//  Delete a vaccine
exports.deleteVaccine = async (req, res) => {
    try {
        const { id } = req.params;
        await Vaccine.findByIdAndDelete(id);
        res.status(200).json({ message: "✅ Vaccine deleted." });
    } catch (err) {
        console.error("Error deleting vaccine:", err);
        res.status(500).json({ message: "❌ Failed to delete vaccine." });
    }
};
