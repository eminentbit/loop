import PropTypes from "prop-types";
import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";

const activityData = {
  community: [
    { id: 1, activity: 'Joined the "Web Development" group.' },
    { id: 2, activity: "Commented on a mentorship post." },
    { id: 3, activity: "Shared a new job opportunity." },
  ],
  recruitment: [
    { id: 1, activity: "New candidate application received." },
    { id: 2, activity: "Scheduled an interview with Alice Johnson." },
    { id: 3, activity: "Job posting updated: Frontend Developer." },
  ],
};

const ActivityFeed = ({ type }) => {
  const feed = activityData[type] || [];
  // eslint-disable-next-line no-unused-vars
  const { isDarkMode, setDarkMode } = useContext(DarkModeContext);

  return (
    <div
      className={`shadow rounded-lg p-4 mt-6 transition-colors ${
        isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <h2
        className={`text-xl font-semibold mb-4 transition-colors ${
          isDarkMode ? "text-gray-200" : "text-gray-900"
        }`}
      >
        Recent Activity
      </h2>
      <ul>
        {feed.map((item) => (
          <li
            key={item.id}
            className={`border-b py-2 transition-colors ${
              isDarkMode ? "dark:border-gray-700" : "border-gray-200"
            }`}
          >
            <p
              className={`text-gray-700 transition-colors ${
                isDarkMode ? "dark:text-gray-200" : "text-gray-400"
              }`}
            >
              {item.activity}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

ActivityFeed.propTypes = {
  type: PropTypes.string,
};

export default ActivityFeed;
