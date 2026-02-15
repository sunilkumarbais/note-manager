import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Audit from "../api/Audit";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const { updateProfile, getProfile } = Audit();
  const [user, setUser] = useState();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await getProfile();
        const body = await res.json();
        if (!res.ok) {
          throw new Error(body?.message || "Something error");
        }
        setUser(body?.user);
      } catch (err) {
        console.error(err.message);
      }
    }

    fetchUser();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const value = Object.fromEntries(data.entries());

    try {
      const res = await updateProfile(value);
      const body = await res.json();
      if (!res.ok) {
        throw new Error(body?.message || "Something error");
      }
      navigate("/profile");
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <section className="min-h-[calc(100vh-72px)] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 px-4 flex items-center justify-center">
      <div className="w-full max-w-xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-10 text-white">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
        >
          ← Back
        </button>

        <h2 className="text-3xl font-bold mb-8 text-center">Update Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">Username</label>
            <input
              type="text"
              name="userName"
              defaultValue={user?.userName}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter username"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              defaultValue={user?.email}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold shadow-lg hover:shadow-blue-500/40"
            >
              Save Changes
            </button>

            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="flex-1 py-3 rounded-xl bg-gray-600 hover:bg-gray-700 transition font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateProfile;
