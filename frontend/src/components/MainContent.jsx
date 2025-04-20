import { useContext } from "react";
import StatsCard from "./StatsCard";
import Recommendations from "./Recommendations";
import ActivityFeed from "./ActivityFeed";
import Header from "./Header";
import PropTypes from "prop-types";
import { DarkModeContext } from "./DarkModeContext";

const MainContent = ({ userRole }) => {
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <main
      className={`p-6 pl-0 flex-1 ml-auto transition-colors duration-300 ease-in-out overflow-y-scroll min-h-screen
        ${isDarkMode ? "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-gray-100" 
                     : "bg-gradient-to-b from-white via-gray-100 to-gray-50 text-gray-900"}
      `}
    >
      <Header userRole={userRole} />

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        <StatsCard title="Active Applications" value="12" />
        <StatsCard title="New Matches" value="5" />
        <StatsCard title="Profile Views" value="34" />
      </div>

      {/* Role-Specific Panels */}
      <div className="mt-8 space-y-8">
        {userRole === "jobSeeker" && (
          <>
            <Recommendations type="jobs" />
            <ActivityFeed type="community" />
          </>
        )}
        {userRole === "recruiter" && (
          <>
            <Recommendations type="candidates" />
            <ActivityFeed type="recruitment" />
          </>
        )}
        {userRole === "investor" && (
          <>
            <Recommendations type="startups" />
            <ActivityFeed type="investment" />
          </>
        )}
      </div>
    </main>
  );
};

MainContent.propTypes = {
  userRole: PropTypes.string.isRequired,
};

export default MainContent;
