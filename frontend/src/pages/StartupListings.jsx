// src/pages/StartupListing.jsx
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";               // ← import Link
import { DarkModeContext } from "../components/DarkModeContext";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import PropTypes from "prop-types";
import startups from "../data/startups";

function StartupListing({ userRole }) {
  const { darkMode } = useContext(DarkModeContext);

  // Sidebar control & role
  const [isOpen, setIsOpen] = useState(() => {
    const storedValue = localStorage.getItem("sidebarOpen");
    return storedValue ? JSON.parse(storedValue) : true;
  });

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(isOpen));
  }, [isOpen]);

  return (
    <div
      className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen`}
    >
      <div className="flex">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} userRole={userRole} />
        <main className={`flex-1 p-8${isOpen ? " ml-64" : " ml-16"}`}>
          <h1 className="text-3xl font-bold mb-6">Startup Listings</h1>
          <Header userRole={userRole} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {startups.map((startup) => (
              <div
                key={startup.id}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
              >
                <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-1">
                  {startup.name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <strong>Category:</strong> {startup.category}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <strong>Founder:</strong> {startup.founder}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <strong>Funding Stage:</strong> {startup.fundingStage}
                </p>
                
                {/* Use <Link> to navigate to /details/:id */}
                <Link
                  to={`/startup-detail/:id`}
                  className="inline-block text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

StartupListing.propTypes = {
  userRole: PropTypes.string.isRequired,
};

export default StartupListing;  
