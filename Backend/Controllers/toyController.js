const Toy = require("../Models/toyModel");
const { saveFileToDisk } = require("../config/multer");

// Sell a Toy
exports.sellToy = async (req, res) => {
  try {

    const { title,  price, description, ageCategory, toyCategory, condition,   material,
      color,
      weight,
      quantity,
      dimensionsLength,
      dimensionsWidth,
      dimensionsHeight,
      isBatteryOperated,
      batteryType} = req.body;


    if (!title || !price || !description || !ageCategory || !toyCategory || !condition) {
      return res.status(400).json({ success: false, message: "All required fields must be filled" });
    }

    const imageUrl = req.file ? saveFileToDisk(req.file) : null;
    if (!imageUrl) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    const newToy = new Toy({
      title,
      price: Number(price),
      description,
      ageCategory,
      toyCategory,
      condition,
      imageUrl,
      sellerId: req.userId,
      material: material || undefined,
      color: color || undefined,
      weight: weight ? Number(weight) : undefined,
      quantity,
      dimensions: {
        length: dimensionsLength ? Number(dimensionsLength) : undefined,
        width: dimensionsWidth ? Number(dimensionsWidth) : undefined,
        height: dimensionsHeight ? Number(dimensionsHeight) : undefined
      },
      isBatteryOperated: isBatteryOperated === 'true',
      batteryType: batteryType || undefined,
    });
console.log("Toy to save:", newToy);

    await newToy.save();
    return res.status(201).json({ success: true, data: newToy });
  } catch (error) {
    console.error(" Error selling toy:", error.message);
  return res.status(500).json({
    success: false,
    message: "Toy save failed",
    error: error.message,
  });
  }
};

// Get the latest 8 toy 
exports.getNewToys = async (req, res) => {
  try {
    // const toys = await Toy.find().sort({ createdAt: -1 }).limit(8)
    const toys = await Toy.aggregate([
       { $sort: { createdAt: -1 } },
    { $limit: 8 }
]);
const updatedToys =toys.slice(0,8)
    res.status(200).json({ success: true, data: updatedToys })
  } catch (error) {
    console.error("Error fetching toys:", error)
    res.status(500).json({ success: false, message: "Server error" })
  }
}

// Get all toy listings
exports.getAllToys = async (req, res) => {
  try {
    const toys = await Toy.find();
    res.status(200).json({ success: true, data: toys });
  } catch (error) {
    console.error("Error fetching all toys:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all toys listed by the logged-in user
exports.getToysBySeller = async (req, res) => {
  try {
    const sellerId = req.userId;
    const toys = await Toy.find({ sellerId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: toys });
  } catch (error) {
    console.error("Error fetching user toys:", error.message);
    res.status(500).json({ success: false, message: "Failed to get user's toys" });
  }
};


// Get toy by ID

exports.getToyById = async (req, res) =>{
  try {
    const toy = await Toy.findById(req.params.id).populate("sellerId","userName email")
    if(!toy) {
      return res.status(404).json({success:false, message: " Toy not found"})
    }
    res.status(200).json({ success:true, data : toy})
  } catch (error) {
    console.error("Error fetching toy: ", error)
    res.status(500).json({success:false, message:"server error"})
  }
}


exports.getToysByCategory = async (req, res) => {
  try {
    const category = decodeURIComponent(req.params.category); 
    console.log("Searching toys in category:", category);

    const toys = await Toy.find({ toyCategory: category });

    res.status(200).json({ success: true, data: toys });
  } catch (error) {
    console.error("Error fetching toys by category:", error.message);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// Delete toy by ID
exports.deleteToy = async (req, res) => {
  try {
    const toyId = req.params.id;
    const deletedToy = await Toy.findByIdAndDelete(toyId);

    if (!deletedToy) {
      return res.status(404).json({ success: false, message: "Toy not found" });
    }

    res.status(200).json({ success: true, message: "Toy deleted successfully" });
  } catch (error) {
    console.error("Error deleting toy:", error.message);
    res.status(500).json({ success: false, message: "Deletion failed", error: error.message });
  }
};

