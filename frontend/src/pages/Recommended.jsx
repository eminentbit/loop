// JobsPage.jsx
import { useState, useEffect, useContext } from "react";
import JobCard from "../components/JobsCard";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import jobs from "../data/recommended";

import PropTypes from "prop-types";
import { DarkModeContext } from "../components/DarkModeContext";

const RecomendedPage = ({ className = "" }) => {
  const { isDarkMode } = useContext(DarkModeContext);
  const [isOpen, setIsOpen] = useState(true);

  console.log("isDarkMode", isDarkMode);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/recommended");
        const data = await response.json();
        console.log("API response", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className={`${
          isOpen ? "ml-64" : "ml-16"
        } shadow rounded-lg p-4 hover:shadow-lg transition-shadow duration-200 
      ${
        isDarkMode
          ? "bg-gray-800 text-white border border-gray-700"
          : "bg-white text-gray-800 border border-gray-300"
      } 
      ${className}`}
      >
        <Header />
        {/* Grid container wrapping the job cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} className="mb-4" />
          ))}
        </div>
      </div>
    </div>
  );
};

RecomendedPage.propTypes = {
  job: PropTypes.object,
  className: PropTypes.string,
};

export default RecomendedPage;
//https://www.linkedin.com/help/linkedin/answer/a508610
