import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SavedAddresses = () => {
  const [addresses, setAddresses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get("http://localhost:5000/api/address/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setAddresses(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/address/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setAddresses((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-address/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#f7fce8] px-6 py-8">
      <div className="max-w-4xl mx-auto relative">

        {/* ✅ BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-sm text-gray-600 hover:text-gray-900"
        >
          ← Back
        </button>

        <h2 className="text-2xl font-bold mb-6 text-gray-900">
          My Addresses
        </h2>

        {addresses.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-6 text-center text-gray-500">
            No saved addresses
          </div>
        ) : (
          <div className="grid gap-4">
            {addresses.map((addr) => (
              <div
                key={addr._id}
                className="bg-white rounded-xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-900 text-lg">
                      {addr.name}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {addr.flat}, {addr.area}
                    </p>
                    {addr.city && addr.pincode && (
                      <p className="text-sm text-gray-600">
                        {addr.city}, {addr.pincode}
                      </p>
                    )}
                    <p className="text-sm text-gray-700 mt-2">
                      📞 {addr.mobile}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={() => handleEdit(addr._id)}
                    className="text-sm px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-100"
                  >
                    ✏️ Edit
                  </button>

                  <button
                    onClick={() => handleDelete(addr._id)}
                    className="text-sm px-3 py-1 rounded-lg border border-red-500 text-red-600 hover:bg-red-50"
                  >
                    🗑️ Delete
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedAddresses;
