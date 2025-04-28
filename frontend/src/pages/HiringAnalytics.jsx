import { useState, useContext, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa";
import { DarkModeContext } from "../context/DarkModeContext";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import HiringTrendsChart from "../components/Chart";
import analyticsData from "../data/analytics";

const HiringAnalytics = ({ userRole }) => {
  const { darkMode } = useContext(DarkModeContext);
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const stored = localStorage.getItem("sidebarOpen");
    return stored ? JSON.parse(stored) : true;
  });
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  // Sync sidebar state
  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(sidebarOpen));
  }, [sidebarOpen]);

  // Toggle HTML <html> dark class for Tailwind
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange((prev) => ({ ...prev, [name]: value }));
  };

  const filteredData = useMemo(
    () =>
      analyticsData.filter((item) => {
        if (!dateRange.start || !dateRange.end) return true;
        const dt = new Date(item.date);
        return dt >= new Date(dateRange.start) && dt <= new Date(dateRange.end);
      }),
    [dateRange]
  );

  const downloadReport = () => {
    alert("Report download functionality coming soon!");
  };

  return (
    <div className="min-h-screen flex bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        userRole={userRole}
      />
      <div className="flex-1 flex flex-col">
        <Header userRole={userRole} />
        <main
          className={`flex-1 p-6 lg:p-8 transition-all duration-300 ${
            sidebarOpen ? "ml-64" : "ml-16"
          }`}
        >
          {/* Header & Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
            <h1 className="text-3xl font-extrabold">Hiring Analytics</h1>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-4 sm:mt-0">
              <input
                type="date"
                name="start"
                value={dateRange.start}
                onChange={handleDateChange}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="date"
                name="end"
                value={dateRange.end}
                onChange={handleDateChange}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <button
                onClick={downloadReport}
                className="inline-flex items-center px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition duration-200"
              >
                <FaDownload className="mr-2" /> Download Report
              </button>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {filteredData.map((metric) => (
              <motion.div
                key={metric.id}
                className="rounded-2xl p-6 border shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: metric.id * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <h2 className="text-xl font-semibold mb-2">{metric.title}</h2>
                <p className="text-4xl font-bold mb-2">{metric.value}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {metric.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Hiring Trends Chart */}
          <motion.div
            className="rounded-2xl p-6 border shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Hiring Trends</h2>
            <div className="w-full h-64 md:h-80 lg:h-96">
              <HiringTrendsChart darkMode={darkMode} />
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

HiringAnalytics.propTypes = {
  userRole: PropTypes.string.isRequired,
};

export default HiringAnalytics;
