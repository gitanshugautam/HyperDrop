import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";
import googleLogo from "../assets/google.png";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");   // ❗LOGIC SAME
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/home", { replace: true });
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      {/* OVERLAY */}
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"></div>

      {/* LOGIN MODAL */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="w-[380px] bg-white rounded-3xl shadow-2xl overflow-hidden">

          {/* TOP GREEN STRIP (BLINKIT FEEL) */}
          <div className="bg-green-600 px-6 py-5">
            <h1 className="text-xl font-extrabold text-white">
              HyperDrop
            </h1>
            <p className="text-sm text-green-100 mt-1">
              Groceries delivered in minutes
            </p>
          </div>

          {/* FORM AREA */}
          <div className="px-6 py-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              Login
            </h2>
            <p className="text-sm text-gray-500 mb-5">
              Enter your details to continue
            </p>

            {/* MOBILE */}
            <div className="mb-4">
              <label className="text-xs font-semibold text-gray-600 block mb-1">
                Mobile Number
              </label>
              <div className="flex items-center border border-gray-300 rounded-xl px-3 py-3 bg-gray-50 focus-within:ring-2 focus-within:ring-green-500">
                <span className="text-gray-400 text-sm mr-2">+91</span>
                <input
                  type="tel"
                  placeholder="10-digit number"
                  onChange={(e) => setEmail(e.target.value)} // ❗LOGIC SAME
                  className="flex-1 bg-transparent outline-none text-sm"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="mb-5">
              <label className="text-xs font-semibold text-gray-600 block mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3
                           bg-gray-50 outline-none text-sm
                           focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* LOGIN BUTTON */}
            <button
              onClick={handleLogin}
              className="w-full bg-green-600 text-white py-3 rounded-xl
                         font-semibold hover:bg-green-700 transition"
            >
              Continue
            </button>

            {/* OR */}
            <div className="flex items-center my-5 text-gray-300 text-xs">
              <div className="flex-grow h-px bg-gray-200"></div>
              <span className="px-3">OR</span>
              <div className="flex-grow h-px bg-gray-200"></div>
            </div>

            {/* GOOGLE */}
            <button
              onClick={() => {
                window.location.href =
                  "http://localhost:5000/api/auth/google";
              }}
              className="w-full flex items-center justify-center gap-3
                         border border-gray-300 rounded-xl py-3
                         text-sm font-medium hover:bg-gray-100 transition mb-4"
            >
              <img src={googleLogo} alt="Google" className="w-5 h-5" />
              Continue with Google
            </button>

            {/* SIGNUP */}
            <p className="text-xs text-center text-gray-500">
              New here?{" "}
              <Link
                to="/signup"
                className="text-green-600 font-semibold"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
