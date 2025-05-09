import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HiChevronLeft } from "react-icons/hi";
import { DarkModeContext } from "@/context/DarkModeContext";

const companies = [
  {
    id: "1",
    name: "TechCorp",
    logo: "/logos/techcorp.png",
    desc: "Leading tech innovator",
    industry: "Software",
    location: "New York",
    connectionStrength: 90,
  },
  {
    id: "2",
    name: "InnovateLabs",
    logo: "/logos/innovatelabs.png",
    desc: "Research and development",
    industry: "Finance",
    location: "London",
    connectionStrength: 75,
  },
  {
    id: "3",
    name: "FutureWorks",
    logo: "/logos/futureworks.png",
    desc: "Next-gen manufacturing",
    industry: "Healthcare",
    location: "Berlin",
    connectionStrength: 50,
  },
];

export default function CompanyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  // <-- removed TS generic here
  const [company, setCompany] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  // Load company data
  useEffect(() => {
    const found = companies.find((c) => c.id === id);
    setCompany(found || null);
  }, [id]);

  // Initialize follow state from localStorage
  useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem("followedCompanies") || "{}"
    );
    setIsFollowing(Boolean(stored[id]));
  }, [id]);

  // Persist dark mode
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  // Toggle follow/unfollow and sync to localStorage
  const handleFollowToggle = () => {
    setIsFollowing((prev) => {
      const followed = JSON.parse(
        localStorage.getItem("followedCompanies") || "{}"
      );
      if (prev) {
        delete followed[id];
      } else {
        followed[id] = true;
      }
      localStorage.setItem("followedCompanies", JSON.stringify(followed));
      return !prev;
    });
  };

  if (!company) {
    return (
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen p-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-500 hover:underline mb-4"
        >
          <HiChevronLeft className="w-5 h-5 mr-2" /> Back
        </button>
        <p>Company not found.</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Header */}
      <div className="fixed inset-x-0 top-0 z-40 bg-white dark:bg-gray-900 flex items-center justify-between px-4 h-16 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-4">
          <HiChevronLeft
            onClick={() => navigate(-1)}
            className="w-6 h-6 cursor-pointer"
          />
          <h1 className="text-lg font-semibold">{company.name}</h1>
        </div>
        <button onClick={toggleDarkMode} className="focus:outline-none">
          {isDarkMode ? "☀️" : "🌙"}
        </button>
      </div>

      {/* Main Content */}
      <main className="mt-16 p-6 flex-1 overflow-auto">
        {/* Profile */}
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={company.logo}
            alt={company.name}
            className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold">{company.name}</h2>
            <p className="text-gray-600 dark:text-gray-400">{company.desc}</p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <div className="p-4 border rounded-lg bg-white dark:bg-gray-800">
            <h3 className="font-semibold mb-1">Industry</h3>
            <p>{company.industry}</p>
          </div>
          <div className="p-4 border rounded-lg bg-white dark:bg-gray-800">
            <h3 className="font-semibold mb-1">Location</h3>
            <p>{company.location}</p>
          </div>
          <div className="p-4 border rounded-lg bg-white dark:bg-gray-800">
            <h3 className="font-semibold mb-1">Connection Strength</h3>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-blue-500 dark:bg-blue-600"
                style={{ width: `${company.connectionStrength}%` }}
              />
            </div>
            <p className="text-sm mt-1">{company.connectionStrength}%</p>
          </div>
        </div>

        {/* Follow / Unfollow */}
        <button
          onClick={handleFollowToggle}
          className={`px-6 py-2 rounded-lg text-white transition-colors duration-200 ${
            isFollowing
              ? "bg-gray-500 hover:bg-gray-600"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isFollowing ? "Following" : "Follow"}
        </button>
      </main>
    </div>
  );
}
