import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { MessageCircle, Send, ThumbsUp, Share2 } from "lucide-react";
import PropTypes from "prop-types";
import DefaultImage from "../../assets/default-profile.png";
import LikeButton from "../LikeButton";
import axios from "axios";
import ShareModal from "../ShareModal";

export default function FeedPost({
  post,
  onReply,
  onCommentLike,
  onReplyLike,
}) {
  const [commentText, setCommentText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [comments, setComments] = useState([]);
  const [isMe, setIsMe] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const postId = post.id;
    const fetchComments = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/feed/comments/${postId}/`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();

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
  }, [post]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!commentText.trim()) return;
    try {
      const postId = post.id;
      console.log({ content: commentText });
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/feed/comments/${postId}/create/`,
        { content: commentText },
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
      setCommentText("");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const checkIfMe = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/profile/`,
          {
            withCredentials: true,
          }
        );

        if (response.data.user.id === post.userId) {
          setIsMe(true);
        }
      } catch (err) {
        console.log(err.response?.data?.error || "Error checking profile");
      }
    };

    checkIfMe();
  }, [post.userId, post]);

  const handleSubmitReply = (commentId) => {
    if (!replyText.trim()) return;

    onReply(post.id, commentId, replyText);
    setReplyText("");
    setReplyingTo(null);
  };

  const handleShowComments = () => {
    setShowComments(!showComments);
  };

  // Format the posted date
  const getFormattedDate = (dateString) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      console.log(error);
      return "recently";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Post Header */}
      <div className="p-4 border-b border-gray-100 flex items-center">
        <img
          src={post.user.image ? post.user.image : DefaultImage}
          alt={post.user.fullName}
          className="h-10 w-10 rounded-full mr-3"
        />
        <div>
          <h3 className="font-semibold text-gray-800">
            {!isMe ? post.user.fullName : "You"}
          </h3>
          <p className="text-xs text-gray-500">
            {getFormattedDate(post.createdAt)}
          </p>
        </div>
      </div>

      {/* Post Content */}
      <div className="p-4">
        <div className="whitespace-pre-line">{post.content}</div>

        {/* Job Specific Details */}
        {post.type === "job" && post.originalData && (
          <div className="mt-4 bg-gray-50 p-3 rounded-md">
            <div className="flex items-center mb-2">
              {post.originalData.companyLogo && (
                <img
                  src={post.originalData.companyLogo}
                  alt={post.originalData.company?.name || "Company"}
                  className="h-8 w-8 mr-2"
                />
              )}
              <span className="font-medium">
                {post.originalData.company?.name || "Company"}
              </span>
            </div>

            {post.originalData.salary && (
              <div className="text-sm text-gray-700 mb-1">
                <span className="font-medium">Salary:</span>{" "}
                {post.originalData.salary}
              </div>
            )}

            {post.originalData.applyUrl && (
              <a
                href={post.originalData.applyUrl}
                className="mt-2 inline-block bg-indigo-500 hover:bg-indigo-600 text-white rounded px-4 py-2 text-sm font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply Now
              </a>
            )}
          </div>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Post Footer - Engagement Stats */}
      {/* <div className="px-4 py-2 border-t border-gray-100 flex items-center text-sm text-gray-500">
        <div className="flex items-center">
          <ThumbsUp size={14} className="text-indigo-500" />
          <span className="ml-1">{post.likes || 0}</span>
        </div>
        <div className="ml-4 cursor-pointer" onClick={handleShowComments}>
          <span>{post.comments.length} comments</span>
        </div>
      </div> */}

      {/* Post Actions */}
      <div className="px-4 py-2 border-t border-gray-100 flex justify-between">
        <div className="flex items-center justify-center mx-auto">
          <LikeButton
            feedId={post.id}
            initialLiked={post.isLikedByUser}
            likes={post.likesCount}
          />
        </div>

        <button
          onClick={handleShowComments}
          className="flex items-center justify-center w-1/3 py-2 hover:bg-gray-50 rounded-md text-gray-700"
        >
          <MessageCircle size={18} className="text-gray-500" />
          {post.comments.length}
          <span className="ml-2">Comment</span>
        </button>

        <button
          type="button"
          className="flex items-center justify-center w-1/3 py-2 hover:bg-gray-50 rounded-md text-gray-700"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <Share2 size={18} className="text-gray-500" />
          <span className="ml-2">Share</span>
        </button>
      </div>

      {isOpen && (
        <ShareModal
          url={`${window.location}/feed?${post.id}`}
          onClose={() => {
            setIsOpen(false);
          }}
        />
      )}

      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-gray-100">
          {/* Add Comment Form */}
          <form onSubmit={handleSubmitComment} className="p-4 flex">
            <img
              src={post.user.image ?? DefaultImage}
              alt="Current user"
              className="h-8 w-8 rounded-full mr-2"
            />
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full border border-gray-300 rounded-full py-2 px-4 pr-10 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                type="submit"
                disabled={!commentText.trim()}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-indigo-500 disabled:text-gray-300"
              >
                <Send size={18} />
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="px-4 pb-4 space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="pl-10">
                {/* Comment */}
                <div className="flex mb-2">
                  <img
                    src={comment.user.profile ?? DefaultImage}
                    alt={comment.user.username ?? "Comment Name"}
                    className="h-8 w-8 rounded-full mr-2"
                  />
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-lg px-3 py-2">
                      <div className="text-[1em] font-bold">
                        {!isMe ? comment.user.username : "You"}
                      </div>
                      <div className="text-sm">{comment.content}</div>
                    </div>
                    {/* Comment Actions */}
                    <div className="flex items-center text-xs mt-1 space-x-3 text-gray-500">
                      <span className="text-xs text-gray-500">
                        {getFormattedDate(comment.createdAt)}
                      </span>

                      <button
                        onClick={() => {
                          onCommentLike(comment.id);
                          comment.likedByUser = !comment.likedByUser;
                          comment.likes += comment.likedByUser ? 1 : -1;
                        }}
                        className={`flex items-center hover:text-indigo-600 ${
                          comment.likedByUser ? "text-indigo-600" : ""
                        }`}
                      >
                        <ThumbsUp
                          size={12}
                          className="mr-1"
                          fill={comment.likedByUser ? "currentColor" : "none"}
                        />
                        <span>Like</span>
                        {comment.likes > 0 && (
                          <span className="ml-1">({comment.likes})</span>
                        )}
                      </button>

                      <button
                        onClick={() => setReplyingTo(comment.id)}
                        className="hover:text-indigo-600"
                      >
                        Reply
                      </button>
                    </div>
                    {/* Reply Form */}
                    {replyingTo === comment.id && (
                      <div className="mt-2 flex">
                        <img
                          src={comment.user.profile ?? DefaultImage}
                          alt="Current user"
                          className="h-6 w-6 rounded-full mr-2"
                        />
                        <div className="flex-1 relative">
                          <input
                            type="text"
                            placeholder="Write a reply..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            className="w-full border border-gray-300 rounded-full py-1 px-3 pr-8 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                          <button
                            onClick={() => handleSubmitReply(comment.id)}
                            disabled={!replyText.trim()}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-indigo-500 disabled:text-gray-300"
                          >
                            <Send size={14} />
                          </button>
                        </div>
                      </div>
                    )}
                    {/* Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="flex">
                            <img
                              src={reply ? reply.user.profile : DefaultImage}
                              alt={reply ? reply.user.name : "Replied User"}
                              className="h-6 w-6 rounded-full mr-2"
                            />
                            <div className="flex-1">
                              <div className="bg-gray-100 rounded-lg px-3 py-2">
                                <div className="font-medium text-xs">
                                  {reply.author.name}
                                </div>
                                <div className="text-xs">{reply.content}</div>
                              </div>

                              {/* Reply Actions */}
                              <div className="flex items-center text-xs mt-1 space-x-3 text-gray-500">
                                <span className="text-xs text-gray-500">
                                  {getFormattedDate(reply.postedAt)}
                                </span>

                                <button
                                  onClick={() =>
                                    onReplyLike(post.id, comment.id, reply.id)
                                  }
                                  className="flex items-center hover:text-indigo-600"
                                >
                                  <ThumbsUp size={10} className="mr-1" />
                                  <span>Like</span>
                                  {reply.likes > 0 && (
                                    <span className="ml-1">
                                      ({reply.likes})
                                    </span>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

FeedPost.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    user: PropTypes.object,
    userId: PropTypes.string,
    createdAt: PropTypes.string,
    content: PropTypes.string,
    type: PropTypes.string,
    originalData: PropTypes.object,
    tags: PropTypes.object,
    likes: PropTypes.number,
    comments: PropTypes.object,
    isLiked: PropTypes.bool,
    likesCount: PropTypes.number,
    isLikedByUser: PropTypes.bool,
  }),
  onLike: PropTypes.bool,
  onComment: PropTypes.bool,
  onReply: PropTypes.bool,
  onCommentLike: PropTypes.bool,
  onReplyLike: PropTypes.bool,
};
