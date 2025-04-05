import { useState, useContext } from "react";
import { DarkModeContext } from "../components/DarkModeContext";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function HiringAnalytics() {
  const { darkMode } = useContext(DarkModeContext);
  const [isOpen, setIsOpen] = useState(true);
  const userRole = "admin";

  const analyticsData = [
    {
      id: 1,
      title: "Total Hires",
      value: "125",
      description: "Total hires made in the last quarter",
    },
    {
      id: 2,
      title: "Average Time to Hire",
      value: "35 days",
      description: "Average days taken to fill a position",
    },
    {
      id: 3,
      title: "Offer Acceptance Rate",
      value: "82%",
      description: "Percentage of accepted job offers",
    },
    {
      id: 4,
      title: "Candidate Pipeline",
      value: "350",
      description: "Candidates in the pipeline this month",
    },
  ];

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen`}>
      <Header />
      <div className="flex">
        {/* Passed isOpen, setIsOpen, userRole to Sidebar */}
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} userRole={userRole} />
        <main className="flex-1 p-8">
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
                <p className="text-sm text-gray-600 dark:text-gray-400">{metric.description}</p>
              </div>
            ))}
          </div>

          {/* Hiring Trends Chart Placeholder */}
          <div className="bg-white dark:bg-gray-800 shadow rounded p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold mb-4">Hiring Trends</h2>
            <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-gray-500">Chart Placeholder</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default HiringAnalytics;
