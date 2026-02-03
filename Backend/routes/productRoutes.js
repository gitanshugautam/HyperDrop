const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const admin = require("../middleware/admin");

// GET ALL PRODUCTS (PUBLIC)
router.get("/", async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

// ADD PRODUCT (ADMIN)
router.post("/", admin, async (req, res) => {
  const { name, price } = req.body;

  const product = new Product({ name, price });
  await product.save();

  res.json(product);
});

// DELETE PRODUCT (ADMIN)
router.delete("/:id", admin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
