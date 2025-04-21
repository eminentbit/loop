import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ThumbsUp, Flag, X } from "lucide-react";
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
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/feed/comments/${postId}/create/`,
        { content: newComment },
        {
          withCredentials: true,
        }
      );

      if (!res.status === 200) throw new Error("Failed to post comment");

      const added = res.data;
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
      setReportModalOpen(false);
      setReportTarget(null);
      alert("Comment reported successfully.");
    } catch (error) {
      console.error("Error reporting comment:", error);
    }
  };

  const handleCancelReport = () => {
    setReportModalOpen(false);
    setReportTarget(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-5 h-full flex flex-col border border-gray-200 dark:border-gray-700 transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-xl font-semibold text-gray-800 dark:text-white">Comments</h4>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-red-500 transition"
          title="Close"
        >
          <X size={20} />
        </button>
      </div>

      {/* Comment List */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-4 mb-4 custom-scrollbar">
        {comments.length === 0 ? (
          <p className="text-sm text-gray-500 text-center">No comments yet. Be the first to comment.</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl text-sm shadow-sm space-y-2"
            >
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-300">
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  @{comment.user?.username || "Anonymous"}
                </span>
                <span>{new Date(comment.createdAt).toLocaleString()}</span>
              </div>
              <p className="text-gray-800 dark:text-gray-100">{comment.content}</p>
              <div className="flex items-center gap-5 mt-1 text-xs text-gray-500 dark:text-gray-400">
                <button
                  onClick={() => handleLikeToggle(comment.id)}
                  className="flex items-center gap-1 hover:text-blue-600 transition"
                >
                  <ThumbsUp
                    className={`w-4 h-4 ${
                      comment.likedByUser ? "text-blue-600 fill-blue-600" : ""
                    }`}
                  />
                  <span>{comment.likes}</span>
                </button>
                <button
                  onClick={() => handleReportClick(comment.id)}
                  className="flex items-center gap-1 hover:text-red-500 transition"
                >
                  <Flag className="w-4 h-4" />
                  <span>Report</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* New Comment Input */}
      <div className="mt-3">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={2}
          placeholder="Write a comment..."
          className="w-full text-sm px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-900 dark:text-white resize-none transition"
        />
        <button
          onClick={handlePost}
          className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-lg font-semibold transition"
        >
          Post Comment
        </button>
      </div>

      {/* Report Modal */}
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
