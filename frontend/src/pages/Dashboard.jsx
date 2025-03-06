// import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { DarkModeContext } from "../components/DarkModeContext";
// import Footer from "../components/Footer";

const Dashboard = ({ userRole }) => {
  // eslint-disable-next-line no-unused-vars
  const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="min-h-screen flex w-full">
      <Sidebar userRole={userRole} isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className={`flex-1 pl-10 ${isOpen ? "ml-64" : "ml-16"}  ${
          isDarkMode ? "dark:bg-gray-800" : "bg-white"
        }`}
      >
        {" "}
        <MainContent userRole={userRole} />
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  userRole: PropTypes.string.isRequired,
};

export default Dashboard;
