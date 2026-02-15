import { useEffect, useState } from "react";
import Audit from "../api/Audit";
import { Link } from "react-router-dom";
import Loading from "../components/loader/Loading";

const AllNote = () => {
  const { getAllNote } = Audit();
  const [notes, setNotes] = useState([]);
  const [loading, setLoding] = useState(false);
  const [error, setError] = useState(false);
  const [errMessage, setErrMessage] = useState(null);

  useEffect(() => {
    setLoding(true);
    async function fetchNote() {
      try {
        const res = await getAllNote();
        const body = await res.json();

        if (!res.ok) {
          throw new Error(body?.message || "Something Error");
        }

        setNotes(body?.notes);
      } catch (err) {
        setError(true);
        setErrMessage(err.message);
      } finally {
        setLoding(false);
      }
    }

    fetchNote();
  }, []);

  return (
    <section className="min-h-[calc(100vh-72px)] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-10 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          All Notes
        </h2>

        {loading ? (
          <Loading />
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {error ? (
              <div>{errMessage}</div>
            ) : (
              notes.map((note) => (
                <Link
                  to={`/note/${note._id}`}
                  key={note._id}
                  className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-blue-500/20 transition duration-300 hover:-translate-y-2 cursor-pointer"
                >
                  {/* Image */}
                  <img
                    src={note?.image}
                    alt="note"
                    className="w-full h-40 object-cover"
                  />

                  {/* Content */}
                  <div className="p-5 text-white">
                    <h3 className="text-lg font-semibold mb-2 truncate">
                      {note.title}
                    </h3>

                    <p className="text-gray-300 text-sm line-clamp-3">
                      {note.content}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllNote;
