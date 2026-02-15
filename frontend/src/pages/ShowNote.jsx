import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Audit from "../api/Audit";
import Loading from "../components/loader/Loading";

const ShowNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getEachNote, adminUser, deleteNote } = Audit();
  const [note, setNote] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        const res = await getEachNote(id);
        const body = await res.json();
        if (!res.ok) throw new Error(body?.message);
        setNote(body?.note);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await adminUser();
        const body = await res.json();
        if (!res.ok) throw new Error(body?.message);
        setIsAdmin(body?.isAdmin);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchUser();
  }, []);

  const handleDelete = async () => {
    try {
      const res = await deleteNote(id);
      const body = await res.json();
      if (!res.ok) throw new Error(body?.message);
      navigate("/all-notes");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <section className=" bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 px-4 text-white">
      {loading ? (
        <Loading />
      ) : (
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="mb-8 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
          >
            ← Back
          </button>

          {/* Image Section */}
          {
            <div className="relative mb-8">
              <img
                src={note?.image}
                alt="Note"
                className="w-full h-80 object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-3xl"></div>
              <h1 className="absolute bottom-6 left-6 text-4xl font-bold">
                {note?.title}
              </h1>
            </div>
          }

          {/* Content Card */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">
            {/* Author */}
            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
              <div>
                <p className="text-lg font-semibold">
                  {note?.author?.userName}
                </p>
                <p className="text-sm text-gray-400">{note?.author?.email}</p>
              </div>
              <div className="text-xs text-gray-400 text-right">
                <p>Created: {new Date(note?.createdAt).toLocaleDateString()}</p>
                <p>Updated: {new Date(note?.updatedAt).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Content */}
            <div className="text-gray-200 leading-relaxed whitespace-pre-wrap">
              {note?.content}
            </div>

            {/* Admin Actions */}
            {isAdmin && (
              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => navigate(`/update-note/${note._id}`)}
                  className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold shadow-lg hover:shadow-blue-500/40"
                >
                  Edit Note
                </button>

                <button
                  onClick={handleDelete}
                  className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 transition font-semibold shadow-lg hover:shadow-red-500/40"
                >
                  Delete Note
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default ShowNote;
