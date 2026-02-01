import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/login";
import Signup from "./pages/Signup";
import GoogleSuccess from "./pages/GoogleSuccess";
import Products from "./pages/Products";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ✅ ALWAYS LOGIN FIRST */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/google-success" element={<GoogleSuccess />} />


        {/* App */}
        <Route path="/home" element={<Home />} />

        <Route path="/products" element={<Products />} />
        <Route path="/admin" element={<Admin />} />


<Route path="/cart" element={<Cart />} />
<Route path="/checkout" element={<Checkout />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
