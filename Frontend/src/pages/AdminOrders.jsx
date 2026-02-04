import { useEffect, useState } from "react";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrders(res.data));
  }, [token]);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Orders</h1>

      <div className="space-y-4">
        {orders.map((o) => (
          <div
            key={o._id}
            className="bg-white rounded-2xl shadow p-6 border"
          >
            {/* TOP */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-semibold">
                  Order #{o._id.slice(-6)}
                </p>
                <p className="text-sm text-gray-500">
                  {o.user?.name} • {o.user?.email}
                </p>
              </div>

              <span className="text-sm font-semibold px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">
                {o.status}
              </span>
            </div>

            {/* ITEMS */}
            <div className="text-sm text-gray-700 mb-3">
              {o.items.map((i, idx) => (
                <p key={idx}>
                  {i.name} × {i.qty} — ₹{i.price}
                </p>
              ))}
            </div>

            {/* ADDRESS */}
            <div className="text-sm text-gray-600">
              <p className="font-semibold">Delivery Address:</p>
              <p>
                {o.address.name}, {o.address.mobile}
              </p>
              <p>
                {o.address.flat}, {o.address.area}, {o.address.city} –{" "}
                {o.address.pincode}
              </p>
            </div>

            {/* FOOTER */}
            <div className="flex justify-between items-center mt-4">
              <p className="font-bold text-lg">
                Total: ₹{o.totalAmount}
              </p>
              <p className="text-sm text-gray-500">
                {o.paymentMethod}
              </p>
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <p className="text-center text-gray-500">
            No orders yet
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
