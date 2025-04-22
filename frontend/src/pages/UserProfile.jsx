import user from "@/data/user";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useContext, useState, useEffect } from "react";
import { DarkModeContext } from "@/components/DarkModeContext";
import PropTypes from "prop-types";
import {
  MapPin,
  Mail,
  Phone,
  Award,
  Briefcase,
  FileText,
  CheckCircle,
  Link as LinkIcon,
  User as UserIcon,
} from "lucide-react";

const ProfilePage = ({ userRole }) => {
  const { isDarkMode } = useContext(DarkModeContext);
  const [isOpen, setIsOpen] = useState(() => {
    const storedValue = localStorage.getItem("sidebarOpen");
    return storedValue ? JSON.parse(storedValue) : true;
  });

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(isOpen));
  }, [isOpen]);

  return (
    <div
      className={`min-h-screen w-full flex transition-all duration-300 ease-in-out ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-950 via-gray-900 to-blue-900"
          : "bg-gradient-to-br from-blue-100 via-gray-50 to-white"
      }`}
    >
      <Sidebar userRole={userRole} isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className={`flex-1 min-h-screen transition-colors duration-300 ${
          !isOpen ? "ml-16" : "ml-[16em]"
        }`}
      >
        <Header userRole={userRole} />
        {/* Profile Header */}
        <div
          className={`
            shadow-xl rounded-2xl p-8 mb-8 flex items-center gap-8 border
            ${isDarkMode
              ? "bg-gray-900/80 border-gray-800"
              : "bg-white/90 border-blue-200"}
            backdrop-blur-md
            animate-fadeIn
          `}
        >
          <div className="relative">
            <img
              src={user.avatar}
              alt="User Avatar"
              className="w-28 h-28 rounded-full object-cover shadow-lg border-4 border-blue-500"
            />
            {/* Animated online status (if online) */}
            {user.status?.toLowerCase() === "available" && (
              <span className="absolute bottom-2 right-3 flex h-5 w-5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-5 w-5 bg-green-500 border-2 border-white dark:border-gray-900"></span>
              </span>
            )}
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold flex items-center gap-2">
              <UserIcon size={28} className="text-blue-600 dark:text-blue-400" />
              {user.name}
            </h1>
            <p className="text-gray-400 text-lg">{user.title}</p>
            <p className="mt-2 text-green-400 font-semibold">{user.status}</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10 px-2 md:px-0 animate-fadeIn">
          {/* About Section */}
          <section
            className={`
              shadow-xl rounded-2xl p-8 border
              ${isDarkMode
                ? "bg-gray-900/80 border-gray-800"
                : "bg-white/90 border-blue-200"}
              backdrop-blur-md
              transition-all
            `}
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FileText className="text-blue-600 dark:text-blue-400" size={22} />
              About Me
            </h2>
            <p className="mb-4 text-base">{user.summary}</p>
            <div className="mb-6">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Mail className="text-blue-500" size={18} /> Contact Information
              </h3>
              <div className="flex flex-col gap-1 text-gray-500 dark:text-gray-400 text-sm pl-1">
                <span className="flex items-center gap-1">
                  <MapPin className="inline mr-1 text-blue-400" size={16} /> {user.location}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="inline mr-1 text-blue-400" size={16} />
                  {user.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="inline mr-1 text-blue-400" size={16} />
                  {user.phone}
                </span>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <CheckCircle className="text-blue-500" size={18} /> Skills
              </h3>
              <ul className="flex flex-wrap gap-2 mt-2">
                {user.skills.map((skill, index) => (
                  <li
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm font-semibold shadow transition
                      ${
                        isDarkMode
                          ? "bg-blue-900 text-blue-300"
                          : "bg-blue-100 text-blue-800"
                      }`}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Award className="text-blue-500" size={18} /> Certifications
              </h3>
              <ul className="flex flex-col gap-1 mt-2">
                {user.certifications.map((cert, index) => (
                  <li
                    key={index}
                    className={`flex items-center gap-2 text-sm pl-1
                      ${isDarkMode ? "text-blue-200" : "text-blue-800"}`}
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-400 inline-block"></span>
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Experience & Portfolio Section */}
          <section
            className={`
              shadow-xl rounded-2xl p-8 border
              ${isDarkMode
                ? "bg-gray-900/80 border-gray-800"
                : "bg-white/90 border-blue-200"}
              backdrop-blur-md
              transition-all
            `}
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Briefcase className="text-blue-600 dark:text-blue-400" size={22} />
              Experience
            </h2>
            {user.experiences.map((exp) => (
              <div
                key={exp.id}
                className={`
                  mb-6 pb-6 border-b
                  ${isDarkMode ? "border-gray-700" : "border-blue-100"}
                  last:mb-0 last:pb-0 last:border-b-0
                `}
              >
                <h3 className="text-xl font-semibold">{exp.role}</h3>
                <p className="text-gray-400">
                  {exp.company} <span className="mx-1">|</span> {exp.duration}
                </p>
                <p className="mt-2 text-base">{exp.description}</p>
              </div>
            ))}

            <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-2">
              <LinkIcon className="text-blue-600 dark:text-blue-400" size={22} />
              Portfolio
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {user.portfolio.map((item) => (
                <a
                  key={item.id}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    block rounded-xl overflow-hidden shadow-lg border transition
                    relative group
                    ${isDarkMode
                      ? "bg-gray-800 hover:bg-gray-700 border-gray-700"
                      : "bg-gray-100 hover:bg-blue-100 border-blue-100"}
                  `}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-40 object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                  {/* Overlay */}
                  <div
                    className={`
                      absolute inset-0 bg-gradient-to-t
                      ${isDarkMode
                        ? "from-blue-950/80 via-gray-900/60 to-transparent"
                        : "from-blue-200/60 via-white/40 to-transparent"}
                      opacity-0 group-hover:opacity-90 transition-opacity duration-200
                      flex flex-col justify-end
                    `}
                  >
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-white drop-shadow">{item.title}</h3>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        </div>
        {/* Animation */}
        <style>
          {`
            .animate-fadeIn {
              animation: fadeIn 0.7s;
            }
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(30px);}
              to { opacity: 1; transform: translateY(0);}
            }
          `}
        </style>
      </div>
    </div>
  );
};

ProfilePage.propTypes = {
  userRole: PropTypes.string.isRequired,
};

export default ProfilePage;