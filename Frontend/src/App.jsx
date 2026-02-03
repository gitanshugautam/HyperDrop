import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";   // ✅ ONLY THIS LINE ADDED
import Home from "./pages/Home";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import GoogleSuccess from "./pages/GoogleSuccess";
import Products from "./pages/Products";
import Admin from "./pages/Admin";

import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import { getUserLocation, reverseGeocode } from "./utils/location";

function App() {
  useEffect(() => {
    const savedLocation = localStorage.getItem("location");
    if (savedLocation) return;

    getUserLocation()
      .then(async ({ lat, lng }) => {
        const loc = await reverseGeocode(lat, lng);
        localStorage.setItem("location", JSON.stringify(loc));
        window.dispatchEvent(new Event("locationUpdated"));
      })
      .catch(() => {
        console.log("Location permission denied");
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/google-success" element={<GoogleSuccess />} />

        <Route path="/products" element={<Products />} />
        <Route path="/admin" element={<Admin />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
