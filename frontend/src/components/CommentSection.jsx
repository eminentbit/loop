import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ThumbsUp } from "lucide-react";
import ReportModal from "./ReportModal";
import axios from "axios";

const CommentSection = ({ postId, onClose }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportTarget, setReportTarget] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/feed/comments/${postId}/`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        console.log(data);
        // Expecting API to return likes count and liked_by_user boolean
        setComments(
          data.map((c) => ({
            ...c,
            likes: c.likes || 0,
            likedByUser: c.liked_by_user || c.likedByUser || false,
          }))
        );
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [postId]);

  const handlePost = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/feed/comments/${postId}/create/`,
        { content: newComment },
        {
          withCredentials: true,
        }
      );

      const added = response.data;
      setComments((prev) => [
        ...prev,
        { ...added, likes: added.likes || 0, likedByUser: false },
      ]);
      setNewComment("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleLikeToggle = async (commentId) => {
    const comment = comments.find((c) => c.id === commentId);
    if (!comment) return;

    try {
      const endpoint = `/feed/comments/${commentId}/like/`;
      await axios.put(
        `${import.meta.env.VITE_API_URL}${endpoint}`,
        {},
        {
          withCredentials: true,
        }
      );
      setComments((prev) =>
        prev.map((c) =>
          c.id === commentId
            ? {
                ...c,
                likedByUser: !c.likedByUser,
                likes: c.likes + (c.likedByUser ? -1 : 1),
              }
            : c
        )
      );
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleReportClick = (commentId) => {
    setReportTarget(commentId);
    setReportModalOpen(true);
  };

  const handleConfirmReport = async () => {
    try {
      await fetch(
        `${import.meta.env.VITE_API_URL}/feed/comments/${reportTarget}/report/`,
        {
          credentials: "include",
        }
      );
      // Optionally update comment or remove
      setReportModalOpen(false);
      setReportTarget(null);
      alert("Comment reported.");
    } catch (error) {
      console.error("Error reporting comment:", error);
    }
  };

  const handleCancelReport = () => {
    setReportModalOpen(false);
    setReportTarget(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-4 h-full flex flex-col">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-lg font-semibold">Comments</h4>
        <button
          onClick={onClose}
          className="text-sm text-gray-500 hover:text-red-500"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pr-2 mb-4">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-sm">No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-gray-100 dark:bg-gray-700 p-3 rounded-xl text-sm flex flex-col space-y-2"
            >
              <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-300">
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  @{comment.user?.username || "Anonymous"}
                </span>
                <span>{new Date(comment.createdAt).toLocaleString()}</span>
              </div>
              <div className="text-gray-800 dark:text-gray-100">
                {typeof comment.content === "string"
                  ? comment.content
                  : JSON.stringify(comment.content)}
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                <button
                  onClick={() => handleLikeToggle(comment.id)}
                  className="hover:text-blue-500 transition flex items-center space-x-1"
                >
                  <span>
                    {comment.likedByUser ? (
                      <ThumbsUp fill="currentColor" className="w-4 h-4" />
                    ) : (
                      <ThumbsUp className="w-4 h-4" />
                    )}
                  </span>
                  <span>{comment.likes}</span>
                </button>
                <button
                  onClick={() => handleReportClick(comment.id)}
                  className="hover:text-red-500 transition"
                >
                  🚩 Report
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* New Comment Input */}
      <div className="mt-auto">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={2}
          placeholder="Write a comment..."
          className="w-full p-2 border rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handlePost}
          className="mt-2 w-full bg-blue-600 text-white text-sm py-2 rounded-md hover:bg-blue-700 transition"
        >
          Post
        </button>
      </div>

      {/* Report Confirmation Modal */}
      {reportModalOpen && (
        <ReportModal
          handleCancelReport={handleCancelReport}
          handleConfirmReport={handleConfirmReport}
        />
      )}
    </div>
  );
};

CommentSection.propTypes = {
  postId: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CommentSection;
