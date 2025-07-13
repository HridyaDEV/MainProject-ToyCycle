const User = require("../Models/userModel");

const Child = require("../Models/childModel");

exports.getUserProfile = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(400).json({ message: "Missing user ID from token" });
    }

    // Get user data (excluding password)
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Fetch children linked to the user
    const children = await Child.find({ parentId: req.userId }).sort({ createdAt: -1 });

    // Merge children into user object
    const userWithChildren = {
      ...user.toObject(),
      children,
    };

    console.log("Fetched user profile:", userWithChildren);

    return res.status(200).json(userWithChildren);
  } catch (error) {
    console.error("Error in getUserProfile:", error.message);
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};
