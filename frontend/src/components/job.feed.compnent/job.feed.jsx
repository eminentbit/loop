import { useState, useEffect } from "react";
import Navbar from "src/components/job.page.component/ui/Navbar";
import FeedPost from "./FeedPost";
import CreatePost from "src/components/CreatePost";
import { PlusCircle } from "lucide-react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import ConfirmationModal from "../ConfirmationModal";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [openMedia, setOpenMedia] = useState(false);

  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/feed/posts/`,
        { withCredentials: true }
      );
      setPosts(data);
      console.log(data);
    } catch (err) {
      setError(err.message || "Failed to fetch posts.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleComment = (postId, comment) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, comment] }
          : post
      )
    );
  };

  const handleReply = (postId, commentId, reply) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        return {
          ...post,
          comments: post.comments.map((c) =>
            c.id === commentId
              ? { ...c, replies: [...(c.replies || []), reply] }
              : c
          ),
        };
      })
    );
  };

  const toggleCreate = () => setIsCreatingPost((prev) => !prev);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4  max-w-3xl py-20">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-indigo-600">Your Feed</h1>
            <p className="text-gray-500">
              Discover opportunities and connect with your network
            </p>
          </div>
          <button
            onClick={toggleCreate}
            className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-4 py-2 rounded-lg transition-shadow shadow-md hover:shadow-lg focus:outline-none"
          >
            <PlusCircle size={20} />
            <span>{isCreatingPost ? "Cancel" : "Create Post"}</span>
          </button>
        </div>

        <AnimatePresence>
          {isCreatingPost && (
            <motion.div
              key="create-post"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
            >
              <CreatePost onPostSuccess={fetchPosts} setOpen={setOpenMedia} />
            </motion.div>
          )}
        </AnimatePresence>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin h-12 w-12 border-4 border-indigo-500 border-t-transparent rounded-full"></div>
          </div>
        ) : error ? (
          <p className="text-center text-red-500 py-8">{error}</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <FeedPost
                  post={post}
                  onComment={handleComment}
                  onReply={handleReply}
                  refreshPosts={fetchPosts}
                />
              </motion.div>
            ))}
            <ConfirmationModal open={openMedia} />
          </div>
        )}
      </div>
    </div>
  );
}
