import PropTypes from "prop-types";
import { useContext } from "react";
import { DarkModeContext } from "./DarkModeContext";
import { useNavigate } from "react-router-dom";
import { capitalizeFirstLetter } from "src/utils/Capitalize";
import { enumToSalary, enumToString } from "src/utils/EnumToString";

const JobCard = ({ job, className = "" }) => {
  const { isDarkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();

  return (
    <div
      className={`shadow-xl rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 
      ${isDarkMode ? "bg-gray-800 text-white border border-gray-700" : "bg-white text-gray-800 border border-gray-300"}
      ${className}`}
    >
      <h2
        className={`text-3xl font-bold mb-2 leading-tight ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}
      >
        {job.title}
      </h2>
      <p className={`text-lg font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-2`}>
        {job.company}
      </p>
<<<<<<< HEAD
      <p className={`text-md ${isDarkMode ? "text-gray-400" : "text-gray-500"} mb-4`}>
        {job.location}
=======
      <p className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
        {capitalizeFirstLetter(job.location)}
>>>>>>> 51f6f19da1aac22a6b58ee402e833e2a70d4ac28
      </p>
      <div className="flex justify-between items-center">
        <span
          className={`font-semibold text-xl ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}
        >
          $ {enumToSalary(job.salary)}
        </span>
        <span
          className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
        >
          {enumToString(job.type)}
        </span>
      </div>
      <button
        type="button"
        onClick={() => navigate(`/jobs/${job.id}`)}
        className={`mt-6 w-full py-4 rounded-full text-xl font-semibold transition-all duration-200 cursor-pointer 
        ${isDarkMode ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-blue-600 text-white hover:bg-blue-700"}`}
      >
        View Details
      </button>
    </div>
  );
};

JobCard.propTypes = {
  job: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default JobCard;
