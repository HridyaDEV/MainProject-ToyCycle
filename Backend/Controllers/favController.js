const User = require("../Models/userModel");
const Toy = require("../Models/toyModel");

// Toggle Favorite

exports.toggleFavorite = async (req, res) => {
  const { userId } = req.body;
  const { toyId } = req.params;

  console.log("➡️ POST /fav/toggle called");
  console.log("📩 userId:", userId);
  console.log("📩 toyId:", toyId);

  try {
    if (!userId || !toyId) {
      console.log("❌ Missing userId or toyId");
      return res.status(400).json({ message: "Missing userId or toyId" });
    }

    const user = await User.findById(userId);
    if (!user) {
      console.log("❌ User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const isAlreadyFavorite = user.favorites.includes(toyId);

    if (isAlreadyFavorite) {
      user.favorites = user.favorites.filter((id) => id.toString() !== toyId);
    } else {
      user.favorites.push(toyId);
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: isAlreadyFavorite ? "Removed from favorites" : "Added to favorites",
      favorites: user.favorites,
    });
  } catch (err) {
    console.error("❌ toggleFavorite error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get All Favorites
exports.getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate("favorites");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ message: "Failed to get favorites", error: err });
  }
};
