import { useState, useContext, useEffect } from "react";
import { DarkModeContext } from "../components/DarkModeContext";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import PropTypes from "prop-types";

function CandidatePool({ userRole }) {
  const { darkMode } = useContext(DarkModeContext);
  const [isOpen, setIsOpen] = useState(false);

  const candidates = [
    {
      id: 1,
      name: "John Doe",
      role: "Frontend Developer",
      experience: "3 years",
      skills: "React, Tailwind CSS, JavaScript",
      profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Backend Developer",
      experience: "5 years",
      skills: "Node.js, Express, MongoDB",
      profilePicture: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: 3,
      name: "Alice Johnson",
      role: "UI/UX Designer",
      experience: "4 years",
      skills: "Figma, Adobe XD, Sketch",
      profilePicture: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
      id: 4,
      name: "Michael Brown",
      role: "Full Stack Developer",
      experience: "6 years",
      skills: "React, Node.js, PostgreSQL",
      profilePicture: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
      id: 5,
      name: "Emily Davis",
      role: "DevOps Engineer",
      experience: "4 years",
      skills: "AWS, Docker, Kubernetes",
      profilePicture: "https://randomuser.me/api/portraits/women/5.jpg",
    },
    {
      id: 6,
      name: "Robert Wilson",
      role: "Product Manager",
      experience: "7 years",
      skills: "Agile, Scrum, Roadmapping",
      profilePicture: "https://randomuser.me/api/portraits/men/6.jpg",
    },
  ];

  useEffect(() => {
    localStorage.setItem("sidebarOpen", isOpen);
  }, [isOpen]);

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      } min-h-screen transition-colors duration-300 ease-in-out ${
        !isOpen ? "ml-16" : "ml-64"
      }`}
    >
      <Header />
      <div className="flex">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} userRole={userRole} />
        <main className="flex-1 p-6 mx-[15px]">
          <div className="mb-6">
            <h1
              className={`text-3xl font-bold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Candidate Pool
            </h1>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search candidates"
                className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-white text-gray-900 border-gray-300"
                }`}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {candidates.map((candidate) => (
              <div
                key={candidate.id}
                className={`shadow-sm rounded-md border p-6 hover:shadow-md transition-shadow ${
                  darkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="mb-4 flex items-center">
                  <img
                    src={candidate.profilePicture}
                    alt={candidate.name}
                    onError={(e) =>
                      (e.target.src = "https://via.placeholder.com/150")
                    }
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h2
                      className={`text-lg font-semibold ${
                        darkMode ? "text-blue-300" : "text-blue-700"
                      }`}
                    >
                      {candidate.name}
                    </h2>
                    <p
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {candidate.role}
                    </p>
                  </div>
                </div>
                <p
                  className={`text-sm mb-2 ${
                    darkMode ? "text-gray-300" : "text-gray-800"
                  }`}
                >
                  <strong>Experience:</strong> {candidate.experience}
                </p>
                <p
                  className={`text-sm mb-4 ${
                    darkMode ? "text-gray-300" : "text-gray-800"
                  }`}
                >
                  <strong>Skills:</strong> {candidate.skills}
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition">
                  View Profile
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

CandidatePool.propTypes = {
  userRole: PropTypes.string.isRequired,
};

export default CandidatePool;
