import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AdminProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    name: "",
    category: "",
    brand: "",
    price: "",
    unit: "",
    description: "",
    image: "",
    inStock: true,
  });

  useEffect(() => {
    if (!id) return;
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setForm(res.data));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async () => {
    const url = id
      ? `http://localhost:5000/api/products/${id}`
      : "http://localhost:5000/api/products";

    const method = id ? "put" : "post";

    await axios[method](url, form, {
      headers: { Authorization: `Bearer ${token}` },
    });

    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-[#f7fce8] px-6 py-10">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {id ? "Edit Product" : "Add Product"}
          </h2>

          {/* BACK BUTTON */}
          <button
            onClick={() => navigate("/admin")}
            className="text-sm text-gray-600 hover:text-black"
          >
            ← Back
          </button>
        </div>

        {/* FORM */}
        <div className="space-y-4">
          {["name", "category", "brand", "price", "unit", "image"].map((f) => (
            <div key={f}>
              <label className="block text-xs font-semibold text-gray-600 mb-1 capitalize">
                {f}
              </label>
              <input
                name={f}
                value={form[f]}
                onChange={handleChange}
                placeholder={`Enter ${f}`}
                className="w-full border border-gray-300 rounded-lg px-4 py-2
                           bg-gray-50 outline-none
                           focus:ring-2 focus:ring-green-600"
              />
            </div>
          ))}

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Product description"
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2
                         bg-gray-50 outline-none
                         focus:ring-2 focus:ring-green-600"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              name="inStock"
              checked={form.inStock}
              onChange={handleChange}
            />
            In Stock
          </label>

          {/* SAVE */}
          <button
            onClick={handleSubmit}
            className="w-full bg-green-600 text-white py-2.5 rounded-lg
                       font-semibold hover:bg-green-700 transition"
          >
            Save Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProductForm;
