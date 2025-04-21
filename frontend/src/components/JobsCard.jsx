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
      className={`shadow rounded-lg p-4 hover:shadow-lg transition-shadow duration-200 
      ${
        isDarkMode
          ? "bg-gray-800 text-white border border-gray-700"
          : "bg-white text-gray-800 border border-gray-300"
      } 
      ${className}`}
    >
      <h2
        className={`text-xl font-bold ${
          isDarkMode ? "text-gray-200" : "text-gray-800"
        }`}
      >
        {job.title}
      </h2>
      <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
        {job.company}
      </p>
      <p className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
        {capitalizeFirstLetter(job.location)}
      </p>
      <div className="mt-2 flex justify-between items-center">
        <span
          className={`font-semibold ${
            isDarkMode ? "text-blue-400" : "text-blue-600"
          }`}
        >
          $ {enumToSalary(job.salary)}
        </span>
        <span
          className={`text-sm ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {enumToString(job.type)}
        </span>
      </div>
      <button
        type="button"
        onClick={() => {
          navigate(`/jobs/${job.id}`);
        }}
        className={`mt-4 w-full py-2 rounded-full transition-colors cursor-pointer 
        ${
          isDarkMode
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
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
