import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    users: 0,
    orders: 10, // ✅ HARD CODED
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) =>
        setStats({
          ...res.data,
          orders: 10, // ✅ FORCE 10
        })
      );
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7fce8] to-[#eef7d6]">
      <div className="p-8 max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Dashboard
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Overview of your store
          </p>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* PRODUCTS */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 border border-gray-100">
            <p className="text-sm text-gray-500 mb-2">
              Total Products
            </p>
            <p className="text-4xl font-extrabold text-green-700">
              {stats.products}
            </p>
          </div>

          {/* USERS */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 border border-gray-100">
            <p className="text-sm text-gray-500 mb-2">
              Total Users
            </p>
            <p className="text-4xl font-extrabold text-blue-700">
              {stats.users}
            </p>
          </div>

          {/* ORDERS */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-100 rounded-full -mr-10 -mt-10" />
            <p className="text-sm text-gray-500 mb-2 relative z-10">
              Total Orders
            </p>
            <p className="text-4xl font-extrabold text-purple-700 relative z-10">
              {stats.orders}
            </p>
          </div>

        </div>

        {/* FOOTER NOTE */}
        <div className="mt-12 text-xs text-gray-500">
          Data updates automatically based on latest activity
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
