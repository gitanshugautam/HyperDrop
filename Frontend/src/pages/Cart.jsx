import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(stored);
  }, []);

  const updateQty = (id, type) => {
    const updated = cart.map((item) => {
      if (item._id === id) {
        return {
          ...item,
          qty: type === "inc" ? item.qty + 1 : Math.max(1, item.qty - 1),
        };
      }
      return item;
    });
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (id) => {
    const updated = cart.filter((item) => item._id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // 💰 PRICE LOGIC (SAME AS CHECKOUT)
  const itemsTotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const deliveryCharge = itemsTotal >= 499 ? 0 : 60;
  const total = itemsTotal + (cart.length ? deliveryCharge : 0);

  return (
    <div className="min-h-screen bg-[#E0FFFF] px-6 py-8">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Cart</h1>

        <button
          onClick={() => navigate(-1)}
          className="text-base font-semibold text-gray-800 hover:text-black"
        >
          ← Continue Shopping
        </button>
      </div>

      {cart.length === 0 ? (
        <div className="bg-white rounded-xl p-10 text-center shadow-sm">
          <p className="text-gray-600 mb-6 text-lg">
            Your cart is empty 🛒
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-8 py-3 rounded-lg bg-black text-white font-semibold text-base"
          >
            Shop Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: ITEMS */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-contain"
                />

                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {item.name}
                  </p>
                  <p className="text-lg font-bold text-gray-900 mt-1">
                    ₹{item.price}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQty(item._id, "dec")}
                    className="w-8 h-8 rounded-full bg-gray-300 font-bold"
                  >
                    −
                  </button>
                  <span className="font-semibold">{item.qty}</span>
                  <button
                    onClick={() => updateQty(item._id, "inc")}
                    className="w-8 h-8 rounded-full bg-gray-300 font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item._id)}
                  className="ml-4 text-sm text-red-500 font-medium"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* RIGHT: SUMMARY */}
          <div className="bg-white rounded-xl p-6 shadow-sm h-fit">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>

            <div className="flex justify-between text-sm mb-2">
              <span>Items Total</span>
              <span>₹{itemsTotal}</span>
            </div>

            <div className="flex justify-between text-sm mb-1">
              <span>Delivery</span>
              {deliveryCharge === 0 ? (
                <span className="text-green-600 font-semibold">
                  FREE 🎉
                </span>
              ) : (
                <span className="font-semibold">₹60</span>
              )}
            </div>

            {itemsTotal < 499 && (
              <p className="text-xs text-gray-600 mb-3">
                Add items worth ₹{499 - itemsTotal} more for FREE delivery
              </p>
            )}

            <div className="border-t pt-4 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="mt-6 w-full py-3 rounded-lg bg-black text-white font-semibold"
            >
              Proceed to Buy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
