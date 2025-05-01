import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "src/components/job.page.component/ui/Navbar";

const App = () => {
  const [isFollowing, setIsFollowing] = useState({
    recruiter1: false,
    recruiter2: true,
    recruiter3: false,
    recruiter4: true,
    recruiter5: false,
    recruiter6: false,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [recruiters, setRecruiters] = useState([]);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleFollow = (id) => {
    setIsFollowing((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleFilterClick = (filter) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const clearFilters = () => setSelectedFilters([]);

  useEffect(() => {
    const fetchRecruiters = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/network/recruiters`
        ); // Replace with actual API
        const data = response.data;

        setRecruiters(data);

        // Dynamically initialize follow state if needed
        const initialFollowState = {};
        data.forEach((r) => {
          initialFollowState[r.id] = false;
        });
        setIsFollowing(initialFollowState);
      } catch (error) {
        console.error("Failed to fetch recruiters:", error);
      }
    };

    fetchRecruiters();
  }, []);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setIsAuth(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      {/* Header */}
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
            <Link to="/signin" className="hidden md:block">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
                Sign In
              </button>
            </Link>
            <Link to="/dashboard" className="hidden md:block">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
                Dashboard
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Search & Filter Bar */}
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        {/* Recommended Recruiters */}
        <section>
          <h2 className="text-2xl font-bold mb-6">
            Recommended Recruiters for You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recruiters.map((recruiter) => (
              <div
                key={recruiter.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition"
              >
                <div className="flex items-start">
                  <div
                    className={`${recruiter.color} h-16 w-16 rounded-full flex items-center justify-center`}
                  >
                    <span className="text-2xl font-semibold">
                      {recruiter.initials}
                    </span>
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-semibold mb-1">
                      {recruiter.name}
                    </h3>
                    <p className="text-sm mb-2">
                      {recruiter.role} at{" "}
                      <span className="font-medium">{recruiter.company}</span>
                    </p>
                    {recruiter.tags && (
                      <div className="flex flex-wrap gap-2">
                        {recruiter.tags.map((tag, index) => (
                          <span
                            key={index}
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
                    onClick={() => toggleFollow(recruiter.id)}
                    className={`flex-1 px-4 py-2 rounded-md font-medium transition ${
                      isFollowing[recruiter.id]
                        ? "bg-gray-100 dark:bg-gray-700 text-gray-800"
                        : "bg-indigo-50 dark:bg-indigo-700 text-indigo-700 dark:text-indigo-200"
                    }`}
                  >
                    {isFollowing[recruiter.id] ? "Unfollow" : "Follow"}
                  </button>
                  <Link to={`/connections`} className="flex-1">
                    <button className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
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
              <span className="font-medium">4</span> connections •{" "}
              <span className="font-medium text-green-600">2</span> available
              now
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 transition">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  id: "recruiter2",
                  initials: "MC",
                  name: "Michael Chen",
                  company: "InnovateX",
                  online: true,
                  color:
                    "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300",
                },
                {
                  id: "recruiter4",
                  initials: "DK",
                  name: "David Kim",
                  company: "TechVision",
                  online: true,
                  color:
                    "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300",
                },
                {
                  id: "recruiter3",
                  initials: "SM",
                  name: "Sophia Martinez",
                  company: "Talent Boost",
                  online: false,
                  color:
                    "bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300",
                },
                {
                  id: "recruiter5",
                  initials: "JT",
                  name: "James Taylor",
                  company: "RecruitPro",
                  online: false,
                  color:
                    "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300",
                },
              ].map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <div className="flex items-center">
                    <div
                      className={`${user.color} h-12 w-12 rounded-full flex items-center justify-center`}
                    >
                      <span className="text-sm font-semibold">
                        {user.initials}
                      </span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium hover:underline cursor-pointer">
                        {user.name}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user.company}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFollow(user.id)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md text-xs font-medium hover:bg-indigo-700 transition"
                  >
                    {isFollowing[user.id] ? "Unfollow" : "Follow"}
                  </button>
                </div>
              ))}
            </div>
            <Link to={`/connections`} className="flex-1">
                    <button className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
                      View Connections
                    </button>
                  </Link>
          </div>
        </section>

        {/* Boost Your Profile */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Boost Your Profile</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6 space-y-6 transition">
            <div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className="bg-indigo-600 h-3 rounded-full transition-all"
                  style={{ width: "65%" }}
                />
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Your profile is <span className="font-medium">65%</span>{" "}
                complete
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Skills & Expertise",
                  desc: "Add your top skills to stand out to recruiters.",
                  btn: "Add Skills",
                  icon: "💡",
                  link: "/skill",
      
                },
                {
                  title: "Portfolio & Projects",
                  desc: "Showcase work with links to portfolio or GitHub.",
                  btn: "Add Projects",
                  icon: "📁",
                  link: "/projects",
                },
                {
                  title: "Certifications",
                  desc: "Add professional credentials to validate expertise.",
                  btn: "Add Certifications",
                  icon: "🎓",
                  link: "/certificate",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5 border border-gray-200 dark:border-gray-600 transition"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">{item.title}</h3>
                    <span className="flex items-center px-2.5 py-0.5 bg-green-100 dark:bg-green-700 text-green-800 dark:text-green-200 rounded-full text-xs">
                      👁 Recruiter Visible
                    </span>
                  </div>
                  <p className="text-sm mb-4 text-gray-600 dark:text-gray-400">
                    {item.desc}
                  </p>
                  <button className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
                    <span className="mr-2">{item.icon}</span>
                    {item.btn}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        {!isAuth && (
          <section className="rounded-lg overflow-hidden bg-gradient-to-r from-indigo-800 to-indigo-900">
            <div className="px-6 py-12 md:flex md:items-center md:justify-between transition">
              <div className="max-w-xl text-white">
                <h2 className="text-3xl font-bold mb-3">
                  Ready to grow your career?
                </h2>
                <p className="text-lg opacity-90">
                  Connect with top recruiters and get discovered today.
                </p>
              </div>
              <Link to="/signup" className="mt-6 md:mt-0">
                <button className="mt-6 md:mt-0 px-6 py-3 bg-white text-indigo-700 font-medium rounded-md hover:bg-gray-100 transition flex items-center">
                  <span>Join Now</span>
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </Link>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default App;
