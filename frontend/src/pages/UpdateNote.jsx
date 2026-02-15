import { useNavigate, useParams } from "react-router-dom";
import Audit from "../api/Audit";
import { useEffect, useState } from "react";

const UpdateNote = () => {
  const {id} = useParams();
  const navigate = useNavigate()
  const {updateNote, getEachNote} = Audit()
  const [note, setNote] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchNote() {
      const res = await getEachNote(id);
      const body = await res.json();
      setNote(body.note);
    }

    fetchNote();
  },[])

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    try{
      setLoading(true);
      const res = await updateNote(id, formData);
      const body = await res.json();
      if(!res.ok){
        throw new Error(body.message || "Something Error")
      }
      navigate("/all-notes");
    }catch(err){
      console.error(err)
    }finally{
      setLoading(false);
    }
  }

  return (
    <section className="min-h-[calc(100vh-72px)] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Update Note
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>

          {/* title */}
          <div className="flex flex-col">
            <label htmlFor="title" className="text-sm text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              defaultValue={note?.title}
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
              defaultValue={note?.content}
              rows="5"
              placeholder="Update your note..."
              className="px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 resize-none"
            ></textarea>
          </div>

          {/* Image */}
          <div className="flex flex-col">
            <label htmlFor="image" className="text-sm text-gray-300 mb-2">
              Image
            </label>
            <input
              type="file"
              name="image"
              defaultValue={note?.image}
              id="image"
              className="px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 cursor-pointer"
            />
          </div>
          <img src={note?.image} alt="Note" className=" h-20 w-30 rounded-lg mt-2" />

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition duration-300 shadow-lg hover:shadow-blue-500/30 ${loading ? "cursor-not-allowed opacity-50" : ""}`}
            >
              {loading ? "Updating..." : "Update Note"}
            </button>

            <button
              onClick={() => navigate(-1)}
              type="button"
              className="flex-1 py-3 rounded-lg border border-white/30 hover:bg-white/10 text-white font-semibold transition duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateNote;
