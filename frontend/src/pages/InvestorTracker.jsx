import { useState, useContext } from "react";
import { DarkModeContext } from "../components/DarkModeContext";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function InvestorTracker() {
  const { darkMode } = useContext(DarkModeContext);
  const [isOpen, setIsOpen] = useState(true);
  const userRole = "admin"; // You can dynamically change this based on your auth logic

  const trackerData = [
    {
      id: 1,
      title: "Total Investments",
      value: "$2.5M",
      description: "Total amount invested to date",
    },
    {
      id: 2,
      title: "Average ROI",
      value: "12%",
      description: "Average return on investment",
    },
    {
      id: 3,
      title: "Active Portfolios",
      value: "8",
      description: "Number of portfolios currently active",
    },
    {
      id: 4,
      title: "New Investors",
      value: "15",
      description: "Investors joined this month",
    },
  ];

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen`}>
      <Header />
      <div className="flex">
        {/* Passed props here */}
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} userRole={userRole} />
        <main className="flex-1 p-8">
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
                <p className="text-sm text-gray-600 dark:text-gray-400">{metric.description}</p>
              </div>
            ))}
          </div>

          {/* Investor Trends Chart Placeholder */}
          <div className="bg-white dark:bg-gray-800 shadow rounded p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold mb-4">Investor Trends</h2>
            <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-gray-500">Chart Placeholder</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default InvestorTracker;
