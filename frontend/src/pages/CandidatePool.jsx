import { useState, useContext } from "react";
import { DarkModeContext } from "../components/DarkModeContext";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function CandidatePool() {
  const { darkMode } = useContext(DarkModeContext);
  const [isOpen, setIsOpen] = useState(false);
  const userRole = "admin"; // Can be dynamic if needed

  const candidates = [
    {
      id: 1,
      name: "John Doe",
      role: "Frontend Developer",
      experience: "3 years",
      skills: "React, Tailwind CSS, JavaScript",
      profilePicture: "https://randomuser.me/api/portraits/men/1.jpg", // URL to profile picture
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Backend Developer",
      experience: "5 years",
      skills: "Node.js, Express, MongoDB",
      profilePicture: "https://randomuser.me/api/portraits/women/2.jpg", // URL to profile picture
    },
    {
      id: 3,
      name: "Alice Johnson",
      role: "UI/UX Designer",
      experience: "4 years",
      skills: "Figma, Adobe XD, Sketch",
      profilePicture: "https://randomuser.me/api/portraits/women/3.jpg", // URL to profile picture
    },
    {
      id: 4,
      name: "Michael Brown",
      role: "Full Stack Developer",
      experience: "6 years",
      skills: "React, Node.js, PostgreSQL",
      profilePicture: "https://randomuser.me/api/portraits/men/4.jpg", // URL to profile picture
    },
    {
      id: 5,
      name: "Emily Davis",
      role: "DevOps Engineer",
      experience: "4 years",
      skills: "AWS, Docker, Kubernetes",
      profilePicture: "https://randomuser.me/api/portraits/women/5.jpg", // URL to profile picture
    },
    {
      id: 6,
      name: "Robert Wilson",
      role: "Product Manager",
      experience: "7 years",
      skills: "Agile, Scrum, Roadmapping",
      profilePicture: "https://randomuser.me/api/portraits/men/6.jpg", // URL to profile picture
    },
  ];

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      } min-h-screen`}
    >
      <Header />
      <div className="flex">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} userRole={userRole} />
        <main className="flex-1 p-6 mx-[15px]">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-4">Candidate Pool</h1>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search candidates"
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {candidates.map((candidate) => (
              <div
                key={candidate.id}
                className="bg-white dark:bg-gray-800 shadow-sm rounded-md border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
              >
                <div className="mb-4 flex items-center">
                  <img
                    src={candidate.profilePicture}
                    alt={candidate.name}
                    onError={(e) => e.target.src = "https://via.placeholder.com/150"} // Fallback image
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                      {candidate.name}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {candidate.role}
                    </p>
                  </div>
                </div>
                <p className="text-sm mb-2">
                  <strong>Experience:</strong> {candidate.experience}
                </p>
                <p className="text-sm mb-4">
                  <strong>Skills:</strong> {candidate.skills}
                </p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
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

export default CandidatePool;
