import { useState, useContext, useEffect } from "react";
import { DarkModeContext } from "../components/DarkModeContext";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import PropTypes from "prop-types";
import analyticsData from "../data/analytics"; // Assuming you have a data file for analytics
import HiringTrendsChart from "../components/Chart";

function HiringAnalytics({ userRole }) {
  const { darkMode } = useContext(DarkModeContext);
  const [isOpen, setIsOpen] = useState(() => {
    const storedValue = localStorage.getItem("sidebarOpen");
    return storedValue ? JSON.parse(storedValue) : true;
  });

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(isOpen));
  }, [isOpen]);

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      } min-h-screen`}
    >
      <div className="flex pl-4">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} userRole={userRole} />
        <main
          className={`flex-1 p-8 transition-all duration-300 min-h-[100vh] ${
            isOpen ? "ml-64" : "ml-16"
          }`}
        >
          <Header userRole={userRole} />
          <h1 className="text-3xl font-bold mb-6">Hiring Analytics</h1>

          {/* Analytics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {analyticsData.map((metric) => (
              <div
                key={metric.id}
                className="bg-white dark:bg-gray-800 shadow rounded p-6 border border-gray-200 dark:border-gray-700"
              >
                <h2 className="text-xl font-semibold mb-2">{metric.title}</h2>
                <p className="text-3xl font-bold mb-2">{metric.value}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>

          {/* Hiring Trends Chart Placeholder */}
          <div className="bg-white dark:bg-gray-800 shadow rounded p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold mb-4">Hiring Trends</h2>
            <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-gray-500">
                <HiringTrendsChart />
              </span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

HiringAnalytics.propTypes = {
  userRole: PropTypes.string.isRequired,
};

export default HiringAnalytics;
