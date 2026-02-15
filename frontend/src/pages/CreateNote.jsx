import { useNavigate } from "react-router-dom";
import Audit from "../api/Audit";
import { useState } from "react";

const CreateNote = () => {
  const { createNote } = Audit();
  const navigate = useNavigate();
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      setLoading(true);
      const res = await createNote(formData);
      const body = await res.json();
      if(!res.ok){
        throw new Error(body?.message || "Something error")
      }
      navigate("/all-notes")
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Create New Note
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* image */}
          <div className="flex flex-col">
            <label htmlFor="image" className="text-sm text-gray-300 mb-2">
              Image
            </label>
            <input
              type="file"
              name="image"
              id="image"
              className="px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 cursor-pointer"
            />
          </div>

          {/* Title */}
          <div className="flex flex-col">
            <label htmlFor="title" className="text-sm text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter note title"
              className="px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col">
            <label htmlFor="content" className="text-sm text-gray-300 mb-2">
              Content
            </label>
            <textarea
              name="content"
              id="content"
              rows="5"
              placeholder="Write your note content..."
              className="px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 resize-none"
            ></textarea>
          </div>

          {/* Button */}
          <button
            type="submit"
            className={`w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition duration-300 shadow-lg hover:shadow-blue-500/30 ${loading ? "opacity-70 cursor-not-allowed" : ""}}`}
          >
            {loading ? "Creating Note..." : "Create Note"}
          </button>
          {error && <p className=" text-center text-red-300">❌ {error}</p>}
        </form>
      </div>
    </section>
  );
};

export default CreateNote;
