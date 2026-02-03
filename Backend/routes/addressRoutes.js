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

// GET ADDRESSES OF LOGGED IN USER (TOKEN BASED)
router.get("/my", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "No token" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const addresses = await Address.find({
      userId: decoded.id,
    }).sort({ createdAt: -1 });

    res.json(addresses);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE ADDRESS
router.delete("/:id", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "No token" });
    }

    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET);

    await Address.findByIdAndDelete(req.params.id);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE ADDRESS
router.put("/:id", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "No token" });
    }

    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET);

    const updated = await Address.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;
