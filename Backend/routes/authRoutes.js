const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/user");

const router = express.Router();

/* ================= SIGNUP ================= */
router.post("/signup", async (req, res) => {
  try {
    const { name, mobile, password } = req.body;

    const userExists = await User.findOne({ mobile });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      mobile,
      password: hashedPassword,
    });

    const token = jwt.sign(
  { id: user._id, isAdmin: user.isAdmin },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);

    res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        mobile: user.mobile,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ================= LOGIN ================= */
router.post("/login", async (req, res) => {

  const { mobile, password, loginAsAdmin } = req.body;

// ✅ ENV ADMIN LOGIN
if (
  loginAsAdmin &&
  mobile === process.env.ADMIN_MOBILE &&
  password === process.env.ADMIN_PASSWORD
) {
  const token = jwt.sign(
    { id: "ADMIN_ENV", isAdmin: true },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return res.json({
    token,
    user: {
      _id: "ADMIN_ENV",
      name: "Admin",
      mobile,
      isAdmin: true,
    },
  });
}

  try {
    const user = await User.findOne({ mobile });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
  message: "Login successful",
  token,
  user: {
    _id: user._id,
    name: user.name,
    mobile: user.mobile,
    isAdmin: user.isAdmin || false,
  },
});

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ================= GOOGLE AUTH =================

// Step 1: Google login start
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Step 2: Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "http://localhost:5173/login",
  }),
  (req, res) => {
    if (!req.user || !req.user.token) {
      return res.redirect("http://localhost:5173/login");
    }

    const token = req.user.token;

    return res.redirect(
      `http://localhost:5173/google-success?token=${token}`
    );
  }
);

module.exports = router;
