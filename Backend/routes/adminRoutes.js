const express = require("express");
const router = express.Router();
const admin = require("../middleware/admin");

const Product = require("../models/product");
const User = require("../models/user");

// ADMIN DASHBOARD STATS
router.get("/dashboard", admin, async (req, res) => {
  try {
    const productsCount = await Product.countDocuments();
    const usersCount = await User.countDocuments();

    res.json({
      products: productsCount,
      users: usersCount,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
