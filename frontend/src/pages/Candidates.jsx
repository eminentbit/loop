import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { DarkModeContext } from "../components/DarkModeContext";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import PropTypes from "prop-types";
import candidates from "../data/candidates";

const Candidates = ({ userRole }) => {
  const { darkMode } = useContext(DarkModeContext);
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const val = localStorage.getItem("sidebarOpen");
    return val ? JSON.parse(val) : true;
  });

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(sidebarOpen));
  }, [sidebarOpen]);
  useEffect(() => {
    const root = document.documentElement;
    if (localStorage.theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []);

  const { id } = useParams();
  const candidate = candidates.find((c) => String(c.id) === id);

  return (
    <div className={`min-h-screen transition-colors duration-300 ease-in-out flex ${
      darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
    }`}>      
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} userRole={userRole} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className={`flex-1 p-8 transition-colors duration-300 ${
          darkMode ? "bg-gray-900" : "bg-gray-100"
        }`}>          
          {!candidate ? (
            <div className="text-center py-20">
              <p className="text-xl mb-4">Candidate not found.</p>
              <Link to="/candidates" className="text-blue-600 hover:underline">
                &larr; Back to Candidate 
              </Link>
            </div>
          ) : (
            <div className={`max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border transition-colors duration-300 ${
                darkMode ? "border-gray-700" : "border-gray-200"
              }`}>
              <Link to="/candidates" className="inline-block mb-6 text-sm font-medium text-blue-600 hover:underline">
                &larr; Back to Candidates
              </Link>
              <div className="flex flex-col sm:flex-row items-center mb-8">
                <img
                  src={candidate.profilePicture}
                  alt={candidate.name}
                  onError={(e) => (e.target.src = "https://via.placeholder.com/200")}
                  className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 mb-4 sm:mb-0 sm:mr-6"
                />
                <div>
                  <h1 className="text-3xl font-bold mb-1">{candidate.name}</h1>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">{candidate.role}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Experience:</strong> {candidate.experience}
                  </p>
                </div>
              </div>
              {candidate.bio && (
                <section className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">About</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {candidate.bio}
                  </p>
                </section>
              )}
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.split(",").map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-100 rounded-full text-sm font-medium"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </section>
              <div className="text-center">
                <Link
                  to={`/candidates/${candidate.id}/contact`}
                  className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-200"
                >
                  Contact Candidate
                </Link>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

Candidates.propTypes = {
  userRole: PropTypes.string.isRequired,
};

export default Candidates;
