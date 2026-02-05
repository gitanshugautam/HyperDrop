import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";
import googleLogo from "../assets/google.png";

const LoginModal = ({ onClose, openSignup }) => {   // ✅ ONLY CHANGE
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
 // logic SAME
  const [password, setPassword] = useState("");
  

  const handleLogin = async (isAdmin = false) => {

    try {
  const res = await API.post("/auth/login", {
  mobile,
  password,
  loginAsAdmin: isAdmin,
});



      localStorage.setItem("token", res.data.token);
localStorage.setItem("user", JSON.stringify(res.data.user));

// ✅ ADD THIS (cart fetch)
const cartRes = await API.get(`/cart/${res.data.user._id}`);
window.dispatchEvent(
  new CustomEvent("cartUpdate", { detail: cartRes.data })
);

onClose();

if (res.data.user.isAdmin) {
  navigate("/admin");
} else {
  navigate("/home");
}


    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      {/* OVERLAY */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
      />

      {/* MODAL */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-[360px] bg-white rounded-2xl shadow-2xl px-7 py-7"
        >
          {/* BACK */}
          <button
            onClick={onClose}
            className="text-sm text-gray-400 hover:text-black mb-3"
          >
            ← Back
          </button>

          {/* BRAND */}
          <h1 className="text-2xl font-extrabold text-center mb-1">
            <span className="text-[#FACC15]">Hyper</span>
            <span className="text-[#111827]">Drop</span>
          </h1>

          <p className="text-sm text-center text-gray-500 mb-6">
            Login to continue
          </p>

          {/* MOBILE */}
          <label className="text-xs font-semibold text-gray-600 mb-1 block">
            Mobile Number
          </label>
          <input
            type="tel"
            placeholder="Enter mobile number"
            onChange={(e) => setMobile(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 mb-4
                       bg-gray-50 outline-none
                       focus:ring-2 focus:ring-[#0C831F]"
          />

          {/* PASSWORD */}
          <label className="text-xs font-semibold text-gray-600 mb-1 block">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 mb-5
                       bg-gray-50 outline-none
                       focus:ring-2 focus:ring-[#0C831F]"
          />

          {/* LOGIN */}
          <button onClick={() => handleLogin(false)}
            className="w-full bg-[#0C831F] text-white py-2.5 rounded-lg
                       font-semibold hover:bg-[#0A6E1A] transition"
          >
            Continue
          </button>


<button onClick={() => handleLogin(true)}

  className="w-full mt-2 border border-[#0C831F] text-[#0C831F]
             py-2.5 rounded-lg font-semibold hover:bg-green-50 transition"
>
  Login as Admin
</button>


          {/* OR */}
          <div className="flex items-center my-4 text-gray-300 text-xs">
            <div className="flex-grow h-px bg-gray-200"></div>
            <span className="px-3">OR</span>
            <div className="flex-grow h-px bg-gray-200"></div>
          </div>

          {/* GOOGLE */}
          <button
            onClick={() =>
              (window.location.href =
                "http://localhost:5000/api/auth/google")
            }
            className="w-full flex items-center justify-center gap-3
                       border border-gray-300 rounded-lg py-2.5
                       text-sm font-medium hover:bg-gray-100 transition mb-4"
          >
            <img src={googleLogo} alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>

          {/* SIGNUP */}
          <p className="text-xs text-center text-gray-500">
            New to HyperDrop?{" "}
            <button
              onClick={openSignup}
              className="text-green-600 font-semibold"
            >
              Create account
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
