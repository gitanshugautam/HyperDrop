const express = require("express");
const router = express.Router();
const admin = require("../middleware/admin");
const User = require("../models/user");
const Address = require("../models/Address");

// GET ALL USERS + ADDRESSES (ADMIN)
router.get("/", admin, async (req, res) => {
  try {
    const users = await User.find().select("-password");

    const usersWithAddress = await Promise.all(
      users.map(async (u) => {
        const addresses = await Address.find({ userId: u._id });
        return { ...u.toObject(), addresses };
      })
    );

    res.json(usersWithAddress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE USER (ADMIN)
router.delete("/:id", admin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    await Address.deleteMany({ userId: req.params.id });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
