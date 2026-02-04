import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddressOverlay from "../components/AddressOverlay";

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
  const [showAddress, setShowAddress] = useState(false);

  useEffect(() => {
    const checkoutItems =
      JSON.parse(localStorage.getItem("cart")) || [];
    setItems(checkoutItems);
  }, []);

  const itemsTotal = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const deliveryCharge = itemsTotal >= 199 ? 0 : 60;
  const total = itemsTotal + deliveryCharge;

  const handlePlaceOrder = () => {
    setShowAddress(true);
  };

  // 👉 ADDRESS SAVE → PAYMENT
  const handleAddressSave = async (address) => {
    console.log("ADDRESS RECEIVED 👉", address);

    localStorage.setItem(
      "deliveryAddress",
      JSON.stringify(address)
    );

    await fetch("http://localhost:5000/api/address/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        flat: address.flat,
        floor: address.floor,
        area: address.area,
        name: address.name,
        mobile: address.mobile,
      }),
    });

    setShowAddress(false);
    handlePayment();
  };

  const handlePayment = async () => {
    const isLoaded = await loadRazorpay();
    if (!isLoaded) {
      alert("Razorpay SDK failed to load");
      return;
    }

    const res = await fetch(
      "http://localhost:5000/api/payment/create-order",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      }
    );

    const order = await res.json();

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      order_id: order.id,
      name: "HyperDrop",
      handler: async function (response) {
  try {
    const address = JSON.parse(
      localStorage.getItem("deliveryAddress")
    );

    const res = await fetch(
      "http://localhost:5000/api/orders/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
  user: JSON.parse(localStorage.getItem("user"))?._id,
  items: items,
  totalAmount: total,
  paymentId: response.razorpay_payment_id,
  paymentMethod: "Online",
  address: address,
}),

      }
    );

    const data = await res.json();
    console.log("ORDER API RESPONSE 👉", data);

    localStorage.removeItem("cart");
    localStorage.removeItem("deliveryAddress");

    alert("🎉 Order placed successfully!");
    navigate("/Orders");
  } catch (err) {
    console.error("ORDER SAVE ERROR ❌", err);
    alert("Order save failed");
  }
},

    };

    new window.Razorpay(options).open();
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
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
          <div className="md:col-span-2 space-y-6">
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

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <p className="font-semibold text-gray-900">
                🚚 Delivery in 15–20 minutes
              </p>
              <p className="text-sm text-gray-600">
                Your saved location
              </p>
            </div>
          </div>

          <div className="space-y-4">
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
                  Add items worth ₹{199 - itemsTotal} more
                  for FREE delivery
                </p>
              )}

              <div className="flex justify-between font-semibold border-t pt-3 text-base">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full bg-green-600 text-white py-4 rounded-2xl font-semibold text-lg"
            >
              Place Order • ₹{total}
            </button>
          </div>
        </div>
      )}

      {showAddress && (
        <AddressOverlay
          open={showAddress}
          onClose={() => setShowAddress(false)}
          onSave={handleAddressSave}
          autoArea={
            JSON.parse(localStorage.getItem("location"))?.city ||
            ""
          }
        />
      )}
    </div>
  );
};

export default Checkout;
