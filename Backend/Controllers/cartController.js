const Cart = require("../Models/cartModel")
const Toy = require("../Models/toyModel")

// Add a toy to cart

exports.addToCart = async (req, res) => {
  const userId = req.userId;
  const { toyId, quantity } = req.body;

  console.log("🟡 Received body:", req.body);
console.log("🟢 quantity type:", typeof req.body.quantity);


  // Step 1: Validate incoming data
  if (!toyId || !quantity || quantity < 1) {
    return res.status(400).json({ message: "toyId and valid quantity required" });
  }

  try {
    // Step 2: Check toy exists
    const toy = await Toy.findById(toyId);
    if (!toy) return res.status(404).json({ message: "Toy not found" });

    // Step 3: Ensure requested quantity does not exceed available stock
    if (quantity > toy.quantity) {
      return res.status(400).json({ message: "Requested quantity exceeds stock" });
    }

    // Step 4: Find existing cart for this user
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Step 5: If no cart exists, create a new one
      cart = new Cart({
        userId,
        items: [{ toyId, quantity }]
      });
    } else {
      // Step 6: Check if toy already exists in this user's cart
      const existingItem = cart.items.find(
        item => item.toyId.toString() === toyId
      );

      if (existingItem) {
        // Step 7: Add to existing quantity
        const newQty = existingItem.quantity + quantity;
        if (newQty > toy.quantity) {
          return res.status(400).json({ message: "Exceeds available stock" });
        }
        existingItem.quantity = newQty;
      } else {
        // Step 8: Push new toy into items array
        cart.items.push({ toyId, quantity });
      }
    }

    // Step 9: Save the cart
    await cart.save();

    return res.status(200).json({ success: true, message: "Item added to cart" });
  } catch (err) {
    console.error("❌ Add to cart error:", err.message, err.stack);
    return res.status(500).json({ message: "Something went wrong" });
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