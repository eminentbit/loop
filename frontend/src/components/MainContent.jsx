import { useContext } from "react";
import StatsCard from "./StatsCard";
import Recommendations from "./Recommendations";
import ActivityFeed from "./ActivityFeed";
import Header from "./Header";
import PropTypes from "prop-types";
import { DarkModeContext } from "./DarkModeContext";

const MainContent = ({ userRole }) => {
  // eslint-disable-next-line no-unused-vars
  const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);

  return (
    <main
      className={`p-6 pl-0 flex-1 ml-auto transition-colors overflow-y-scroll ${
        isDarkMode ? "bg-gray-800 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Header />

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title="Active Applications" value="12" />
        <StatsCard title="New Matches" value="5" />
        <StatsCard title="Profile Views" value="34" />
      </div>

      {/* Role-Specific Panels */}
      {userRole === "jobSeeker" ? (
        <>
          <Recommendations type="jobs" />
          <ActivityFeed type="community" />
        </>
      ) : userRole === "recruiter" ? (
        <>
          <Recommendations type="candidates" />
          <ActivityFeed type="recruitment" />
        </>
      ) : userRole === "investor" ? (
        <>
          <Recommendations type="startups" />
          <ActivityFeed type="investment" />
        </>
      ) : null}
    </main>
  );
};

MainContent.propTypes = {
  userRole: PropTypes.string.isRequired,
};

export default MainContent;
