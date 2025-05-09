import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "src/components/job.page.component/ui/Navbar";
import PageContainer from "src/components/job.page.component/ui/PageContainer";
import { Search, ChevronRight, ChevronLeft } from "lucide-react";
import axios from "axios";

export default function Applicants() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const fetchApplications = async (pageNum = 1, query = "") => {
    setLoading(true);
    setError(null);
    try {
      // eslint-disable-next-line no-unused-vars
      const { data, headers } = await axios.get(
        `${import.meta.env.VITE_API_URL}/application/:jobId/applicants`,
        {
          params: { page: pageNum, search: query },
          withCredentials: true,
        }
      );
      setApplications(data.results || data);
      // assume paginated: next page exists
      setHasMore(Boolean(data.next));
    } catch (err) {
      setError(err.message || "Failed to load applications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications(page, search);
  }, [page, search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Navbar />
      <PageContainer>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Applicants
          </h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search by name or job title"
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin h-12 w-12 border-4 border-indigo-500 border-t-transparent rounded-full"></div>
          </div>
        ) : error ? (
          <p className="text-center text-red-500 py-8">{error}</p>
        ) : applications.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400 py-8">
            No applicants found.
          </p>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <ul>
              {applications.map((app) => (
                <li
                  key={app.id}
                  className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                      {app.applicantName}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Applied for{" "}
                      <span className="font-medium">{app.jobTitle}</span>
                    </p>
                  </div>
                  <Link
                    to={`/applications/${app.id}`}
                    className="text-indigo-600 hover:underline flex items-center"
                  >
                    View Details
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </li>
              ))}
            </ul>
            {/* Pagination Controls */}
            <div className="flex justify-between items-center px-6 py-4">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center gap-1 text-gray-600 dark:text-gray-400 disabled:opacity-50"
              >
                <ChevronLeft className="h-5 w-5" /> Previous
              </button>

              <span className="text-gray-600 dark:text-gray-400">
                Page {page}
              </span>

              <button
                onClick={() => hasMore && setPage((p) => p + 1)}
                disabled={!hasMore}
                className="flex items-center gap-1 text-gray-600 dark:text-gray-400 disabled:opacity-50"
              >
                Next <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </PageContainer>
    </div>
  );
}
