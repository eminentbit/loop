import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { DarkModeContext } from "@/context/DarkModeContext";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import PropTypes from "prop-types";
import candidates from "../data/candidates";

function CandidatePool({ userRole }) {
  const { darkMode } = useContext(DarkModeContext);
  const [isOpen, setIsOpen] = useState(() => {
    const stored = localStorage.getItem("sidebarOpen");
    return stored ? JSON.parse(stored) : true;
  });

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(isOpen));
  }, [isOpen]);
  useEffect(() => {
    const root = document.documentElement;
    if (localStorage.theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ease-in-out
      ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}
      ${isOpen ? "ml-64" : "ml-16"}`}
    >
      <Header />
      <div className="flex">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} userRole={userRole} />

        <main
          className={`flex-1 px-6 py-8 transition-colors duration-300 ease-in-out
          ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}
        >
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-6">Candidate Pool</h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Search candidates..."
                className={`w-full px-4 py-2 rounded-md shadow-sm transition focus:ring-2 focus:ring-blue-500 focus:outline-none border
                  ${
                    darkMode
                      ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {candidates.map((c) => (
              <div
                key={c.id}
                className={`rounded-2xl p-6 transition-shadow duration-300 border hover:shadow-xl
                  ${
                    darkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-200"
                  }`}
              >
                <div className="flex items-center mb-4">
                  <img
                    src={c.profilePicture}
                    alt={c.name}
                    onError={(e) =>
                      (e.target.src = "https://via.placeholder.com/150")
                    }
                    className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-blue-500"
                  />
                  <div>
                    <h2
                      className={`text-xl font-semibold leading-snug
                      ${darkMode ? "text-blue-400" : "text-blue-700"}`}
                    >
                      {c.name}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {c.role}
                    </p>
                  </div>
                </div>

                <p className="text-sm mb-2 text-gray-700 dark:text-gray-300">
                  <strong>Experience:</strong> {c.experience}
                </p>
                <p className="text-sm mb-4 text-gray-700 dark:text-gray-300">
                  <strong>Skills:</strong> {c.skills}
                </p>

                <Link
                  to={`/candidates/${c.id}`}
                  className="block text-center w-full py-2 rounded-md text-sm font-medium transition
                    bg-blue-600 hover:bg-blue-700 text-white"
                >
                  View Profile
                </Link>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

CandidatePool.propTypes = {
  userRole: PropTypes.string.isRequired,
};

export default CandidatePool;
