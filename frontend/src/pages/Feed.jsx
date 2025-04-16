import { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { DarkModeContext } from "../components/DarkModeContext";
import PostCard from "../components/PostCard";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import CreatePost from "../components/CreatePost";
// import { samplePosts } from "../data/posts";
import { sampleInsights } from "../data/insights";

// import { sampleInsights } if you still want to keep insights static

const Feed = ({ userRole }) => {
  const { isDarkMode } = useContext(DarkModeContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isOpen, setIsOpen] = useState(() => {
    const storedValue = localStorage.getItem("sidebarOpen");
    return storedValue ? JSON.parse(storedValue) : true;
  });

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(isOpen));
  }, [isOpen]);

  // Fetch posts from API
  const fetchPosts = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/feed/posts/`
      );
      if (!response.ok) throw new Error("Failed to fetch posts.");
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      } min-h-screen transition-colors duration-300`}
    >
      <div className={`ml-20 px-6 ${isOpen ? "lg:ml-64" : "lg:ml-20"}`}>
        <Header userRole={userRole} />
      </div>

      <div className="flex max-w-7xl mx-auto pt-4">
        <Sidebar userRole={userRole} isOpen={isOpen} setIsOpen={setIsOpen} />

        <div
          className={`flex-1 p-6 grid grid-cols-1 md:grid-cols-3 gap-6 ${
            isOpen ? "lg:ml-64" : "lg:ml-16"
          }`}
        >
          <main className="md:col-span-2">
            <CreatePost refreshPosts={fetchPosts} />
            <div className="space-y-8 mt-8">
              {loading ? (
                <p>Loading posts...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : posts.length === 0 ? (
                <p>No posts available.</p>
              ) : (
                posts.map((post) => <PostCard key={post.id} post={post} />)
              )}
            </div>
          </main>

          <aside className="hidden md:block">
            <CareerInsights insights={sampleInsights} />
          </aside>
        </div>
      </div>
    </div>
  );
};

Feed.propTypes = {
  userRole: PropTypes.string,
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
