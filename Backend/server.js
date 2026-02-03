require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");

const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const addressRoutes = require("./routes/addressRoutes");
// 👇 PASSPORT STRATEGY LOAD (VERY IMPORTANT)
require("./config/passport");

const app = express();

// DB connect
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(passport.initialize()); // ✅ AB SAHI JAGAH

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));

app.use("/api/products", productRoutes);
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));
app.use("/api/address", addressRoutes);
app.use("/api/products", require("./routes/productRoutes"));

app.get("/", (req, res) => {
  res.send("API running");
});

// Server start
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
