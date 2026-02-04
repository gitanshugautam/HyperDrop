const express = require("express");
const router = express.Router();
const Order = require("../models/order");

// CREATE ORDER
router.post("/create", async (req, res) => {
  try {
    console.log("ORDER BODY 👉", req.body);

    const order = new Order({
      user: req.body.userId || null,
      items: req.body.items,
      totalAmount: req.body.totalAmount,
      paymentId: req.body.paymentId,
      paymentMethod: req.body.paymentMethod || "Online",
      address: req.body.address,
      status: "Paid",
    });

    await order.save();

    res.status(201).json({
      success: true,
      message: "Order saved successfully",
      orderId: order._id,
    });
  } catch (err) {
    console.error("ORDER SAVE ERROR ❌", err);
    res.status(500).json({ message: err.message });
  }
});

// GET ALL ORDERS
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email mobile");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
