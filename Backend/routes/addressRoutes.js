const express = require("express");
const router = express.Router();
const Address = require("../models/Address");
const jwt = require("jsonwebtoken");

// SAVE ADDRESS
router.post("/save", async (req, res) => {
  try {
    const {
      flat,
      floor,
      area,
      name,
      mobile,
    } = req.body;

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "No token" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    if (!userId || !flat || !area || !name || !mobile) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const address = new Address({
      userId,
      flat,
      floor,
      area,
      name,
      mobile,
    });

    await address.save();

    res.json({ success: true, address });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
