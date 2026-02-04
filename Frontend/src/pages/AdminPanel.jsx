import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user?.isAdmin) navigate("/home");
  }, [user, navigate]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch(() => {});
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/products/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setProducts((p) => p.filter((x) => x._id !== id));
  };

  return (
  <div className="min-h-screen bg-[#f7fce8]">
   

    <div className="p-8">

      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <button
            onClick={() => navigate("/admin/add")}
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            + Add Product
          </button>
        </div>

        <div className="bg-white rounded-xl shadow">
          {products.map((p) => (
            <div
              key={p._id}
              className="flex justify-between items-center border-b px-5 py-4"
            >
              <div>
                <p className="font-semibold">{p.name}</p>
                <p className="text-sm text-gray-500">
                  ₹ {p.price} · {p.unit} · {p.category}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => navigate(`/admin/edit/${p._id}`)}
                  className="text-blue-600 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="text-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
    </div>
  );
};

export default AdminPanel;
