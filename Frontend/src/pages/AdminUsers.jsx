import { useEffect, useState } from "react";
import axios from "axios";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data));
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    await axios.delete(`http://localhost:5000/api/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setUsers((u) => u.filter((x) => x._id !== id));
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
        <span className="text-sm text-gray-500">
          Total Users: {users.length}
        </span>
      </div>

      {/* USERS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {users.map((u) => (
          <div
            key={u._id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition p-6"
          >
            {/* USER BASIC INFO */}
            <div className="flex items-start justify-between">
              <div>
               <p className="text-lg font-semibold text-gray-900">
  {u.name}
</p>
<p className="text-sm text-gray-500">{u.email}</p>

{u.mobile && (
  <p className="text-sm text-gray-600">
    <span className="font-semibold">Mobile:</span> {u.mobile}
  </p>
)}

              </div>

              <span
                className={`text-xs px-3 py-1 rounded-full font-semibold ${
                  u.isAdmin
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {u.isAdmin ? "Admin" : "User"}
              </span>
            </div>

            {/* ADDRESS SECTION */}
            {u.addresses?.length > 0 && (
              <div className="mt-5">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Saved Addresses
                </p>

                <div className="space-y-3">
                  {u.addresses.map((a, i) => (
                    <div
                      key={a._id}
                      className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700"
                    >
                      <p className="font-medium mb-1">
                        Address {i + 1}
                      </p>

                      <p>
                        <span className="font-semibold">Name:</span>{" "}
                        {a.name}
                      </p>
                      <p>
                        <span className="font-semibold">Mobile:</span>{" "}
                        {a.mobile}
                      </p>
                      <p>
                        <span className="font-semibold">Flat / House:</span>{" "}
                        {a.flat}
                      </p>
                      <p>
                        <span className="font-semibold">Floor:</span>{" "}
                        {a.floor}
                      </p>
                      <p>
                        <span className="font-semibold">Area:</span>{" "}
                        {a.area}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* DELETE */}
            <div className="mt-5 flex justify-end">
              <button
                onClick={() => handleDelete(u._id)}
                className="text-red-600 text-sm font-semibold hover:text-red-700"
              >
                Delete User
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;
