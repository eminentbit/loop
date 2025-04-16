import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const CommentSection = ({ postId, onClose }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    // Fetch comments for the postId
    const fetchComments = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/feed/posts/${postId}/comments/`
        );
        const data = await res.json();
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [postId]);

  const handlePost = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/feed/posts/${postId}/comments/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Adjust auth if needed
          },
          body: JSON.stringify({ content: newComment }),
        }
      );

      if (!response.ok) throw new Error("Failed to post comment");

      const added = await response.json();
      setComments((prev) => [...prev, added]);
      setNewComment("");
    } catch (error) {
      console.error(error);
    }
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
              className="bg-gray-100 dark:bg-gray-700 p-2 rounded-md text-sm"
            >
              {comment.content}
            </div>
          ))
        )}
      </div>

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
    </div>
  );
};

CommentSection.propTypes = {
  postId: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CommentSection;
