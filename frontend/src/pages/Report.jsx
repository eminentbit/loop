import { useState, useContext, useEffect } from "react";
import { DarkModeContext } from "../components/DarkModeContext";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import PropTypes from "prop-types";

function Report({ userRole }) {
  const { darkMode } = useContext(DarkModeContext);
  const [isOpen, setIsOpen] = useState(() => {
    const storedValue = localStorage.getItem("sidebarOpen");
    return storedValue ? JSON.parse(storedValue) : true;
  });

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(isOpen));
  }, [isOpen]);

  const reports = [
    {
      id: 1,
      title: "Quarterly Hiring Report",
      date: "Q1 2023",
      description:
        "An overview of recruitment trends and hires made during Q1 2023.",
    },
    {
      id: 2,
      title: "Investor Engagement Report",
      date: "March 2023",
      description:
        "Detailed analysis of investor interactions and feedback trends.",
    },
    {
      id: 3,
      title: "Market Analysis Report",
      date: "February 2023",
      description:
        "Insights into current market trends, competitive analysis, and projections.",
    },
    {
      id: 4,
      title: "Employee Performance Report",
      date: "January 2023",
      description:
        "Key performance indicators and productivity metrics for employees.",
    },
  ];

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      } min-h-screen`}
    >
      <Header />
      <div className="flex">
        {/* Pass props here */}
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} userRole={userRole} />
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-6">Reports</h1>
          {/* Reports Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reports.map((report) => (
              <div
                key={report.id}
                className="bg-white dark:bg-gray-800 shadow rounded p-6 border border-gray-200 dark:border-gray-700"
              >
                <h2 className="text-xl font-semibold mb-2">{report.title}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {report.date}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                  {report.description}
                </p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
                  View Report
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

Report.propTypes = {
  userRole: PropTypes.string.isRequired,
};

export default Report;
