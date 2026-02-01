import React, { useState } from "react";

const Admin = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const addProduct = () => {
    console.log({ name, price, category });
    alert("Product added (backend baad me)");
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

      <input
        placeholder="Product Name"
        onChange={(e) => setName(e.target.value)}
        className="block mb-4 px-4 py-2 border rounded w-80"
      />
      <input
        placeholder="Price"
        onChange={(e) => setPrice(e.target.value)}
        className="block mb-4 px-4 py-2 border rounded w-80"
      />
      <input
        placeholder="Category"
        onChange={(e) => setCategory(e.target.value)}
        className="block mb-4 px-4 py-2 border rounded w-80"
      />

      <button
        onClick={addProduct}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Add Product
      </button>
    </div>
  );
};

export default Admin;
