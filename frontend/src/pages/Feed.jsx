import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { DarkModeContext } from "../components/DarkModeContext";
import PostCard from "../components/PostCard";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import CreatePost from "@/components/CreatePost";

const samplePosts = [
  {
    id: 1,
    username: "JohnDoe",
    profilePic: "https://i.pravatar.cc/150?img=1",
    timestamp: "2 hours ago",
    content: "Excited to start my new job! 🚀 #CareerGrowth",
    likes: 34,
    comments: 5,
    media: [], // No media
  },
  {
    id: 2,
    username: "JaneSmith",
    profilePic: "https://i.pravatar.cc/150?img=2",
    timestamp: "Yesterday",
    content: "Just finished a great book on UX design. Highly recommended! 📖",
    likes: 22,
    comments: 3,
    media: [{ type: "image", url: "https://via.placeholder.com/600x400" }],
  },
  {
    id: 3,
    username: "TechGuru",
    profilePic: "https://i.pravatar.cc/150?img=3",
    timestamp: "3 days ago",
    content: "React 19 is coming! Can't wait to explore the new features! ⚛️",
    likes: 50,
    comments: 10,
    media: [
      { type: "video", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
    ],
  },
];

const sampleInsights = [
  {
    id: 1,
    title: "Real-Time Job Matches",
    description: "5 new opportunities matching your skills have been found.",
  },
  {
    id: 2,
    title: "Skill Gap Alert",
    description:
      "Your profile shows a gap in Data Analytics. Consider taking a course.",
  },
  {
    id: 3,
    title: "Networking Opportunity",
    description:
      "Connect with industry experts to expand your professional network.",
  },
];

const Feed = () => {
  const { isDarkMode } = useContext(DarkModeContext);
  const [posts] = useState(samplePosts);
  const [isOpen, setIsopen] = useState(false);

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      } min-h-screen transition-colors duration-300`}
    >
      {/* Global Header */}
      <div className={`ml-20 px-6 ${isOpen ? "lg:ml-64" : "lg:ml-20"}`}>
        <Header />
      </div>

      <div className="flex max-w-7xl mx-auto pt-4">
        {/* Global Sidebar (Navigation) */}
        <Sidebar userRole="jobseeker" isOpen={isOpen} setIsOpen={setIsopen} />

        {/* Main Content Area */}
        <div
          className={`flex-1 p-6 grid grid-cols-1 md:grid-cols-3 gap-6 ${
            isOpen ? "lg:ml-64" : "lg:ml-16"
          }`}
        >
          {/* Center Panel: Create Post + Feed Posts */}
          <main className="md:col-span-2">
            <CreatePost />
            <div className="space-y-8 mt-8">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </main>

          {/* Right Panel: Career Insights */}
          <aside className="hidden md:block">
            <CareerInsights insights={sampleInsights} />
          </aside>
        </div>
      </div>
    </div>
  );
};

const CareerInsights = ({ insights }) => {
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      } rounded-lg shadow-lg p-6 transition-all duration-300`}
    >
      <h2 className="text-2xl font-semibold mb-6">Career Insights</h2>
      <ul className="space-y-6">
        {insights.map((item) => (
          <li
            key={item.id}
            className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0"
          >
            <p className="text-lg font-semibold">{item.title}</p>
            <p className="text-sm mt-1">{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

CareerInsights.propTypes = {
  insights: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Feed;
