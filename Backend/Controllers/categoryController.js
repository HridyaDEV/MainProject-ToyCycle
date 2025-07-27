const Toy = require("../Models/toyModel");

//Get all distinct toy categories

exports.getCategories = async (req, res) => {
  try {
    const categories = await Toy.distinct("toyCategory");
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
// GET toys by category
exports.getToysByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const toys = await Toy.find({ toyCategory: category });
    res.status(200).json({ success: true, data: toys });
  } catch (error) {
    console.error("Error fetching toys by category:", error.message);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
