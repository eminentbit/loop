import { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import StartupCard from "../components/StartupCard";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { ChevronDownIcon } from "lucide-react";
import PropTypes from "prop-types";
import { DarkModeContext } from "../components/DarkModeContext";
import startups from "../data/startups";

// Dropdown component
const Dropdown = ({ label, options, selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode } = useContext(DarkModeContext);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={`relative m-0 transition-colors ${
        isDarkMode ? "text-gray-200" : "text-gray-900"
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`border rounded-full px-4 py-2 text-left focus:outline-none transition-colors ${
          isDarkMode
            ? "bg-gray-700 border-gray-600 text-gray-200 hover:bg-[#1389c9]"
            : "bg-white border-gray-300 text-gray-900 hover:bg-[#1389c9]"
        }`}
      >
        <div className="flex items-center justify-between">
          <span>{selected !== "All" && selected ? selected : label}</span>
          <ChevronDownIcon />
        </div>
      </button>
      {isOpen && (
        <ul
          className={`absolute z-10 mt-1 rounded-md shadow-lg transition-colors ${
            isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-900"
          }`}
        >
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
              className={`px-4 py-2 cursor-pointer transition-colors ${
                isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

const StartupsPage = ({ userRole }) => {
  const [isSidebarOpen, setSidebarIsOpen] = useState(() => {
    const stored = localStorage.getItem("sidebarOpen");
    return stored ? JSON.parse(stored) : true;
  });

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const { isDarkMode } = useContext(DarkModeContext);

  const industries = ["All", "Technology", "Healthcare", "Finance"];

  const filteredStartups = startups.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry =
      selectedIndustry === "All" || s.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

  return (
    <div
      className={`flex min-h-screen transition-colors ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Sidebar
        userRole={userRole}
        isOpen={isSidebarOpen}
        setIsOpen={setSidebarIsOpen}
      />
      <div
        className={`flex-1 p-6 transition-all ${
          isSidebarOpen ? "lg:ml-64" : "lg:ml-16"
        } ${isDarkMode ? "bg-gray-800" : "bg-gray-50"}`}
      >
        <Header userRole={userRole} className="mb-6" />
        <h1 className="text-3xl font-bold mb-6">Startups</h1>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <input
            type="text"
            placeholder="Search startups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`flex-1 border rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[200px] transition-colors ${
              isDarkMode
                ? "bg-gray-700 text-gray-200 border-gray-600"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          />
          <Dropdown
            label="Industry"
            options={industries}
            selected={selectedIndustry}
            onSelect={setSelectedIndustry}
          />
        </div>

        {/* Startup Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
          {filteredStartups.map((startup) => (
            <Link
              key={startup.id}
              to={`/startups/${startup.id}`}
              className="block"
            >
              <StartupCard
                startup={startup}
                className={`transition-transform duration-200 hover:scale-105 ${
                  isDarkMode
                    ? "dark:bg-gray-800 text-white border border-gray-700"
                    : "bg-white text-gray-800 border border-gray-300"
                }`}
              />
            </Link>
            
          ))}
        </div>
      </div>
    </div>
  );
};

StartupsPage.propTypes = {
  userRole: PropTypes.string,
};

export default StartupsPage;
