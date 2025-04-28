import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { DarkModeContext } from "../context/DarkModeContext";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import PropTypes from "prop-types";
import candidates from "../data/candidates";

const ContactCandidate = ({ userRole }) => {
  const { darkMode } = useContext(DarkModeContext);
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const val = localStorage.getItem("sidebarOpen");
    return val ? JSON.parse(val) : true;
  });
  const [submitted, setSubmitted] = useState(false);
  const { id } = useParams();
  const candidate = candidates.find((c) => String(c.id) === id);

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
  });

  // Auto-hide success and show back link
  useEffect(() => {
    let timer;
    if (submitted) {
      timer = setTimeout(() => {
        // after showing success, keep link visible
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [submitted]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: integrate actual submission logic
    setSubmitted(true);
  };

  return (
    <div
      className={`min-h-screen flex transition-colors duration-300 ease-in-out ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        userRole={userRole}
      />
      <div className="flex-1 flex flex-col">
        <Header />
        <main
          className={`flex-1 flex items-center justify-center p-6 transition-colors duration-300 ${
            darkMode ? "bg-gray-900" : "bg-gray-50"
          }`}
        >
          <div
            className={`w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl border transition-colors duration-300 ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            {!candidate ? (
              <div className="text-center py-10">
                <p className="text-xl font-medium mb-4">Candidate not found.</p>
                <Link
                  to="/candidates"
                  className="text-blue-600 hover:underline"
                >
                  &larr; Back to Candidate Pool
                </Link>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-center mb-6">
                  Contact {candidate.name}
                </h2>
                {submitted ? (
                  <div className="text-center space-y-4">
                    <div className="inline-block px-6 py-4 bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg">
                      <p className="font-medium text-green-800 dark:text-green-100">
                        Your message has been sent successfully!
                      </p>
                    </div>
                    <Link
                      to={`/candidates/${candidate.id}`}
                      className="inline-block mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition"
                    >
                      Back to Profile
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block mb-1 font-medium">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your name"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 font-medium">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 font-medium">Message</label>
                      <textarea
                        required
                        rows="6"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={`Write your message to ${candidate.name}`}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

ContactCandidate.propTypes = {
  userRole: PropTypes.string.isRequired,
};

export default ContactCandidate;
