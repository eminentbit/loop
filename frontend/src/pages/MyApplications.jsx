import { useContext, useState, useEffect } from "react";
import { FaSearch, FaEnvelope, FaTimesCircle } from "react-icons/fa";
import { DarkModeContext } from "@/context/DarkModeContext";
import axios from "axios";
import Navbar from "src/components/job.page.component/ui/Navbar";

const MyApplications = () => {
  const [search, setSearch] = useState("");
  const [applications, setApplications] = useState([]);
  const { isDarkMode } = useContext(DarkModeContext);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/application`,
          { withCredentials: true }
        );
        setApplications(response.data || []);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []);

  const filteredApplications = applications.filter((app) => {
    const title = app.job?.title?.toLowerCase() || "";
    const company = app.job?.company?.toLowerCase() || "";
    const term = search.toLowerCase();
    return title.includes(term) || company.includes(term);
  });

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

  return (
    <div className={`flex ${isDarkMode ? "dark" : ""}`}>
      <div className="w-full transition-all duration-300">
        <Navbar />
        <div
          className={`ml-16 rounded-lg shadow-lg p-6 ${
            isDarkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"
          }`}
        >
          <h1 className="text-3xl font-bold mb-6">My Applications</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Search & List */}
            <div>
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
              <div className="space-y-4 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600">
                {filteredApplications.length ? (
                  filteredApplications.map((app) => (
                    <div
                      key={app.id}
                      className="p-4 rounded-lg shadow-md bg-gray-100 dark:bg-gray-800 flex justify-between items-center"
                    >
                      <div>
                        <h3 className="text-lg font-semibold">
                          {app.job?.title || "Untitled"}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {app.job?.company || "Unknown Company"} - Applied on{" "}
                          {app.date}
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
            {/* Summary */}
            <div className="p-6 rounded-lg shadow-md bg-gray-50 dark:bg-gray-800">
              <h2 className="text-2xl font-bold mb-4">Applications Summary</h2>
              <ul className="space-y-3">
                <li>
                  <span className="font-semibold">Total:</span>{" "}
                  {applications.length}
                </li>
                {["Pending", "Interview", "Accepted", "Rejected"].map(
                  (status) => (
                    <li key={status}>
                      <span className="font-semibold">{status}:</span>{" "}
                      {applications.filter((a) => a.status === status).length}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyApplications;
