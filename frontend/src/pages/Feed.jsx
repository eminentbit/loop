import { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { DarkModeContext } from "../components/DarkModeContext";
import PostCard from "../components/PostCard";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import CreatePost from "../components/CreatePost";
import CommentSection from "../components/CommentSection";
// import CareerInsights from "../components/CareerInsights";

const Feed = ({ userRole }) => {
  const { isDarkMode } = useContext(DarkModeContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openedCommentPostId, setOpenedCommentPostId] = useState(null);

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

  const handleToggleComments = (postId) => {
    setOpenedCommentPostId((prevId) => (prevId === postId ? null : postId));
  };

  const handleCloseComments = () => {
    setOpenedCommentPostId(null);
  };

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      } min-h-screen transition-colors duration-300`}
    >
      <div
        className={`fixed top-0 left-0 right-0 z-40 ${
          isOpen ? "lg:ml-64" : "lg:ml-20"
        } ml-20 transition-all duration-300`}
      >
        <div className="px-6 pb-5">
          <Header userRole={userRole} />
        </div>
      </div>

      <div className="flex pt-16">
        <Sidebar userRole={userRole} isOpen={isOpen} setIsOpen={setIsOpen} />

        <div
          className={`flex-1 p-6 grid grid-cols-1 md:grid-cols-3 gap-6 mt-5 ${
            isOpen ? "lg:ml-64" : "lg:ml-20"
          } ml-20 transition-all duration-300`}
        >
          <main className="md:col-span-2 mt-5">
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
                    onToggleComments={() => handleToggleComments(post.id)}
                    areCommentsOpen={openedCommentPostId === post.id}
                  />
                ))
              )}
            </div>
          </main>

          <aside className="hidden md:block md:col-span-1 space-y-6 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
            {openedCommentPostId && (
              <CommentSection
                postId={openedCommentPostId}
                onClose={handleCloseComments}
              />
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};

Feed.propTypes = {
  userRole: PropTypes.string,
};

export default Feed;
