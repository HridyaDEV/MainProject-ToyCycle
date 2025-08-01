const User = require("../Models/userModel");

const Child = require("../Models/childModel");

exports.getUserProfile = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(400).json({ message: "Missing user ID from token" });
    }

    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //  Fetch children linked to the user
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

exports.getAllUsers = async(req,res) =>{
  try {
    const users = await User.find().select('-password')
    res.status(200).json({users})
  } catch (error) {
    res.status(500).json({message:"failed to etch users",error})
  }
}

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Fetch user details (excluding password)
    const user = await User.findById(id).select('-password');

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch children of this user
    const children = await Child.find({ parentId: id }).sort({ createdAt: -1 });

    // Combine user and children
    const userWithChildren = {
      ...user.toObject(),
      children,
    };

    return res.status(200).json({ user: userWithChildren });
  } catch (error) {
    console.error("Error fetching user by ID:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getUserByIdDelete = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete user
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Optional: Delete associated children as well
    await Child.deleteMany({ parentId: id });

    return res.status(200).json({ message: "User and their children deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const updateData = req.body;

    if (!userId) return res.status(400).json({ message: "Missing user ID" });

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
      select: "-password"
    });

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ message: "User updated", user: updatedUser });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
