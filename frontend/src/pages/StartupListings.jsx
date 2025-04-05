import { useContext, useState } from "react";
import { DarkModeContext } from "../components/DarkModeContext";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function StartupListing() {
  const { darkMode } = useContext(DarkModeContext);

  // Sidebar control & role
  const [isOpen, setIsOpen] = useState(true);
  const userRole = "admin"; // Update as needed

  const startups = [
    {
      id: 1,
      name: "AgroTech Solutions",
      category: "Agriculture",
      founder: "John Doe",
      fundingStage: "Seed",
    },
    {
      id: 2,
      name: "HealthNet AI",
      category: "Healthcare",
      founder: "Jane Smith",
      fundingStage: "Series A",
    },
    {
      id: 3,
      name: "GreenCharge",
      category: "Energy",
      founder: "Michael Brown",
      fundingStage: "Pre-Seed",
    },
    {
      id: 4,
      name: "LearnLoop",
      category: "EdTech",
      founder: "Alice Johnson",
      fundingStage: "Series B",
    },
    {
      id: 5,
      name: "QuickFleet",
      category: "Logistics",
      founder: "Emily Davis",
      fundingStage: "Series A",
    },
  ];

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen`}>
      <Header />
      <div className="flex">
        {/* Sidebar now receives parameters */}
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} userRole={userRole} />
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-6">Startup Listings</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {startups.map((startup) => (
              <div
                key={startup.id}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
              >
                <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-1">{startup.name}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <strong>Category:</strong> {startup.category}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <strong>Founder:</strong> {startup.founder}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <strong>Funding Stage:</strong> {startup.fundingStage}
                </p>
                <button className="text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default StartupListing;
