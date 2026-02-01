import bannerImg from "../assets/baner.jpg";
import pharmacyImg from "../assets/pharmacy.png";
import petImg from "../assets/pet.png";
import babyImg from "../assets/baby.png";
import Header from "../components/Header";
import CartDrawer from "../components/CartDrawer";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";


// imports rehne diye, par fallback use nahi hoga
import prod1 from "../assets/pet.png";
import prod2 from "../assets/pet.png";
import prod3 from "../assets/pet.png";
import prod4 from "../assets/pet.png";
import prod5 from "../assets/pet.png";
import prod6 from "../assets/pet.png";

// ❌ PET FALLBACK IMAGE DISABLED
const fallbackImages = [];

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [cartLoadingId, setCartLoadingId] = useState(null);
  const [buyLoadingId, setBuyLoadingId] = useState(null);
  const [toast, setToast] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [cartBounce, setCartBounce] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  // 🔐 AUTH GUARD
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/Home", { replace: true });
    }
  }, []);

  // 📦 API PRODUCTS
  useEffect(() => {
    API.get("/products")
      .then((res) => setProducts(res.data))
      .catch(() => setProducts([]));
  }, []);

  // 🛒 CART COUNT ON LOAD
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    setCartCount(count);
    setCartBounce(true);
    setTimeout(() => setCartBounce(false), 300);

  }, []);
useEffect(() => {
  const syncCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((s, i) => s + i.qty, 0);
    setCartCount(count);
  };

  window.addEventListener("cartUpdated", syncCart);
  return () => window.removeEventListener("cartUpdated", syncCart);
}, []);

  const addToCart = (product) => {
    setCartLoadingId(product._id);

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item._id === product._id);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    setCartCount(count);

    setToast("Added to cart");
    setTimeout(() => setToast(""), 2000);

    setTimeout(() => {
      setCartLoadingId(null);
    }, 500);
  };

  const buyNow = (product) => {
    setBuyLoadingId(product._id);

    localStorage.setItem(
      "checkout",
      JSON.stringify([{ ...product, qty: 1 }])
    );

    setTimeout(() => {
      setBuyLoadingId(null);
      navigate("/checkout");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ===== TOAST ===== */}
      {toast && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="bg-black text-white px-8 py-4 rounded-xl text-base font-semibold shadow-xl">
            {toast}
          </div>
        </div>
      )}
 <Header
  cartCount={cartCount}
  cartBounce={cartBounce}
  onCartClick={() => setCartOpen(true)}
/>



      {/* ===== BANNER ===== */}
      <section className="mx-auto relative inline-block rounded-2xl ">
        <div className="p-6 pl-[135px] pr-40 mt-[80px] rounded-2xl overflow-hidden">
          <img src={bannerImg} alt="Baner" className="block rounded-xl" />
        </div>

        <button className="absolute bottom-12 left-[200px] px-8 py-3 rounded-xl bg-white text-gray-900 font-semibold text-base shadow-md">
          Shop Now
        </button>
      </section>

      {/* ===== SERVICE CARDS ===== */}
      <section className="mx-8 pl-[105px] pr-[220px] grid grid-cols-1 md:grid-cols-3 gap-6">
        <ServiceCard title="Pharmacy at doorstep" img={pharmacyImg}  />
        <ServiceCard title="Pet care supplies" img={petImg}  />
        <ServiceCard title="Baby care essentials" img={babyImg} />
      </section>
{/* ===== OTHER PRODUCTS ===== */}
<section className="mx-[136px] mt-10">
  <h2 className="text-xl font-semibold mb-6 text-gray-900">
    Other products
  </h2>

  <div
    className="grid grid-cols-5 gap-8 px-10
               max-xl:grid-cols-4
               max-lg:grid-cols-3
               max-md:grid-cols-2
               max-sm:grid-cols-1"
  >
    {products.map((item) => (
      <div
        key={item._id}
        className="
          bg-white rounded-2xl p-4
          border border-gray-200
          shadow-sm
          transition-all duration-300
          hover:shadow-xl
          hover:border-green-300
          hover:bg-green-50
        "
      >
        {/* IMAGE */}
        <div className="w-full h-[150px] flex items-center justify-center mb-3">
          <img
            src={item.image}
            alt={item.name}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        {/* NAME (2 lines fixed height) */}
        <p className="text-sm font-medium text-gray-800 line-clamp-2 h-[40px] mb-1">
          {item.name}
        </p>

        {/* PRICE */}
        <p className="text-lg font-bold text-gray-900 mb-3">
          ₹{item.price}
        </p>

        {/* ADD BUTTON */}
        <button
          disabled={cartLoadingId === item._id}
          onClick={() => addToCart(item)}
          className={`w-full py-2 rounded-lg text-sm font-semibold border
            ${
              cartLoadingId === item._id
                ? "bg-green-100 text-green-700 border-green-300 cursor-not-allowed"
                : "border-green-600 text-green-600 hover:bg-green-100"
            }
            transition`}
        >
          {cartLoadingId === item._id ? "ADDING..." : "ADD"}
        </button>
      </div>
    ))}
  </div>
</section>
  <CartDrawer
    open={cartOpen}
    onClose={() => setCartOpen(false)}
    cartItems={JSON.parse(localStorage.getItem("cart")) || []}
    cartCount={cartCount}
  />



    </div>
  );
};

const ServiceCard = ({ title, img, bg }) => {
  return (
    <div
      className="relative rounded-xl shadow-sm overflow-hidden h-[210px] w-[349px]"
      style={{ backgroundColor: bg }}
    >
      <img
  src={img}
  alt="card"
  className="absolute inset-0 w-full h-full object-contain"
/>

      <div className="relative z-10 p-6 h-full flex items-end">
        <button className="px-5 py-2 rounded-lg bg-white text-gray-900 text-sm font-medium shadow">
          Order now
        </button>
      </div>
    </div>
  );
};

export default Home;
