const mongoose = require("mongoose");

const vaccineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  disease: String,
  description: String,
  recommendedWeeks: { type: Number, required: true },
  gender: {
    type: String,
    enum: ["All", "Male", "Female"],
    default: "All"
  }
});

module.exports = mongoose.model("Vaccine", vaccineSchema);
