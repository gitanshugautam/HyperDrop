const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

// GET CART (login ke baad)
router.get("/:userId", async (req, res) => {
  try {

    // ✅ ADMIN safeguard (ONLY FIX)
    if (req.params.userId === "ADMIN_ENV") {
      return res.json({ userId: "ADMIN_ENV", items: [] });
    }

    const cart = await Cart.findOne({ userId: req.params.userId });
    res.json(cart || { userId: req.params.userId, items: [] });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ADD / UPDATE ITEM
router.post("/add", async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity }],
      });
    } else {
      const index = cart.items.findIndex(
        (i) => i.productId.toString() === productId
      );

      if (index > -1) {
        cart.items[index].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// CLEAR CART
router.delete("/clear/:userId", async (req, res) => {
  try {
    await Cart.findOneAndUpdate(
      { userId: req.params.userId },
      { items: [] }
    );
    res.json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
