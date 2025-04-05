import { useContext, useState } from "react";
import { Bell, ChevronDown, Search, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import ProfilePic from "../assets/profile-pic.png";
import { DarkModeContext } from "./DarkModeContext";
import PropTypes from "prop-types";
import Logo from "./Logo";

const Header = ({ className, userRole }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <header
      className={`${className} p-4 flex mb-4 justify-between items-center top-0 w-full z-10 shadow-md ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white"
      }`}
    >
      {/* Left side: Logo and Navigation */}
      <div className="flex items-center">
        <Link
          to="/dashboard"
          className="text-2xl max-md:pt-4 font-bold text-blue-600"
        >
          <Logo className="w-18 h-18" />
        </Link>
        <nav className="ml-10 space-x-6 hidden md:flex">
          {userRole === "jobseeker" ? (
            <>
              <Link
                to="/dashboard"
                className="hover:text-blue-600 font-medium transition"
              >
                Dashboard
              </Link>
              <Link
                to="/jobs"
                className="hover:text-blue-600 font-medium transition"
              >
                Jobs
              </Link>
              <Link
                to="/network"
                className="hover:text-blue-600 font-medium transition"
              >
                Network
              </Link>
              <Link
                to="/learning"
                className="hover:text-blue-600 font-medium transition"
              >
                Learning
              </Link>
            </>
          ) : userRole === "recruiter" ? (
            <>
              <Link
                to="/dashboard"
                className="hover:text-blue-600 font-medium transition"
              >
                Dashboard
              </Link>
              <Link
                to="/candidates"
                className="hover:text-blue-600 font-medium transition"
              >
                Candidates
              </Link>
              <Link
                to="/reports"
                className="hover:text-blue-600 font-medium transition"
              >
                Reports
              </Link>
              <Link
                to="/settings"
                className="hover:text-blue-600 font-medium transition"
              >
                Settings
              </Link>
            </>
          ) : null}
        </nav>
      </div>

      {/* Right side: Search, Dark Mode Toggle, Notifications, Profile */}
      <div className="flex items-center space-x-6">
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            className={`border rounded-full pl-10 pr-4 py-2 text-sm transition focus:outline-none focus:ring-2 ${
              isDarkMode
                ? "bg-gray-800 text-white border-gray-600 focus:ring-blue-400"
                : "border-gray-300 bg-white text-gray-700 focus:ring-blue-300"
            }`}
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full transition hover:bg-gray-200 dark:hover:bg-gray-700"
          title="Toggle Dark Mode"
        >
          {isDarkMode ? (
            <Sun className="w-6 h-6 text-yellow-400" />
          ) : (
            <Moon className="w-6 h-6 text-gray-700" />
          )}
        </button>

        {/* Notifications */}
        <Link
          to="/notifications"
          className="relative hover:text-blue-600 transition"
          title="Notifications"
        >
          <Bell className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
            3
          </span>
        </Link>

        {/* Profile Dropdown */}
        <div className="relative">
          <div
            className="flex items-center space-x-2 bg-gray-100 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <img
              src={ProfilePic}
              alt="User Avatar"
              className="w-8 h-8 rounded-full object-cover border border-gray-300"
            />
            <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </div>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div
              className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg overflow-hidden z-20 ${
                isDarkMode ? "bg-gray-800 text-white" : "bg-white"
              }`}
            >
              <Link
                to="/profile"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Profile
              </Link>
              <Link
                to="/settings"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Settings
              </Link>
              <Link
                to="/logout"
                className="block px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  userRole: PropTypes.oneOf(["jobseeker", "recruiter"]).isRequired,
};

export default Header;
