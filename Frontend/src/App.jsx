import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

// USER PAGES
import Home from "./pages/Home";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import GoogleSuccess from "./pages/GoogleSuccess";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import SavedAddresses from "./pages/SavedAddresses";
import EditAddress from "./pages/EditAddress";

// UTILS
import { getUserLocation, reverseGeocode } from "./utils/location";

// ADMIN PAGES
import AdminLayout from "./pages/AdminLayout";
import AdminPanel from "./pages/AdminPanel"; // DASHBOARD
import AdminProducts from "./pages/AdminProducts";
import AdminProductForm from "./pages/AdminProductForm";
import AdminUsers from "./pages/AdminUsers";
import AdminOrders from "./pages/AdminOrders";
import AdminDashboard from "./pages/AdminDashboard";

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

        {/* DEFAULT */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/google-success" element={<GoogleSuccess />} />

        {/* USER */}
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/saved-addresses" element={<SavedAddresses />} />
        <Route path="/edit-address/:id" element={<EditAddress />} />

        {/* ================= ADMIN ROUTES (FIXED) ================= */}
        <Route path="/admin" element={<AdminLayout />}>

          {/* DASHBOARD */}
         <Route index element={<AdminDashboard />} />

          
          {/* PRODUCTS */}
          <Route path="products" element={<AdminPanel />} />

          <Route path="add" element={<AdminProductForm />} />
          <Route path="edit/:id" element={<AdminProductForm />} />

          {/* USERS */}
          <Route path="users" element={<AdminUsers />} />

          {/* ORDERS */}
          <Route path="orders" element={<AdminOrders />} />

        </Route>
        {/* ======================================================== */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
