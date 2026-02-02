import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Checkout = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
   const checkoutItems =
  JSON.parse(localStorage.getItem("cart")) || [];

    setItems(checkoutItems);
  }, []);

  // 💰 PRICE LOGIC (UNCHANGED)
  const itemsTotal = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const deliveryCharge = itemsTotal >= 199 ? 0 : 60;

  const total = itemsTotal + deliveryCharge;

 const handlePayment = async () => {
  const isLoaded = await loadRazorpay();
  if (!isLoaded) {
    alert("Razorpay SDK failed to load");
    return;
  }
  // 1️⃣ call YOUR backend
  const res = await fetch("http://localhost:5000/api/payment/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ amount: total }),

  });

  const order = await res.json();

  // 2️⃣ open Razorpay UI
  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: "INR",
    order_id: order.id,
    name: "HyperDrop",
    handler: function (response) {
  console.log("SUCCESS", response);

  const oldOrders =
  JSON.parse(localStorage.getItem("orders")) || [];

const newOrder = {
  id: response.razorpay_payment_id,
  items,
  amount: total,
  date: new Date().toISOString(),
};

localStorage.setItem(
  "orders",
  JSON.stringify([newOrder, ...oldOrders])
);

  localStorage.removeItem("cart");

  alert("🎉 Order placed successfully!");
  // ✅ payment ke baad HOME
  navigate("/Orders");
},

  };

  new window.Razorpay(options).open();
};



  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      {/* HEADER */}
      <div className="max-w-4xl mx-auto flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-sm font-medium text-gray-700"
        >
          ← Back
        </button>
        <h1 className="text-xl font-bold text-gray-900">
          Checkout
        </h1>
      </div>

      {items.length === 0 ? (
        <div className="max-w-md mx-auto bg-white rounded-2xl p-10 text-center shadow-sm">
          <p className="text-gray-600 mb-6 text-lg">
            No items to checkout 🛒
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-8 py-3 rounded-xl bg-black text-white font-semibold"
          >
            Go Back
          </button>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* LEFT SIDE */}
          <div className="md:col-span-2 space-y-6">

            {/* ITEMS */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">
                Order items
              </h2>

              {items.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between py-4 border-b last:border-b-0"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Qty × {item.qty}
                    </p>
                  </div>

                  <p className="font-semibold">
                    ₹{item.price * item.qty}
                  </p>
                </div>
              ))}
            </div>

            {/* DELIVERY INFO */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <p className="font-semibold text-gray-900">
                🚚 Delivery in 15–20 minutes
              </p>
              <p className="text-sm text-gray-600">
                Your saved location
              </p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-4">

            {/* BILL DETAILS */}
            <div className="bg-white rounded-2xl p-6 shadow-sm text-sm space-y-3">
              <h2 className="font-semibold text-gray-900">
                Bill details
              </h2>

              <div className="flex justify-between">
                <span className="text-gray-600">
                  Items total
                </span>
                <span>₹{itemsTotal}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">
                  Delivery charge
                </span>
                {deliveryCharge === 0 ? (
                  <span className="text-green-600 font-semibold">
                    FREE
                  </span>
                ) : (
                  <span>₹60</span>
                )}
              </div>

              {itemsTotal < 199 && (
  <p className="text-xs text-gray-500">
    Add items worth ₹{199 - itemsTotal} more for FREE delivery
  </p>
)}


              <div className="flex justify-between font-semibold border-t pt-3 text-base">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            {/* PLACE ORDER */}
            <button
  onClick={handlePayment}
  className="w-full bg-green-600 text-white py-4 rounded-2xl font-semibold text-lg"
>
  Place Order • ₹{total}
</button>

          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
