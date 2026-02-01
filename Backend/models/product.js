const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: String,
    category: String,
    brand: String,
    price: Number,
    unit: String,
    description: String,
    image: String,
    inStock: Boolean
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
