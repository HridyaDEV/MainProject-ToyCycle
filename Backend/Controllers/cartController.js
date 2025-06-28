const Cart = require("../Models/cartModel")

// Add a toy to cart
exports.addToCart = async (req, res) => {
    const userId = req.userId
    const { toyId } = req.body

     console.log("User ID:", userId);
    console.log("Toy ID:", toyId);

    try {
        let cart = await Cart.findOne({ userId })

        if (!cart) {
            cart = new Cart({ userId, items: [{ toyId }] })
        }
        else {
            const exists = cart.items.some(item => item.toyId.toString() === toyId)
            if (!exists) {
                cart.items.push({ toyId })
            }
        }

        await cart.save()
        res.status(200).json({ successs: true, message: "Toy added to cart" })

    } catch (error) {
        console.error("Add to cart error: ", error);
        res.status(500).json({ successs: false, message: " server error" })

    }
}

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