import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";   // ✅ ONLY THIS LINE ADDED
import Home from "./pages/Home";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import GoogleSuccess from "./pages/GoogleSuccess";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import { getUserLocation, reverseGeocode } from "./utils/location";
import SavedAddresses from "./pages/SavedAddresses";
import EditAddress from "./pages/EditAddress";
import AdminPanel from "./pages/AdminPanel";
import AdminProductForm from "./pages/AdminProductForm";




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

        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/saved-addresses" element={<SavedAddresses />} />
        <Route path="/edit-address/:id" element={<EditAddress />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/add" element={<AdminProductForm />} />
        <Route path="/admin/edit/:id" element={<AdminProductForm />} />



      </Routes>
    </BrowserRouter>
  );
}

export default App;
