import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

const Header = ({
  cartCount,
  cartBounce,
  onCartClick,
  onSearch,
  setSearchResults
}) => {


  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const profileRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const [location, setLocation] = useState(null);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);


  useEffect(() => {
  const handler = (e) => setResults(e.detail);
  window.addEventListener("searchResults", handler);
  return () =>
    window.removeEventListener("searchResults", handler);
}, []);



  useEffect(() => {
    const loadLocation = () => {
      const loc = JSON.parse(localStorage.getItem("location"));
      if (
        loc &&
        typeof loc.city === "string" &&
        loc.city.length > 2 &&
        !/[^a-zA-Z\s]/.test(loc.city)
      ) {
        setLocation(loc);
      } else {
        setLocation(null);
      }
    };

    loadLocation();
    window.addEventListener("locationUpdated", loadLocation);
    return () =>
      window.removeEventListener("locationUpdated", loadLocation);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const loggedIn =
      !!localStorage.getItem("token") ||
      !!localStorage.getItem("user");
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 flex items-center gap-6 px-8 py-4 bg-white border-b">
        <div className="text-2xl font-extrabold tracking-tight">
          <span className="text-[#facc15]">Hyper</span>
          <span className="text-[#111827]">Drop</span>
        </div>

        <div className="h-6 w-[1px] bg-black opacity-30 mx-3" />

        <div className="leading-tight">
          <p className="font-semibold text-sm text-gray-900">
            Delivery in 15 minutes
          </p>
          <p className="text-xs text-gray-500">
            📍 {location ? `${location.city} ${location.pincode}` : "Detecting location..."}
          </p>
        </div>

        <div className="h-6 w-[1px] bg-black opacity-30 mx-3" />

       <input
  type="text"
  placeholder="Search for products"
  className="flex-1 px-5 py-2.5 rounded-xl bg-[#f1f1f1] focus:outline-none"
  value={search}
  onChange={(e) => {
    const val = e.target.value;
    setSearch(val);
    onSearch(val);
    setSearchResults(val);

    window.dispatchEvent(
  new CustomEvent("searchQuery", { detail: val })
);

    if (!val) setResults([]);
  }}
/>
{search && results.length > 0 && (
  <div className="absolute top-[72px] left-1/2 -translate-x-1/2 w-[600px] bg-white border rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto">
    {results.map((item) => (
      <div
        key={item._id}
        onClick={() => {
          document.getElementById(item._id)?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          setResults([]);
          setSearch("");
        }}
        className="px-4 py-3 cursor-pointer hover:bg-gray-100 flex gap-3 items-center"
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-10 h-10 object-contain"
        />
        <div>
          <p className="text-sm font-medium text-gray-900">
            {item.name}
          </p>
          <p className="text-xs text-gray-500">
            {item.category} • {item.brand}
          </p>
        </div>
      </div>
    ))}
  </div>
)}


        <div className="h-6 w-[1px] bg-black opacity-30 mx-3" />

        {/* rest SAME — untouched */}


        {/* RIGHT SIDE – LOGIN / PROFILE */}
        {!isLoggedIn ? (
          <button
            onClick={() => setShowLogin(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Login
          </button>
        ) : (
          <div className="relative" ref={profileRef}>
           <button
  onClick={(e) => {
    e.stopPropagation();
    setOpenProfile(prev => !prev);
  }}
  className="flex flex-col items-center justify-center"
>

              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white text-green-700 border hover:bg-green-50 transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="w-5 h-5"
                >
                  <circle cx="12" cy="8" r="3.5" />
                  <path d="M5 20c0-3.5 3.5-6 7-6s7 2.5 7 6" />
                </svg>
              </div>
              <span className="text-xs mt-1 font-medium">Your Profile</span>
            </button>

            {openProfile && (
  <div
    className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden"
    onClick={(e) => e.stopPropagation()}
  >

          <div className="px-4 py-3 border-b">
  <p className="font-semibold text-gray-900">
  {user?.name}
</p>
<p className="text-sm text-gray-500">
  {user?.mobile}
</p>

</div>


<div className="py-2 text-sm">
  {/* MY ORDERS */}
  <button
    onClick={() => {
      navigate("/orders");
      setOpenProfile(false);
    }}
    className="w-full px-4 py-2 text-left hover:bg-gray-100"
  >
    📦 My Orders
  </button>

  {/* SAVED ADDRESSES */}
  <button
    onClick={() => {
      navigate("/saved-addresses");
      setOpenProfile(false);
    }}
    className="w-full px-4 py-2 text-left hover:bg-gray-100"
  >
    📍 Saved Addresses
  </button>
</div>


                <div className="border-t">
                  <button
                    onClick={() => {
                      localStorage.clear();
                      navigate("/home");
                      window.location.reload();
                    }}
                    className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50"
                  >
                    🚪 Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="h-6 w-[1px] bg-black opacity-30 mx-3" />

        {/* CART */}
        <button
          onClick={onCartClick}
          className={`
            relative flex items-center gap-2 px-5 py-2 rounded-full text-sm
            transition-all duration-300
            ${
              cartCount > 0
                ? "bg-green-600 text-white scale-105"
                : "bg-gray-300 text-gray-500 opacity-60"
            }
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

      {/* ✅ LOGIN MODAL */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          openSignup={() => {          // ✅ ADD
            setShowLogin(false);
            setShowSignup(true);
          }}
        />
      )}

      {/* ✅ SIGNUP MODAL */}
      {showSignup && (               // ✅ ADD
        <SignupModal onClose={() => setShowSignup(false)} />
      )}
    </>
  );
};

export default Header;
