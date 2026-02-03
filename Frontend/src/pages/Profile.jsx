import { useState } from "react";
import axios from "axios";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");

  const saveProfile = async () => {
    const res = await axios.put("http://localhost:5000/api/users/update", {
      userId: user._id,
      name,
      email,
    });

    localStorage.setItem("user", JSON.stringify(res.data.user));
    alert("Profile Updated ✅");
  };

  return (
    <div className="min-h-screen bg-[#f7fce9] px-4 py-6">
      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-xl font-bold mb-4">My Profile</h1>

        <label className="text-sm font-semibold">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-3"
        />

        <label className="text-sm font-semibold">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-4"
        />

        <button
          onClick={saveProfile}
          className="w-full bg-green-700 text-white py-2 rounded"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Profile;
