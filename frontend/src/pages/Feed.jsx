import { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { DarkModeContext } from "../components/DarkModeContext";
import PostCard from "../components/PostCard";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import CreatePost from "../components/CreatePost";
// import { samplePosts } from "../data/posts";
// import { sampleInsights } from "../data/insights"; // Keep if needed elsewhere
import CommentSection from "../components/CommentSection"; // Assuming this component can take a postId and an onClose handler

const Feed = ({ userRole }) => {
  const { isDarkMode } = useContext(DarkModeContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  // --- State Change ---
  // Store the ID of the post whose comments are open, or null
  const [openedCommentPostId, setOpenedCommentPostId] = useState(null);
  // --- End State Change ---
  const [error, setError] = useState(null);

  const [isOpen, setIsOpen] = useState(() => {
    const storedValue = localStorage.getItem("sidebarOpen");
    return storedValue ? JSON.parse(storedValue) : true;
  });

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(isOpen));
  }, [isOpen]);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
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

  // --- Handler Function ---
  // Toggles the comment section for a specific post ID
  const handleToggleComments = (postId) => {
    setOpenedCommentPostId((prevId) => (prevId === postId ? null : postId));
  };
  // --- End Handler Function ---

  // --- Close Handler for CommentSection ---
  const handleCloseComments = () => {
    setOpenedCommentPostId(null);
  };
  // --- End Close Handler ---

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      } min-h-screen transition-colors duration-300`}
    >
      {/* Header position depends on sidebar state */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 ${
          isOpen ? "lg:ml-64" : "lg:ml-20"
        } ml-20 transition-all duration-300`}
      >
        {/* Added fixed positioning and z-index */}
        <div className="px-6">
          {" "}
          {/* Container for padding */}
          <Header userRole={userRole} />
        </div>
      </div>

      <div className="flex pt-16">
        {" "}
        {/* Added pt-16 (adjust as needed based on Header height) */}
        {/* Sidebar position is fixed */}
        <Sidebar userRole={userRole} isOpen={isOpen} setIsOpen={setIsOpen} />
        {/* Main content area adjusts margin based on sidebar state */}
        <div
          className={`flex-1 p-6 grid grid-cols-1 md:grid-cols-3 gap-6 ${
            isOpen ? "lg:ml-64" : "lg:ml-20" // Adjusted margin based on sidebar state
          } ml-20 transition-all duration-300`} // Added base ml-20 for small screens and transition
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
                posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    // --- Pass handler to PostCard ---
                    onToggleComments={() => handleToggleComments(post.id)}
                    // Optionally pass if comments are open for this post for styling in PostCard
                    areCommentsOpen={openedCommentPostId === post.id}
                    // --- End Pass handler ---
                  />
                ))
              )}
            </div>
          </main>

          {/* --- Aside/Comment Section Rendering Logic --- */}
          {/* Render aside only if a post's comments are meant to be open */}
          {openedCommentPostId !== null && (
            <aside className="hidden md:block md:col-span-1 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
              {/* Added sticky positioning and height/overflow control */}
              {/* Pass the postId and a close handler to CommentSection */}
              {/* Assuming CommentSection accepts postId and onClose props */}
              <CommentSection
                postId={openedCommentPostId}
                onClose={handleCloseComments}
              />
            </aside>
          )}
          {/* --- End Aside/Comment Section Rendering Logic --- */}
        </div>
      </div>
    </div>
  );
};

Feed.propTypes = {
  userRole: PropTypes.string,
};

// CareerInsights component remains unchanged unless needed
const CareerInsights = ({ insights }) => {
  // ... (keep existing CareerInsights code)
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
