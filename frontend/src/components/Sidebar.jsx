import { useContext } from "react";
import {
  Bell,
  BookOpen,
  Folder,
  LogOut,
  Menu,
  Star,
  Users,
  Rss,
  Briefcase,
  UsersRound,
  TrendingUp,
  LineChart,
} from "lucide-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { DarkModeContext } from "../context/DarkModeContext";
import Logo from "./Logo";
import Logout from "./Logout";

const Sidebar = ({ userRole, isOpen, setIsOpen }) => {
  // Removed unused isSubSectionOpen state
  const { isDarkMode } = useContext(DarkModeContext);

  // Define role-based navigation links.
  const jobSeekerLinks = [
    { name: "Feed", path: "/feed", icon: <Rss className="w-5 h-5" /> },
    {
      name: "Recommended",
      path: "/jobs/recommended",
      icon: <Star className="w-5 h-5" />,
    },
    {
      name: "Applications",
      path: "/applications",
      icon: <Folder className="w-5 h-5" />,
    },
    {
      name: "Startups",
      path: "/startup",
      icon: <Briefcase className="w-5 h-5" />,
    },
    {
      name: "Skills",
      path: "/assessments",
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      name: "Community",
      path: "/community",
      icon: <Users className="w-5 h-5" />,
    },
  ];

  const recruiterLinks = [
    { name: "Feed", path: "/feed", icon: <Rss className="w-5 h-5" /> },
    {
      name: "Candidate Pool",
      path: "/candidates",
      icon: <UsersRound className="w-5 h-5" />,
    },
    {
      name: "Job Postings",
      path: "/jobs",
      icon: <Briefcase className="w-5 h-5" />,
    },
    {
      name: "Team Collaboration",
      path: "/collaboration",
      icon: <Users className="w-5 h-5" />,
    },
    {
      name: "Hiring Analytics",
      path: "/analytics",
      icon: <Star className="w-5 h-5" />,
    },
    {
      name: "Investor Tracker",
      path: "/investor-tracker",
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      name: "Startup Listings",
      path: "/startup-listings",
      icon: <LineChart className="w-5 h-5" />,
    },
  ];

  const links = userRole === "recruiter" ? recruiterLinks : jobSeekerLinks;

  // Removed unused additionalLinks variable

  return (
    <div className="h-screen flex">
      {/* Toggle Button */}
      <button
        className={`p-3 fixed top-4 left-4 z-20 rounded-md transition-colors ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-800"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {<Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen p-4 flex flex-col justify-between shadow-lg transition-all duration-300 ${
          isOpen ? "w-64" : "w-16"
        } ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
      >
        <div className="flex flex-col flex-grow pt-5 ">
          <h2
            className={`text-xl font-bold text-center transition-all pl-5  ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <Logo className={"h-20 w-20"} />
          </h2>
          <nav>
            <ul
              className={`${
                !isOpen ? "mt-10" : "mt-4"
              } flex flex-col flex-grow space-y-4`}
            >
              {links.map((link) => (
                <li key={link.path} className="mb-3">
                  <Link
                    to={link.path}
                    className={`flex items-center ${
                      isOpen ? "gap-3" : "justify-center"
                    } p-2 rounded-md transition-colors duration-300 ${
                      isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-300"
                    }`}
                  >
                    {link.icon}
                    <span className={`${isOpen ? "block" : "hidden"} text-sm`}>
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* message Indicator */}
        <div className="mb-6">
          <button
            className={`flex items-center gap-3 p-2 rounded-md w-full transition-colors ${
              isDarkMode
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            <Bell className="w-5 h-5" />
            <span className={`${isOpen ? "block" : "hidden"} text-sm`}>
              Messages
            </span>
          </button>
        </div>

        {/* Logout Button */}
        <div className="pb-6">
          <button
            className={`flex items-center gap-3 p-2 rounded-md w-full transition-colors ${
              isDarkMode
                ? "bg-red-800 hover:bg-red-700"
                : "bg-red-500 hover:bg-red-400"
            }`}
          >
            <LogOut className="w-5 h-5" />
            <Logout />
          </button>
        </div>
      </aside>
    </div>
  );
};

Sidebar.propTypes = {
  userRole: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default Sidebar;
