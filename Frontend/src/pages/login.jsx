import React, { useState, useEffect } from "react";

import loginVideo from "../assets/login.mp4";
import googleLogo from "../assets/google.png";

import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      // 🔑 TOKEN SAVE (YE PEHLE BHI THA)
      localStorage.setItem("token", res.data.token);

      // ✅ SIRF YE FIX: HOME PAGE
      navigate("/home", { replace: true });
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="w-screen h-screen bg-[#eaf1ff] flex items-center justify-center">
      <div className="w-[1100px] h-[560px] bg-white rounded-2xl shadow-xl flex overflow-hidden">

        {/* LEFT SIDE */}
        <div className="w-1/2 bg-gradient-to-br from-[#e0ecff] to-[#f5f9ff] overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          >
            <source src={loginVideo} type="video/mp4" />
          </video>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-1/2 px-16 flex flex-col justify-center">
          <h1 className="text-2xl font-bold text-blue-600 mb-1">
            HyperDrop
          </h1>
          <h2 className="text-lg font-semibold mb-1">Sign In</h2>
          <p className="text-gray-500 mb-6">Unlock your world.</p>

          <label className="text-sm mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="text-sm mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition mb-4"
          >
            Sign In
          </button>

          {/* OR Divider */}
          <div className="flex items-center my-4 text-gray-400 text-sm">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-3">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {/* Google Login (UNCHANGED) */}
          <button
            onClick={() => {
              window.location.href =
                "http://localhost:5000/api/auth/google";
            }}
            className="w-full flex items-center justify-center gap-3
                       border border-gray-300 rounded-lg py-3
                       text-sm font-medium hover:bg-gray-100 transition mb-4"
          >
            <img
              src={googleLogo}
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          <Link to="/signup">
            <button className="w-full bg-gray-100 py-3 rounded-lg font-medium hover:bg-gray-200 transition">
              Create an account
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
