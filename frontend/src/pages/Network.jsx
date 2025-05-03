import axios from "axios";
import { User } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "src/components/job.page.component/ui/Navbar";

const NetworkPage = () => {
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [recruiters, setRecruiters] = useState([]);
  const [connections, setConnections] = useState([]);
  const [isAuth, setIsAuth] = useState(false);

  // Toggle dark mode class
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Fetch recommended recruiters and initial follow state
  useEffect(() => {
    const fetchRecruiters = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/network/recruiters`,
          { withCredentials: true }
        );
        const data = response.data;
        setRecruiters(data);
        // initialize follow state from API
        const initialFollow = {};
        data.forEach((r) => {
          initialFollow[r.id] = r.isFollowing;
        });
        setIsFollowing(initialFollow);
      } catch (error) {
        console.error("Failed to fetch recruiters:", error);
      }
    };
    fetchRecruiters();
  }, []);

  // Fetch user connections for "Your Network" section
  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/network/following`,
          { withCredentials: true }
        );
        console.log(response.data.data);
        setConnections(response.data.data);
      } catch (error) {
        console.error("Failed to fetch connections:", error);
      }
    };
    fetchConnections();
  }, []);

  // Check auth state from sessionStorage
  useEffect(() => {
    const stored = sessionStorage.getItem("user");
    setIsAuth(!!stored);
  }, []);

  // Toggle follow/unfollow
  const toggleFollow = async (id) => {
    try {
      await axios.post(
        `${
          import.meta.env.VITE_API_URL
        }/network/recruiters/${id}/toggleFollow/`,
        null,
        { withCredentials: true }
      );
      setIsFollowing((prev) => ({ ...prev, [id]: !prev[id] }));
    } catch (error) {
      console.error("Failed to update follow status:", error);
      alert("Unable to update follow status. Please try again.");
    }
  };

  // Filter click handler
  const handleFilterClick = (filter) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const clearFilters = () => setSelectedFilters([]);

  // Apply search & filters to recommended recruiters
  const filteredRecruiters = recruiters.filter((r) => {
    const matchesSearch = [r.fullName, r.companyName, ...(r.tags || [])].some(
      (field) => field.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const matchesFilters = selectedFilters.every((filter) => {
      switch (filter) {
        case "Industry":
          return r.industry;
        case "Location":
          return r.location;
        case "Experience":
          return r.experience;
        case "CompanySize":
          return r.companySize;
        default:
          return true;
      }
    });
    return matchesSearch && matchesFilters;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <Navbar />
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-4">
          <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            My Network
          </h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDarkMode((prev) => !prev)}
              className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
            {!isAuth && (
              <Link to="/signin" className="hidden md:block">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
                  Sign In
                </button>
              </Link>
            )}
            {isAuth && (
              <Link to="/dashboard" className="hidden md:block">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
                  Dashboard
                </button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Search & Filters */}
      <div className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="relative mb-4">
            <span className="absolute left-3 top-3 text-gray-400 dark:text-gray-500">
              🔍
            </span>
            <input
              type="text"
              className="w-full pl-10 pr-4 py-3 border rounded-md bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:outline-none transition"
              placeholder="Search recruiters by name, company, or skills"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {["Industry", "Location", "Experience", "CompanySize"].map((f) => (
              <button
                key={f}
                onClick={() => handleFilterClick(f)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition whitespace-nowrap ${
                  selectedFilters.includes(f)
                    ? "bg-indigo-100 dark:bg-indigo-700 text-indigo-800 dark:text-indigo-200"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                }`}
              >
                {f === "CompanySize" ? "Company Size" : f}
                {selectedFilters.includes(f) && <span className="ml-1">✓</span>}
              </button>
            ))}
            {selectedFilters.length > 0 && (
              <button
                onClick={clearFilters}
                className="ml-auto text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline transition"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        {/* Recommended Recruiters */}
        <section>
          <h2 className="text-2xl font-bold mb-6">
            Recommended Recruiters for You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecruiters.map((r) => (
              <div
                key={r.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition"
              >
                <div className="flex items-start">
                  <div
                    className={`${r.color} h-16 w-16 rounded-full flex items-center justify-center`}
                  >
                    <span className="text-2xl font-semibold">
                      {r.initials || <User />}
                    </span>
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-semibold mb-1">{r.fullName}</h3>
                    <p className="text-sm mb-2">
                      {r.role} at{" "}
                      <span className="font-medium">{r.companyName}</span>
                    </p>
                    {r.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {r.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-6 flex space-x-3">
                  <button
                    onClick={() => toggleFollow(r.id)}
                    className={`flex-1 px-4 py-2 rounded-md font-medium transition ${
                      isFollowing[r.id]
                        ? "bg-gray-100 dark:bg-gray-700 text-gray-800"
                        : "bg-indigo-50 dark:bg-indigo-700 text-indigo-700 dark:text-indigo-200"
                    }`}
                  >
                    {isFollowing[r.id] ? "Unfollow" : "Follow"}
                  </button>
                  <Link to="/connections" className="flex-1">
                    <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
                      Connections
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Your Network */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Your Network</h2>
            <div className="text-sm">
              <span className="font-medium">{connections.length}</span>{" "}
              connections •{" "}
              <span className="font-medium text-green-600">
                {/* {connections.filter((c) => c.online).length} */}
              </span>{" "}
              available now
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-6 transition">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {connections.length > 0 ? (
                connections.map((c) => (
                  <div
                    key={c.id}
                    className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md p-5 flex flex-col justify-between transition hover:shadow-lg"
                  >
                    <div className="flex items-center">
                      <div
                        className={`${c.color} h-14 w-14 rounded-full flex items-center justify-center text-white font-bold text-xl`}
                      >
                        {c.initials || <User />}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {c.fullName}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {c.role} at{" "}
                          <span className="font-medium">{c.companyName}</span>
                        </p>
                        {c.online && (
                          <span className="inline-block mt-1 text-xs text-green-500">
                            ● Online
                          </span>
                        )}
                      </div>
                    </div>

                    {c.tags?.length > 0 && (
                      <div className="flex flex-wrap mt-4 gap-2">
                        {c.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-3 py-1 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-6">
                      <button
                        onClick={() => navigate(`/profile/${c.id}`)}
                        className="w-full text-center px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition"
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  No connections found.
                </p>
              )}
            </div>
          </div>
          <div className="mt-6">
            <Link to="/connections" className="mt-4 block">
              <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
                View Connections
              </button>
            </Link>
          </div>
        </section>

        {/* Boost Your Profile and Footer CTA unchanged */}
      </main>
    </div>
  );
};

export default NetworkPage;
