import { useContext, useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import kApplications from "@/data/applications";
import { FaSearch, FaEnvelope, FaTimesCircle } from "react-icons/fa";
import { DarkModeContext } from "@/context/DarkModeContext";
import PropTypes from "prop-types";

const MyApplications = ({ userRole }) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(() => {
    const storedValue = localStorage.getItem("sidebarOpen");
    return storedValue ? JSON.parse(storedValue) : true;
  });

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(isOpen));
  }, [isOpen]);
  const { isDarkMode } = useContext(DarkModeContext);
  // eslint-disable-next-line no-unused-vars
  const [applications, setApplications] = useState(kApplications);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return "text-yellow-500 bg-yellow-100 dark:text-yellow-300 dark:bg-yellow-900";
      case "Interview":
        return "text-blue-500 bg-blue-100 dark:text-blue-300 dark:bg-blue-900";
      case "Accepted":
        return "text-green-500 bg-green-100 dark:text-green-300 dark:bg-green-900";
      case "Rejected":
        return "text-red-500 bg-red-100 dark:text-red-300 dark:bg-red-900";
      default:
        return "text-gray-500 bg-gray-100 dark:text-gray-300 dark:bg-gray-700";
    }
  };

  const filteredApplications = applications.filter(
    (app) =>
      app.title.toLowerCase().includes(search.toLowerCase()) ||
      app.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`flex ${isDarkMode ? "dark" : ""}`}>
      <Sidebar userRole={userRole} isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className={`w-full transition-all duration-300 ${
          !isOpen ? "ml-16" : "ml-64 max-w-6xl"
        }`}
      >
        <Header userRole={userRole} />

        {/* Container Card */}
        <div
          className={`rounded-lg shadow-lg p-6 ${
            isDarkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"
          }`}
        >
          <h1 className="text-3xl font-bold mb-6">My Applications</h1>
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
              <div className="space-y-4 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600">
                {filteredApplications.length > 0 ? (
                  filteredApplications.map((app) => (
                    <div
                      key={app.id}
                      className="p-4 rounded-lg shadow-md bg-gray-100 dark:bg-gray-800 flex justify-between items-center"
                    >
                      <div>
                        <h3 className="text-lg font-semibold">{app.title}</h3>
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
            <div className="p-6 rounded-lg shadow-md bg-gray-50 dark:bg-gray-800">
              <h2 className="text-2xl font-bold mb-4">Applications Summary</h2>
              <ul className="space-y-3">
                <li>
                  <span className="font-semibold">Total Applications:</span>{" "}
                  {applications.length}
                </li>
                <li>
                  <span className="font-semibold">Pending:</span>{" "}
                  {
                    applications.filter((app) => app.status === "Pending")
                      .length
                  }
                </li>
                <li>
                  <span className="font-semibold">Interview:</span>{" "}
                  {
                    applications.filter((app) => app.status === "Interview")
                      .length
                  }
                </li>
                <li>
                  <span className="font-semibold">Accepted:</span>{" "}
                  {
                    applications.filter((app) => app.status === "Accepted")
                      .length
                  }
                </li>
                <li>
                  <span className="font-semibold">Rejected:</span>{" "}
                  {
                    applications.filter((app) => app.status === "Rejected")
                      .length
                  }
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

MyApplications.propTypes = {
  userRole: PropTypes.string.isRequired,
};

export default MyApplications;
