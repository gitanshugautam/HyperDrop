import bannerImg from "../assets/baner.jpg";
import pharmacyImg from "../assets/pharmacy.png";
import petImg from "../assets/pet.png";
import babyImg from "../assets/baby.png";
import Header from "../components/Header";
import CartDrawer from "../components/CartDrawer";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

import prod1 from "../assets/pet.png";
import prod2 from "../assets/pet.png";
import prod3 from "../assets/pet.png";
import prod4 from "../assets/pet.png";
import prod5 from "../assets/pet.png";
import prod6 from "../assets/pet.png";

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
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      item.name?.toLowerCase().includes(q) ||
      item.category?.toLowerCase().includes(q) ||
      item.brand?.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/Home", { replace: true });
    }
  }, []);

  useEffect(() => {
    API.get("/products")
      .then((res) => setProducts(res.data))
      .catch(() => setProducts([]));
  }, []);

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
    <div className="min-h-screen bg-[#f7fce9]">
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
        onSearch={setSearchQuery}
        setSearchResults={(q) =>
          setTimeout(() => {
            const r = products
              .filter((item) =>
                item.name.toLowerCase().includes(q.toLowerCase()) ||
                item.category.toLowerCase().includes(q.toLowerCase()) ||
                item.brand.toLowerCase().includes(q.toLowerCase())
              )
              .slice(0, 6);

            window.dispatchEvent(
              new CustomEvent("searchResults", { detail: r })
            );
          }, 0)
        }
      />

      <section className="mx-auto relative inline-block rounded-2xl">
        <div className="p-6 pl-[135px] pr-40 mt-[80px] rounded-2xl overflow-hidden">
          <img src={bannerImg} alt="Baner" className="block rounded-2xl shadow-lg" />
        </div>

        <button
  onClick={() => navigate("/shop1")}
  className="absolute bottom-12 left-[200px] px-8 py-3 rounded-xl bg-white text-gray-900 font-semibold text-base shadow-lg hover:scale-105 transition"
>
  Shop Now
</button>

      </section>

      <section className="mx-8 pl-[105px] pr-[220px] grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
        <ServiceCard title="Pharmacy at doorstep" img={pharmacyImg} onClick={() => navigate("/shop2")} />
<ServiceCard title="Pet care supplies" img={petImg} onClick={() => navigate("/shop3")} />
<ServiceCard title="Baby care essentials" img={babyImg} onClick={() => navigate("/shop4")} />

      </section>

      {/* ===== OTHER PRODUCTS ===== */}
      <section className="mx-[136px] mt-14">
        <h2 className="text-xl font-semibold mb-6 text-gray-900">
          Other products
        </h2>

        <div
          className="
            grid grid-cols-7 gap-6 px-4
            max-2xl:grid-cols-6
            max-xl:grid-cols-5
            max-lg:grid-cols-4
            max-md:grid-cols-3
            max-sm:grid-cols-2
          "
        >
          {filteredProducts.map((item) => (
            <div
              key={item._id}
              className="
                bg-white rounded-xl p-3
                border border-gray-200
                shadow-sm
                transition-all duration-300
                hover:shadow-2xl
                hover:-translate-y-1
                hover:border-green-300
              "
            >
              <div className="w-full h-[110px] flex items-center justify-center mb-2">

                <img
                  src={item.image}
                  alt={item.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <p className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug-tight mb-1"

>
                {item.name}
              </p>

              <p className="text-lg font-bold text-gray-900 mb-3">
                ₹{item.price}
              </p>

              <button
                disabled={cartLoadingId === item._id}
                onClick={() => addToCart(item)}
                className={`w-full py-1.5 rounded-md
 text-sm font-semibold border
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

const ServiceCard = ({ title, img, bg, onClick }) => {
  return (
    <div
      className="relative rounded-2xl shadow-md overflow-hidden h-[210px] w-[349px] hover:scale-105 transition"
      style={{ backgroundColor: bg }}
    >
      <img
        src={img}
        alt="card"
        className="absolute inset-0 w-full h-full object-contain"
      />

      <div className="relative z-10 p-6 h-full flex items-end">
        <button
          onClick={onClick}
          className="px-5 py-2 rounded-lg bg-white text-gray-900 text-sm font-medium shadow"
        >
          Order now
        </button>
      </div>
    </div>
  );
};

export default Home;
