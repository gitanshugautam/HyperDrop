const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    items: [
      {
        name: String,
        price: Number,
        qty: Number,
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentId: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
    },
    status: {
      type: String,
      default: "Paid",
    },
    address: {
      name: String,
      mobile: String,
      flat: String,
      area: String,
      city: String,
      pincode: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
