const express = require("express")
const { verifyToken } = require("../middleware/auth")
const { addToCart, getCartItems, removeFromCart } = require("../Controllers/cartController")

const router= express.Router()

router.post("/add", verifyToken, addToCart)
router.get("/", verifyToken, getCartItems);
router.delete("/:toyId", verifyToken, removeFromCart);

module.exports =  router