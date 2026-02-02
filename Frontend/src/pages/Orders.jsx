import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [openOrderId, setOpenOrderId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(data);
  }, []);

  if (orders.length === 0) {
    return (
        
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f7fce9]">
        
        <p className="mb-4 text-lg font-semibold">
          No orders yet 🛒
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold"
        >
          Shop Now
        </button>
      </div>
    );
  }

  return (
    
    <div className="min-h-screen bg-[#f7fce9] px-4 py-6 mt-[65px]">
      {/* HEADER */} <Header />
        <button
    onClick={() => navigate("/Home")}
    className="px-3 py-1 rounded-lg bg-green-600 text-white text-sm font-semibold"
  >
    ← Back
  </button>
      <div className="max-w-3xl mx-auto mb-6">
        <h1 className="text-2xl font-extrabold text-green-800">
          Your Orders
        </h1>
        <p className="text-sm text-gray-600">
          Fast delivery • Fresh items 🥬
        </p>
      </div>

      {/* ORDERS */}
      <div className="max-w-3xl mx-auto space-y-4">
        {orders.map((order) => {
          const isOpen = openOrderId === order.id;

          return (
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow border border-green-100 overflow-hidden"
            >
              {/* ORDER SUMMARY */}
              <button
                onClick={() =>
                  setOpenOrderId(isOpen ? null : order.id)
                }
                className="w-full flex justify-between items-center p-5 text-left"
              >
                <div>
                  <p className="font-semibold text-gray-900">
                    Order #{order.id.slice(-6)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(order.date).toLocaleString()}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold text-green-700 text-lg">
                    ₹{order.amount}
                  </p>
                  <p className="text-xs text-green-600 font-medium">
                    {isOpen ? "Hide details ▲" : "View details ▼"}
                  </p>
                </div>
              </button>

              {/* ITEMS */}
              {isOpen && (
                <div className="bg-[#f9fff0] border-t border-green-100 px-5 py-4">
                  <p className="font-semibold text-green-800 mb-3">
                    Items in this order
                  </p>

                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div
                        key={item._id}
                        className="flex items-center gap-4 bg-white p-3 rounded-xl shadow-sm"
                      >
                        {/* IMAGE */}
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-14 object-cover rounded-lg border"
                        />

                        {/* DETAILS */}
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            Qty × {item.qty}
                          </p>
                        </div>

                        {/* PRICE */}
                        <p className="font-semibold text-gray-900">
                          ₹{item.price * item.qty}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
