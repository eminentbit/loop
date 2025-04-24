import { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { FaDownload, FaSearch, FaBars, FaRegCalendarAlt } from 'react-icons/fa';
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import HiringTrendsChart from "../components/Chart";
import trackerData from "../data/inverstorTracker";
import { DarkModeContext } from "../components/DarkModeContext";

function InvestorTracker({ userRole }) {
  const { darkMode } = useContext(DarkModeContext);
  const [isOpen, setIsOpen] = useState(() => {
    const stored = localStorage.getItem("sidebarOpen");
    return stored ? JSON.parse(stored) : true;
  });
  const [searchText, setSearchText] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(isOpen));
  }, [isOpen]);

  const filteredData = trackerData.filter((m) =>
    m.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleExport = () => {
    const header = ["Title", "Value", "Description"].join(",") + "\n";
    const rows = filteredData
      .map((m) => [m.title, m.value, m.description].join(","))
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "investor_tracker_report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 flex">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} userRole={userRole} />
        <main className={`flex-1 transition-all duration-300 ${isOpen ? "ml-64" : "ml-16"} p-4 sm:p-6 lg:p-8`}>
          <Header userRole={userRole} />
          <div className="max-w-7xl mx-auto">
            {/* Title + Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h1 className="text-3xl sm:text-4xl font-bold">Investor Tracker</h1>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search metrics..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <FaRegCalendarAlt className="text-gray-500" />
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="py-2 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none"
                  />
                  <span>-</span>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="py-2 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none"
                  />
                </div>
                <button
                  onClick={handleExport}
                  className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                >
                  <FaDownload className="mr-2" /> Export CSV
                </button>
                <button
                  onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                  className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow transition"
                >
                  <FaBars />
                </button>
              </div>
            </div>

            {/* KPI Cards or List */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {filteredData.map((metric) => (
                  <div
                    key={metric.id}
                    className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transform hover:scale-105 transition-transform duration-200"
                  >
                    <h2 className="text-xl font-semibold mb-2">{metric.title}</h2>
                    <p className="text-3xl font-bold mb-2">{metric.value}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{metric.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <ul className="space-y-4 mb-8">
                {filteredData.map((metric) => (
                  <li
                    key={metric.id}
                    className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 border border-gray-200 dark:border-gray-700 flex justify-between items-center"
                  >
                    <div>
                      <h2 className="text-lg font-semibold">{metric.title}</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{metric.description}</p>
                    </div>
                    <span className="text-2xl font-bold">{metric.value}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Investor Trends Chart */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">Investor Trends</h2>
                <button
                  onClick={() => window.location.reload()}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  title="Refresh data"
                >
                  <FaRegCalendarAlt />
                </button>
              </div>
              <div className="w-full h-64 sm:h-80">
                <HiringTrendsChart darkMode={darkMode} startDate={startDate} endDate={endDate} />
              </div>
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
