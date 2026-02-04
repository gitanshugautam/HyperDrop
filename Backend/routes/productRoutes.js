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
  try {
    req.body.price = Number(req.body.price);

    const product = new Product(req.body);
    await product.save();

    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// GET SINGLE PRODUCT (ADMIN)
router.get("/:id", admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(404).json({ message: "Product not found" });
  }
});


// UPDATE PRODUCT (ADMIN)
router.put("/:id", admin, async (req, res) => {
  try {
    req.body.price = Number(req.body.price);

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// DELETE PRODUCT (ADMIN)
router.delete("/:id", admin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
