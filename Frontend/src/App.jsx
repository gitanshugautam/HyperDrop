import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
function App() {
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
