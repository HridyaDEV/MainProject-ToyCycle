const Cart = require("../Models/cartModel")
const Toy = require("../Models/toyModel")

// Add a toy to cart

exports.addToCart = async (req, res) => {
  const userId = req.userId;
  let { toyId, quantity } = req.body;

  try {
    console.log("🟡 Raw body received:", req.body);

    quantity = Number(quantity);
    if (!toyId || isNaN(quantity) || quantity < 1) {
      return res.status(400).json({ message: "Valid toyId and quantity required" });
    }

    const toy = await Toy.findById(toyId);
    if (!toy) {
      return res.status(404).json({ message: "Toy not found" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ toyId: toy._id, quantity }]
      });
    } else {
      const index = cart.items.findIndex(
        item => item.toyId.toString() === toy._id.toString()
      );

      if (index > -1) {
        cart.items[index].quantity += quantity;
      } else {
        cart.items.push({ toyId: toy._id, quantity });
      }
    }

    // 🔐 Filter bad items (TEMP safety)
    cart.items = cart.items.filter(
      item => item.toyId && typeof item.quantity === "number" && item.quantity > 0
    );

    console.log("🧾 Final cart before save:", JSON.stringify(cart, null, 2));

    await cart.save();
    return res.status(200).json({ success: true, message: "Item added to cart" });

  } catch (err) {
    console.error("❌ Add to cart error:", err.message);
    return res.status(500).json({
      message: "Something went wrong in addToCart",
      error: err.message
    });
  }
};




// Get all toys in user's cart
exports.getCartItems = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.userId }).populate("items.toyId");
    if (!cart) return res.status(200).json({ success: true, items: [] });

    const toys = cart.items.map(item => item.toyId);
    res.status(200).json({ success: true, items: toys });
  } catch (error) {
    console.error("Get cart items error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch cart" });
  }
};

// Remove a toy from cart
exports.removeFromCart = async (req, res) => {
  const { toyId } = req.params;

  try {
    const cart = await Cart.findOne({ userId: req.userId });
    if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

    cart.items = cart.items.filter(item => item.toyId.toString() !== toyId);
    await cart.save();

    res.status(200).json({ success: true, message: "Toy removed from cart" });
  } catch (error) {
    console.error("Remove from cart error:", error);
    res.status(500).json({ success: false, message: "Failed to remove item" });
  }
};