import PropTypes from "prop-types";
import { ExternalLinkIcon } from "lucide-react";
import { useContext } from "react";
import { DarkModeContext } from "./DarkModeContext";
import { useNavigate } from "react-router-dom";

const StartupCard = ({ startup, className = "" }) => {
  const { isDarkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();

  return (
    <div
      className={`flex flex-col justify-between
        w-full max-w-sm
        p-4 sm:p-6 rounded-2xl shadow-md
        ${isDarkMode ? "bg-gray-800 text-white border border-gray-700" : "bg-white text-gray-800 border border-gray-300"}
        hover:shadow-lg hover:-translate-y-1
        transition-all duration-300
        ${className}`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center">
        {startup.logo && (
          <img
            src={startup.logo}
            alt={`${startup.name} logo`}
            className="h-12 w-12 rounded-md object-contain mb-3 sm:mb-0 sm:mr-4 bg-gray-100 p-1"
          />
        )}
        <div>
          <h2 className={`text-xl font-semibold ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
            {startup.name}
          </h2>
          {startup.industry && (
            <span className={`inline-block mt-1 px-2 py-0.5 text-xs font-medium ${isDarkMode ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-800"} rounded-full`}>
              {startup.industry}
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      {startup.description && (
        <p className={`mt-4 text-sm line-clamp-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          {startup.description}
        </p>
      )}

      {/* Meta Badges */}
      <div className="flex flex-wrap gap-2 mt-4 text-xs">
        {startup.fundingStage && (
          <span className={`px-3 py-1 font-medium ${isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"} rounded-full`}>
            Stage: {startup.fundingStage}
          </span>
        )}
        {startup.teamSize && (
          <span className={`px-3 py-1 font-medium ${isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"} rounded-full`}>
            Team: {startup.teamSize}
          </span>
        )}
        {startup.location && (
          <span className={`px-3 py-1 font-medium ${isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"} rounded-full`}>
            📍 {startup.location}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-3 mt-6">
        <button
          className={`w-full sm:w-auto flex items-center justify-center px-4 py-2
            ${isDarkMode ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-blue-600 text-white hover:bg-blue-700"} 
            text-sm font-semibold rounded-full
            transition-colors duration-200`}
          onClick={() => navigate(`/startup-detial/${startup.id}`)}
        >
          View Details
          <ExternalLinkIcon size={16} className="ml-2" />
        </button>
        {startup.website && (
          <a
            href={startup.website}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full sm:w-auto flex items-center justify-center text-sm 
              ${isDarkMode ? "text-blue-400 hover:underline" : "text-blue-600 hover:underline"}`}
          >
            Visit Website
            <ExternalLinkIcon size={14} className="ml-1" />
          </a>
        )}
      </div>
    </div>
  );
};

StartupCard.propTypes = {
  startup: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    industry: PropTypes.string,
    description: PropTypes.string,
    fundingStage: PropTypes.string,
    teamSize: PropTypes.string,
    location: PropTypes.string,
    logo: PropTypes.string,
    website: PropTypes.string,
  }).isRequired,
  className: PropTypes.string,
};

export default StartupCard;
