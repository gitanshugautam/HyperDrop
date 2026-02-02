import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f7fce9] px-4 py-6">
      <div className="max-w-3xl mx-auto">

        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-sm font-semibold text-green-700"
        >
          ← Back
        </button>

        <div className="bg-white rounded-2xl p-6 shadow">
          <h1 className="text-2xl font-bold text-green-800 mb-2">
            My Profile
          </h1>

          <p className="text-gray-600 mb-4">
            Profile details will appear here.
          </p>

          <div className="space-y-2 text-sm">
            <p><b>Name:</b> Rishi</p>
            <p><b>Email:</b> rishi@email.com</p>
            <p><b>Phone:</b> Not added</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
