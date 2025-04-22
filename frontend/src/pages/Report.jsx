import { useState, useContext, useEffect } from "react";
import { DarkModeContext } from "../components/DarkModeContext";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function Report({ userRole }) {
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(() => {
    const storedValue = localStorage.getItem("sidebarOpen");
    return storedValue ? JSON.parse(storedValue) : true;
  });

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(isOpen));
  }, [isOpen]);

  const mockReports = [
    {
      id: 1,
      title: "Quarterly Hiring Report",
      date: "Q1 2023",
      author: "Alice Johnson",
      tags: ["Hiring", "Recruitment", "Engineering"],
      attachments: [
        { name: "Full Report.pdf", url: "#" },
        { name: "Summary.xlsx", url: "#" }
      ],
      content:
        "This report provides a detailed summary of hiring trends and recruitment outcomes during the first quarter of 2023. Key departments involved include Engineering, Marketing, and HR.",
    },
    {
      id: 2,
      title: "Investor Engagement Report",
      date: "March 2023",
      author: "Bob Lee",
      tags: ["Investors", "Funding", "Presentations"],
      attachments: [
        { name: "Investor Deck.pptx", url: "#" }
      ],
      content:
        "In March 2023, the company engaged with 15 investors, conducted 6 demo presentations, and received feedback on funding rounds, product-market fit, and future projections.",
    },
    {
      id: 3,
      title: "Market Analysis Report",
      date: "February 2023",
      author: "Clara Smith",
      tags: ["Market", "Analysis", "Growth"],
      attachments: [],
      content:
        "A comprehensive analysis of market dynamics, competitor positioning, consumer behavior patterns, and future growth opportunities in the sector.",
    },
  ];

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      } min-h-screen transition-colors duration-300`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`border rounded-full px-4 py-2 text-left focus:outline-none transition-colors ${
          darkMode
            ? "bg-gray-700 border-gray-600 text-gray-200 hover:bg-[#1389c9]"
            : "bg-white border-gray-300 text-gray-900 hover:bg-[#1389c9]"
        }`}
      ></button>
      <Header />
      <div className="flex">
        {/* Sidebar with fixed width */}
        <div className={`transition-all duration-300 ${isOpen ? "w-64" : "w-16"} shrink-0`}>
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} userRole={userRole} />
        </div>

        {/* Main content with padding to avoid sidebar overlap */}
        <main className="flex-1 px-4 sm:px-8 py-6 md:py-10">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Reports</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockReports.map((report) => (
                <div
                  key={report.id}
                  className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700 rounded-2xl p-6"
                >
                  <h2 className="text-xl font-semibold mb-1">
                    {report.title}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {report.date}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                    {report.description}
                  </p>
                  <button
  onClick={() => navigate(`/reports/${report.id}`)}
  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
>
  View Report
</button>

                </div>
              ))}
            </div>
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
