import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <main  className="min-h-[calc(100vh-72px)] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-6">
      <div className="max-w-4xl text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Organize Your Thoughts <br />
          <span className="text-blue-500">With Note App</span>
        </h1>

        <p className="text-gray-300 text-lg md:text-xl mb-10">
          Create, manage, and access your notes anytime. Simple. Fast. Secure.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/create-note"
            className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-300 shadow-lg hover:shadow-blue-500/30 font-semibold"
          >
            Create Note
          </Link>

          <Link
            to="/all-notes"
            className="px-8 py-3 rounded-lg border border-white/30 hover:bg-white/10 transition duration-300 font-semibold"
          >
            View Notes
          </Link>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
