import user from "@/data/user";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useContext, useState } from "react";
import { DarkModeContext } from "@/components/DarkModeContext";

const ProfilePage = () => {
  const { isDarkMode } = useContext(DarkModeContext);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex transition-all duration-300 ease-in-out">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className={`p-6 transition-colors ${!isOpen ? "ml-16" : "ml-[16em]"} ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
        }`}
      >
        <Header />
        {/* Profile Header */}
        <div
          className={`shadow rounded-lg p-6 mb-6 ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="flex items-center">
            <img
              src={user.avatar}
              alt="User Avatar"
              className="w-24 h-24 rounded-full object-cover mr-6"
            />
            <div>
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="text-gray-400">{user.title}</p>
              <p className="mt-2 text-green-400 font-semibold">{user.status}</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* About Section */}
          <div
            className={`shadow rounded-lg p-6 ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h2 className="text-2xl font-bold mb-4">About Me</h2>
            <p className="mb-4">{user.summary}</p>
            <div className="mb-4">
              <h3 className="font-semibold">Contact Information</h3>
              <p className="text-gray-400">Location: {user.location}</p>
              <p className="text-gray-400">Email: {user.email}</p>
              <p className="text-gray-400">Phone: {user.phone}</p>
            </div>
            <div>
              <h3 className="font-semibold">Skills</h3>
              <ul className="flex flex-wrap mt-2">
                {user.skills.map((skill, index) => (
                  <li
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm mr-2 mb-2 ${
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
            <div className="mt-4">
              <h3 className="font-semibold">Certifications</h3>
              <ul className="list-disc list-inside mt-2 text-gray-400">
                {user.certifications.map((cert, index) => (
                  <li key={index}>{cert}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Experience & Portfolio Section */}
          <div
            className={`shadow rounded-lg p-6 ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h2 className="text-2xl font-bold mb-4">Experience</h2>
            {user.experiences.map((exp) => (
              <div key={exp.id} className="mb-4 border-b pb-4 border-gray-600">
                <h3 className="text-xl font-semibold">{exp.role}</h3>
                <p className="text-gray-400">
                  {exp.company} | {exp.duration}
                </p>
                <p className="mt-2">{exp.description}</p>
              </div>
            ))}

            <h2 className="text-2xl font-bold mt-6 mb-4">Portfolio</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {user.portfolio.map((item) => (
                <a
                  key={item.id}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block rounded-lg overflow-hidden hover:shadow-lg transition-shadow ${
                    isDarkMode
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-medium">{item.title}</h3>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
