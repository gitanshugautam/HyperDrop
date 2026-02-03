const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    mobile: {
      type: String,
      unique: true,
      required: function () {
        return !this.googleId; // ✅ normal signup me required
      },
    },

    email: {
      type: String,

    },

    password: {
      type: String,
      required: function () {
        return !this.googleId; // ✅ google signup me optional
      },
    },

    googleId: {
      type: String, // ✅ sirf Google users ke liye
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
