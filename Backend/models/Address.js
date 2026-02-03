const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
   userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
},

    flat: { type: String, required: true },
    floor: { type: String },
    area: { type: String, required: true },
    name: { type: String, required: true },
    mobile: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema);
