// src/pages/StartupDetail.js
import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../components/DarkModeContext";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import PropTypes from "prop-types";
import startups from "../data/startups";

function StartupDetail({ userRole }) {
  const { darkMode } = useContext(DarkModeContext);
  const [isOpen, setIsOpen] = useState(() => {
    const stored = localStorage.getItem("sidebarOpen");
    return stored ? JSON.parse(stored) : true;
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(isOpen));
  }, [isOpen]);

  const startup = startups.find((s) => s.id === parseInt(id, 10));
  if (!startup) {
    return <div className="p-8">Startup not found.</div>;
  }

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      } min-h-screen`}
    >
      <div className="flex">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} userRole={userRole} />
        <main className={`flex-1 p-8${isOpen ? " ml-64" : " ml-16"}`}>
          <Header userRole={userRole} />
          <button
            onClick={() => navigate(-1)}
            className="mb-4 text-blue-600 hover:underline"
          >
            &larr; Back to Listings
          </button>
          <h1 className="text-3xl font-bold mb-4">{startup.name}</h1>
          <p className="mb-2">
            <strong>Category:</strong> {startup.category}
          </p>
          <p className="mb-2">
            <strong>Founder:</strong> {startup.founder}
          </p>
          <p className="mb-2">
            <strong>Funding Stage:</strong> {startup.fundingStage}
          </p>
          <p className="mb-4">
            <strong>Description:</strong> {startup.description}
          </p>
          {/* Add more fields or graphics as needed */}
        </main>
      </div>
    </div>
  );
}

StartupDetail.propTypes = {
  userRole: PropTypes.string.isRequired,
};

export default StartupDetail;
