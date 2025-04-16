import { useState, useContext, useEffect } from "react";
import { DarkModeContext } from "../components/DarkModeContext";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import trackerData from "../data/inverstorTracker";
import PropTypes from "prop-types";
import HiringTrendsChart from "../components/Chart";

function InvestorTracker({ userRole }) {
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
      <div className="flex">
        {/* Passed props here */}
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} userRole={userRole} />
        <main className={`flex-1 p-8 ${isOpen ? "ml-64" : "ml-16"}`}>
          <Header userRole={userRole} />
          <h1 className="text-3xl font-bold mb-6">Investor Tracker</h1>

          {/* Tracker Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {trackerData.map((metric) => (
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

          {/* Investor Trends Chart Placeholder */}
          <div className="bg-white dark:bg-gray-800 shadow rounded p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold mb-4">Investor Trends</h2>
            <div className="w-full h-64">
              <HiringTrendsChart darkMode={darkMode} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

InvestorTracker.propTypes = {
  userRole: PropTypes.string,
};

export default InvestorTracker;
