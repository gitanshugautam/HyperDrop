import { useNavigate } from "react-router-dom";

const Header = ({ cartCount, cartBounce, onCartClick }) => {

  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center gap-6 px-8 py-4 bg-white border-b">
      <div className="text-2xl font-extrabold tracking-tight">
        <span className="text-[#facc15]">Hyper</span>
        <span className="text-[#111827]">Drop</span>
      </div>

      <div className="leading-tight">
        <p className="font-semibold text-sm text-gray-900">
          Delivery in 15 minutes
        </p>
        <p className="text-xs text-gray-500">📍 Your Location</p>
      </div>

      <input
        type="text"
        placeholder="Search for products"
        className="flex-1 px-5 py-2.5 rounded-xl bg-[#f1f1f1] focus:outline-none"
      />

      {/* CART */}
      <button
       onClick={onCartClick}
        className={`
          relative flex items-center gap-2 px-5 py-2 rounded-full text-sm
          transition-all duration-300
          ${cartCount > 0
            ? "bg-green-600 text-white scale-105"
            : "bg-gray-300 text-gray-500 opacity-60"}
          ${cartBounce ? "animate-bounce" : ""}
        `}
      >
        🛒 My Cart
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
            {cartCount}
          </span>
        )}
      </button>
    </header>
  );
};

export default Header;
