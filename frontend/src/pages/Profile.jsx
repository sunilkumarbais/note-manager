import { useEffect, useState } from "react";
import Audit from "../api/Audit";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState("");

  const { getProfile, logout } = Audit();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProfile();
        const body = await res.json();
        if (!res.ok) {
          throw new Error(body.message);
        }
        setUserData(body.user);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, []);

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  return (
    <section className="min-h-[calc(100vh-72px)] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      {!error ? (
        <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8 text-white">
        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-3xl font-bold shadow-lg">
            {userData?.userName?.charAt(1)?.toUpperCase() || "U"}
          </div>
        </div>

        {/* Name */}
        <h2 className="text-2xl font-bold text-center mb-2">
          {userData?.userName}
        </h2>

        {/* Email */}
        <p className="text-gray-300 text-center mb-6">{userData?.email}</p>

        {/* Info Box */}
        <div className="bg-white/5 rounded-lg p-4 space-y-3 text-sm mb-6">
          <div className="flex justify-between">
            <span className="text-gray-400">Username</span>
            <span>{userData?.userName}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Member Since</span>
            <span>{userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" }) : "Unknown"}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button 
          onClick={() => navigate(`/profile/update`)}
          className="flex-1 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-300 font-semibold shadow-lg hover:shadow-blue-500/30">
            Edit Profile
          </button>

          <button
            onClick={handleLogout}
            className="flex-1 py-3 rounded-lg border border-white/30 hover:bg-white/10 transition duration-300 font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
      ) : (
        <p className="text-center, text-red-300 text-2xl">{error}</p>
      )}
    </section>
  );
};

export default Profile;
