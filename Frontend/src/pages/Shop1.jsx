import { useNavigate } from "react-router-dom";

const Shop1 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-[#f7fce9]">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 px-4 py-2 bg-black text-white rounded-lg"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold text-gray-900">Out of Stock</h1>
    </div>
  );
};

export default Shop1;

