import React, { useState } from "react";
import signupVideo from "../assets/login.mp4";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
  try {
    const res = await API.post("/auth/signup", {
      name,
      mobile,
      email,
      password,
    });

    localStorage.setItem("token", res.data.token);
    navigate("/dashboard");
  } catch (err) {
    alert(err.response?.data?.message || "Signup failed");
  }
};


  return (
    <div className="w-screen h-screen bg-[#eaf1ff] flex items-center justify-center">
      <div className="w-[1100px] h-[600px] bg-white rounded-2xl shadow-xl flex overflow-hidden">

        {/* LEFT SIDE */}
        <div className="w-1/2 bg-gradient-to-br from-[#e0ecff] to-[#f5f9ff] overflow-hidden">
          <video autoPlay loop muted playsInline preload="auto" className="w-full h-full object-cover">
            <source src={signupVideo} type="video/mp4" />
          </video>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-1/2 px-16 py-10 flex flex-col">

          <h1 className="text-2xl font-bold text-blue-600 mb-1">HyperDrop</h1>
          <h2 className="text-lg font-semibold mb-1">Create Account</h2>
          <p className="text-gray-500 mb-4">Join HyperDrop in seconds.</p>

          <div className="flex-1 overflow-y-auto pr-2">

            <label className="text-sm mb-1 block">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label className="text-sm mb-1 block">Mobile Number</label>
            <input
              type="tel"
              placeholder="Enter your mobile number"
              onChange={(e) => setMobile(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label className="text-sm mb-1 block">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label className="text-sm mb-1 block">Password</label>
            <input
              type="password"
              placeholder="Create password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleSignup}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition mb-4"
          >
            Create Account
          </button>
{/* OR Divider */}
<div className="flex items-center my-4 text-gray-400 text-sm">
  <div className="flex-grow h-px bg-gray-300"></div>
  <span className="px-3">OR</span>
  <div className="flex-grow h-px bg-gray-300"></div>
</div>

{/* Google Login */}
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
    src="https://developers.google.com/identity/images/g-logo.png"
    alt="Google"
    className="w-5 h-5"
  />
  Continue with Google
</button>



          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Sign In
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Signup;
