// import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/MainContent";
import PropTypes from "prop-types";
import { useContext, useState, useEffect } from "react";
import { DarkModeContext } from "../components/DarkModeContext";
// import Footer from "../components/Footer";

const DashboardPage = ({ userRole }) => {
  const { isDarkMode } = useContext(DarkModeContext);
  const [isOpen, setIsOpen] = useState(() => {
    const storedValue = localStorage.getItem("sidebarOpen");
    return storedValue ? JSON.parse(storedValue) : true;
  });

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(isOpen));
  }, [isOpen]);

  return (
    <div className="min-h-screen flex w-full">
      <Sidebar userRole={userRole} isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className={`flex-1 ${isOpen ? "ml-64" : "ml-16"}  ${
          isDarkMode ? "dark:bg-gray-800" : "bg-white"
        }`}
      >
        {" "}
        <Dashboard userRole={userRole} />
      </div>
    </div>
  );
};


Dashboard.propTypes = {
  userRole: PropTypes.string.isRequired,
};

DashboardPage.propTypes = {
  userRole: PropTypes.string.isRequired,
};

export default DashboardPage;
