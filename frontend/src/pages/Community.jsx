import { useContext, useState, useEffect } from "react";
import CreateCommunityModal from "../components/CommunityCreationModal";
import CommunityCard from "../components/CommunityCard";
import CreateCommunityCard from "../components/CreateCommunityCard";
import { DarkModeContext } from "@/components/DarkModeContext";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import PropTypes from "prop-types";

const CommunityPage = ({ userRole }) => {
  const { isDarkMode } = useContext(DarkModeContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showExplore, setShowExplore] = useState(false);
  const [isOpen, setIsOpen] = useState(() => {
    const storedValue = localStorage.getItem("sidebarOpen");
    return storedValue ? JSON.parse(storedValue) : true;
  });

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(isOpen));
  }, [isOpen]);
  // eslint-disable-next-line no-unused-vars
  const [sortOption, setSortOption] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [filterVisibility, setFilterVisibility] = useState("all");

  // Updated Dummy Data with additional properties (Replace with API Data)
  const [allCommunities, setAllCommunities] = useState([
    {
      id: 1,
      name: "React Developers",
      description: "A place for React devs.",
      tags: ["React", "JavaScript"],
      isPublic: true,
      dateCreated: "2023-01-10",
      memberCount: 120,
    },
    {
      id: 2,
      name: "AI & Machine Learning",
      description: "Explore AI trends.",
      tags: ["AI", "ML"],
      isPublic: true,
      dateCreated: "2022-11-15",
      memberCount: 200,
    },
    {
      id: 3,
      name: "Cybersecurity Enthusiasts",
      description: "Security matters.",
      tags: ["Cybersecurity"],
      isPublic: false,
      dateCreated: "2023-03-05",
      memberCount: 80,
    },
  ]);

  // User Joined Communities (Replace with API logic)
  const [joinedCommunities, setJoinedCommunities] = useState([
    allCommunities[0],
  ]);

  // Handle Community Creation
  const handleCreateCommunity = (newCommunity) => {
    setJoinedCommunities([newCommunity, ...allCommunities]);
    setAllCommunities([newCommunity, ...allCommunities]);
  };

  // Handle Community Joining
  const handleJoinCommunity = (communityId) => {
    const community = allCommunities.find((c) => c.id === communityId);
    if (community && !joinedCommunities.some((c) => c.id === communityId)) {
      setJoinedCommunities([...joinedCommunities, community]);
    }
  };

  // Filter Communities by Search Query
  const filteredCommunities = allCommunities.filter(
    (community) =>
      community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  // Apply additional filter for public/private communities
  const visibleCommunities = filteredCommunities.filter((community) => {
    if (filterVisibility === "all") return true;
    if (filterVisibility === "public") return community.isPublic;
    if (filterVisibility === "private") return !community.isPublic;
    return true;
  });

  // Sort communities based on sortOption
  const sortedCommunities = visibleCommunities.sort((a, b) => {
    if (sortOption === "date") {
      return new Date(b.dateCreated) - new Date(a.dateCreated);
    } else if (sortOption === "members") {
      return b.memberCount - a.memberCount;
    }
    return 0;
  });

  // Determine communities to display
  const communitiesToDisplay = showExplore
    ? sortedCommunities
    : joinedCommunities;

  return (
    <div className="flex min-h-screen">
      <Sidebar userRole={userRole} isOpen={isOpen} setIsOpen={setIsOpen} />

      <div
        className={`flex-1 p-8 transition-colors ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
        } ${isOpen ? "ml-64" : "ml-16"}`}
      >
        <Header userRole={userRole} />
        <h1 className="text-3xl font-bold mb-4">
          {showExplore ? "Explore Communities" : "Your Communities"}
        </h1>

        {/* Full-width Stats Overview */}
        <div className="w-full bg-blue-100 dark:bg-blue-900 p-4 rounded-lg mb-6 flex flex-wrap justify-between">
          <div className="mb-2 sm:mb-0">
            <span className="font-bold">Total Communities:</span>{" "}
            {allCommunities.length}
          </div>
          <div className="mb-2 sm:mb-0">
            <span className="font-bold">Joined Communities:</span>{" "}
            {joinedCommunities.length}
          </div>
          <div className="mb-2 sm:mb-0">
            <span className="font-bold">Public:</span>{" "}
            {allCommunities.filter((c) => c.isPublic).length}
          </div>
          <div>
            <span className="font-bold">Private:</span>{" "}
            {allCommunities.filter((c) => !c.isPublic).length}
          </div>
        </div>

        {/* Search, Filters & Sorting */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search communities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 w-full sm:w-2/3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
          />

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Filter Button */}
            <button
              onClick={() =>
                setFilterVisibility(
                  filterVisibility === "all" ? "public" : "all"
                )
              }
              className="px-4 py-2 border rounded-md bg-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
            >
              {filterVisibility === "all" ? "Show Public" : "Show All"}
            </button>

            {/* Sorting Button */}
            <button
              onClick={() => {
                setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                // setSortOption(sortOption === "date" ? "members" : "date");
              }}
              className="px-4 py-2 border rounded-md flex items-center bg-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
            >
              {sortOption === "date"
                ? `Date (${sortOrder === "asc" ? "↑" : "↓"})`
                : `Members (${sortOrder === "asc" ? "↑" : "↓"})`}
            </button>

            {/* Create Community Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              + Create
            </button>
          </div>
        </div>

        {/* Community Cards Grid */}
        {communitiesToDisplay.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-12">
            <img
              src="/path/to/empty-state.png"
              alt="No Communities"
              className="w-1/2 mb-4"
            />
            <button
              onClick={() => setShowExplore(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
            >
              Explore Communities
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Create Community Card appears first */}
            {communitiesToDisplay.map((community, index) => (
              <CommunityCard
                key={index}
                community={community}
                onJoin={() => handleJoinCommunity(community.id)}
                isJoined={joinedCommunities.some((c) => c.id === community.id)}
              />
            ))}
            <CreateCommunityCard onCreate={() => setIsModalOpen(true)} />
          </div>
        )}

        {/* Toggle Explore Button */}
        <button
          onClick={() => setShowExplore(!showExplore)}
          className="mt-6 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
        >
          {showExplore ? "Back to Your Communities" : "Explore Communities"}
        </button>

        {/* Create Community Modal */}
        <CreateCommunityModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreateCommunity}
        />
      </div>
    </div>
  );
};

CommunityPage.propTypes = {
  userRole: PropTypes.string.isRequired,
};

export default CommunityPage;
