import { useContext } from "react";
import PropTypes from "prop-types";
import { DarkModeContext } from "../context/DarkModeContext";

const StatsCard = ({ title, value }) => {
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <div
      className={`shadow rounded-lg p-4 transition-colors ${
        isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-700"
      }`}
    >
      <h3
        className={`text-lg font-semibold transition-colors ${
          isDarkMode ? "text-gray-300" : "text-gray-700"
        }`}
      >
        {title}
      </h3>
      <p
        className={`mt-2 text-3xl font-bold transition-colors ${
          isDarkMode ? "text-blue-400" : "text-blue-500"
        }`}
      >
        {value}
      </p>
    </div>
  );
};
StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default StatsCard;
