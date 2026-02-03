import React, { useState } from "react";
import API from "../api/api";

const SignupModal = ({ onClose }) => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const res = await API.post("/auth/signup", {
        name,
        mobile,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      onClose();
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
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
          <h1 className="text-2xl font-bold mb-1 text-center">
            <span className="text-[#facc15]">Hyper</span>
            <span className="text-[#111827]">Drop</span>
          </h1>

          <h2 className="text-lg font-semibold text-center mb-1">
            Create Account
          </h2>

          {/* NAME */}
          <label className="text-sm mb-1 block">Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 mb-4
                       focus:outline-none focus:ring-2 focus:ring-[#0C831F]"
          />

          {/* MOBILE */}
          <label className="text-sm mb-1 block">Mobile Number</label>
          <input
            type="tel"
            placeholder="Enter your mobile number"
            onChange={(e) => setMobile(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 mb-4
                       focus:outline-none focus:ring-2 focus:ring-[#0C831F]"
          />

          {/* PASSWORD */}
          <label className="text-sm mb-1 block">Password</label>
          <input
            type="password"
            placeholder="Create password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 mb-6
                       focus:outline-none focus:ring-2 focus:ring-[#0C831F]"
          />

          {/* SIGNUP */}
          <button
            onClick={handleSignup}
            className="w-full bg-[#0C831F] text-white py-3 rounded-lg
                       font-medium hover:bg-[#0A6E1A] transition mb-4"
          >
            Create Account
          </button>

          {/* OR */}
          <div className="flex items-center my-4 text-gray-300 text-xs">
            <div className="flex-grow h-px bg-gray-200"></div>
            <span className="px-3">OR</span>
            <div className="flex-grow h-px bg-gray-200"></div>
          </div>

          {/* GOOGLE SIGNUP */}
          <button
            onClick={() => {
              window.location.href =
                "http://localhost:5000/api/auth/google";
            }}
            className="w-full flex items-center justify-center gap-3
                       border border-gray-300 rounded-lg py-2.5
                       text-sm font-medium hover:bg-gray-100 transition"
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>
        </div>
      </div>
    </>
  );
};

export default SignupModal;
