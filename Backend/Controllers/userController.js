const User = require("../Models/userModel");

exports.getUserProfile = async (req, res) => {
  try {
    
    if (!req.userId) {
      return res.status(400).json({ message: "Missing user ID from token" });
    }

    const user = await User.findById(req.userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
console.log("Fetched user profile:", user);

    return res.status(200).json(user);
  } catch (error) {
    console.error(" Error in getUserProfile:", error.message);
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
