const mongoose = require("mongoose");

const toySchema = new mongoose.Schema({

  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  ageCategory: {
    type: String,
    enum: ["0-6", "6-12", "1-2", "2-3", "3-5", "6-8", "9-12", "12+"],
    required: true,
  },
  toyCategory: {
    type: String,
    enum: [
      "Educational", "Soft Toy", "Puzzle", "Outdoor", "Indoor", "Musical",
      "Vehicles", "Electrical", "Remote Controlled", "DIY Kit",
      "Children Books", "Other"
    ],
    required: true,
  },
  condition: {
    type: String,
    enum: ["Brand New", "Like New", "Gently Used", "Used", "Needs Repair"],
    required: true,
  },

  imageUrl: {
    type: String,
    required: true
  },
  color: {
    type: String,
  },
  material: {
    type: String,
    enum: ["Plastic", "Wood", "Metal", "Fabric", "Mixed", "Other"]
  },
  weight: {
    type: Number
  },

  quantity: {
    type: Number,
    required: true,
    min: 1
  },

  dimensions: {
    length: { type: Number },
    width: { type: Number },
    height: { type: Number }
  },

  isBatteryOperated: { type: Boolean, default: false },

  batteryType: { type: String }, // e.g., "AA", "AAA", "Rechargeable"

  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", required: true
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("Toy", toySchema);
