import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import kApplications from "@/data/applications";
import { useState } from "react";
import { FaSearch, FaEnvelope, FaTimesCircle } from "react-icons/fa";

const MyApplications = () => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [applications, setApplications] = useState(kApplications);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return "text-yellow-500 bg-yellow-100";
      case "Interview":
        return "text-blue-500 bg-blue-100";
      case "Accepted":
        return "text-green-500 bg-green-100";
      case "Rejected":
        return "text-red-500 bg-red-100";
      default:
        return "text-gray-500 bg-gray-100";
    }
  };

  const filteredApplications = applications.filter(
    (app) =>
      app.title.toLowerCase().includes(search.toLowerCase()) ||
      app.company.toLowerCase().includes(search.toLowerCase())
  );

  // Calculate summary counts
  const totalApplications = applications.length;
  const pendingCount = applications.filter(
    (app) => app.status === "Pending"
  ).length;
  const interviewCount = applications.filter(
    (app) => app.status === "Interview"
  ).length;
  const acceptedCount = applications.filter(
    (app) => app.status === "Accepted"
  ).length;
  const rejectedCount = applications.filter(
    (app) => app.status === "Rejected"
  ).length;

  return (
    <div className="flex">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      {/* When sidebar is closed, use full width (w-full) with a smaller left margin */}
      <div
        className={`p-6 w-full transition-all duration-300 ${
          !isOpen ? "ml-16" : "ml-64 max-w-6xl"
        }`}
      >
        <Header />
        {/* Container Card with two columns */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
            My Applications
          </h1>
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 ${
              !isOpen ? "gap-[10em]" : "gap-10"
            }`}
          >
            {/* Left Column: Search & List */}
            <div>
              {/* Search Bar */}
              <div className="relative mb-6">
                <FaSearch className="absolute left-3 top-3 text-gray-500 dark:text-gray-400" />
                <input
                  type="text"
                  placeholder="Search jobs or companies..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                />
              </div>
              {/* Applications List */}
              <div className="space-y-4 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-700">
                {filteredApplications.length > 0 ? (
                  filteredApplications.map((app) => (
                    <div
                      key={app.id}
                      className="p-4 rounded-lg shadow-md bg-gray-100 dark:bg-gray-800 flex justify-between items-center"
                    >
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                          {app.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {app.company} - Applied on {app.date}
                        </p>
                        <span
                          className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                            app.status
                          )}`}
                        >
                          {app.status}
                        </span>
                      </div>
                      <div className="flex gap-3">
                        <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
                          <FaEnvelope />
                        </button>
                        <button className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition">
                          <FaTimesCircle />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-center">
                    No applications found.
                  </p>
                )}
              </div>
            </div>
            {/* Right Column: Applications Summary */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md h-full">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                Applications Summary
              </h2>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li>
                  <span className="font-semibold">Total Applications:</span>{" "}
                  {totalApplications}
                </li>
                <li>
                  <span className="font-semibold">Pending:</span> {pendingCount}
                </li>
                <li>
                  <span className="font-semibold">Interview:</span>{" "}
                  {interviewCount}
                </li>
                <li>
                  <span className="font-semibold">Accepted:</span>{" "}
                  {acceptedCount}
                </li>
                <li>
                  <span className="font-semibold">Rejected:</span>{" "}
                  {rejectedCount}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyApplications;
