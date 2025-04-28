import PropTypes from "prop-types";
import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";

const recommendationsData = {
  jobs: [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Tech Corp",
      location: "Remote",
    },
    {
      id: 2,
      title: "UI/UX Designer",
      company: "Design Hub",
      location: "On-site",
    },
    {
      id: 3,
      title: "Backend Developer",
      company: "Innovate Inc.",
      location: "Hybrid",
    },
  ],
  candidates: [
    { id: 1, name: "Alice Johnson", skills: "React, Node.js" },
    { id: 2, name: "Bob Smith", skills: "Python, Django" },
    { id: 3, name: "Carol Lee", skills: "Java, Spring Boot" },
  ],
};

const Recommendations = ({ type }) => {
  const data = recommendationsData[type] || [];
  // eslint-disable-next-line no-unused-vars
  const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);

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
        {type === "jobs" ? "Recommended Jobs" : "Top Candidates"}
      </h2>
      <ul>
        {data.map((item) => (
          <li
            key={item.id}
            className={`border-b py-2 transition-colors ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            {type === "jobs" ? (
              <div>
                <h3
                  className={`font-medium transition-colors ${
                    isDarkMode ? "text-gray-300" : "text-gray-800"
                  }`}
                >
                  {item.title}
                </h3>
                <p
                  className={`text-sm transition-colors ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {item.company} - {item.location}
                </p>
              </div>
            ) : (
              <div>
                <h3
                  className={`font-medium transition-colors ${
                    isDarkMode ? "text-gray-300" : "text-gray-800"
                  }`}
                >
                  {item.name}
                </h3>
                <p
                  className={`text-sm transition-colors ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {item.skills}
                </p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

Recommendations.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Recommendations;
