import React, { useState } from "react";

const categories = [
  "All",
  "Vegetables",
  "Fruits",
  "Snacks",
  "Beverages",
];

const productsData = [
  {
    id: 1,
    name: "Potato",
    price: 30,
    category: "Vegetables",
    image: "https://i.imgur.com/8zQZQZQ.png",
  },
  {
    id: 2,
    name: "Onion",
    price: 40,
    category: "Vegetables",
    image: "https://i.imgur.com/1bX5QH6.png",
  },
  {
    id: 3,
    name: "Banana",
    price: 60,
    category: "Fruits",
    image: "https://i.imgur.com/7yUvePI.png",
  },
  {
    id: 4,
    name: "Lays Chips",
    price: 20,
    category: "Snacks",
    image: "https://i.imgur.com/3ZQ3ZQZ.png",
  },
];

const Products = () => {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const filteredProducts = productsData.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#f5f7ff]">

      {/* CATEGORY SIDEBAR */}
      <div className="w-56 bg-white p-4 shadow">
        <h2 className="font-bold mb-4">Categories</h2>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`block w-full text-left px-3 py-2 mb-2 rounded ${
              category === cat
                ? "bg-green-500 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCTS AREA */}
      <div className="flex-1 p-6">
        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search groceries..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-6 px-4 py-3 rounded-lg border"
        />

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredProducts.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow p-4 flex flex-col items-center"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-24 object-contain mb-3"
              />
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600">₹{item.price}</p>
              <button
                onClick={() => addToCart(item)}
                className="mt-3 bg-green-500 text-white px-4 py-1 rounded"
              >
                Add
              </button>
            </div>
          ))}
        </div>

        {/* CART COUNT */}
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg">
          Cart 🛒 {cart.length}
        </div>
      </div>
    </div>
  );
};

export default Products;
