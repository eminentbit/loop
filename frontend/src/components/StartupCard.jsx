import "react";
import PropTypes from "prop-types";

const StartupCard = ({ startup, className }) => {
  return (
    <div className={`p-8 rounded-lg shadow-md transition-colors ${className}`}>
      {/* Optional Logo */}
      {startup.logo && (
        <div className="mb-4">
          <img
            src={startup.logo}
            alt={`${startup.name} logo`}
            className="h-16 w-16 object-contain"
          />
        </div>
      )}
      {/* Startup Name */}
      <h2 className="text-xl font-bold mb-2">{startup.name}</h2>
      {/* Startup Industry */}
      {startup.industry && (
        <p className="text-sm text-gray-600 mb-2">{startup.industry}</p>
      )}
      {/* Startup Description */}
      {startup.description && (
        <p className="text-sm mb-2">{startup.description}</p>
      )}
      {/* Funding Stage */}
      {startup.fundingStage && (
        <p className="text-sm font-semibold mb-4">
          Funding Stage: {startup.fundingStage}
        </p>
      )}
      {/* View Details Button */}
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-400 transition-colors"
      >
        View Details
      </button>
    </div>
  );
};

StartupCard.propTypes = {
  startup: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    industry: PropTypes.string,
    description: PropTypes.string,
    fundingStage: PropTypes.string,
    logo: PropTypes.string,
  }).isRequired,
  className: PropTypes.string,
};

export default StartupCard;
