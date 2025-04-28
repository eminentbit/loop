import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { DarkModeContext } from "../context/DarkModeContext";
import { MessageCircle } from "lucide-react";
import axios from "axios";
import LikeButton from "./LikeButton";

const PostCard = ({ post, onToggleComments, areCommentsOpen }) => {
  const { isDarkMode } = useContext(DarkModeContext);
  // const [fullName, setFullName] = useState("");
  const [isMe, setIsMe] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [authorPic, setAuthorPic] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [commentCount, setCommentCount] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState("");

  useEffect(() => {
    // const fetchAuthorInfo = async () => {
    //   try {
    //     const response = await axios.get(
    //       `${import.meta.env.VITE_API_URL}/auth/user/full-name/`,
    //       {
    //         params: { email: post.user },
    //         withCredentials: true,
    //         headers: {
    //           "X-CSRFToken": getCookie("csrftoken"),
    //           "Content-Type": "application/json",
    //         },
    //       }
    //     );

    //     setFullName(response.data.fullName);
    //     setAuthorPic(response.data.profilePic);
    //   } catch (err) {
    //     setError(err.response?.data?.error || "Error fetching author info");
    //   }
    // };

    // const fetchCommentNumber = async () => {
    //   try {
    //     const response = await axios.get(
    //       `${import.meta.env.VITE_API_URL}/feed/posts/${post.id}/comments`,
    //       {
    //         withCredentials: true,
    //         headers: {
    //           "X-CSRFToken": getCookie("csrftoken"),
    //           "Content-Type": "application/json",
    //         },
    //       }
    //     );
    //     setCommentCount(response.data.length);
    //   } catch (err) {
    //     setError(err.response?.data?.error || "Error fetching comment count");
    //   }
    // };

    // fetchCommentNumber();

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
        setError(err.response?.data?.error || "Error checking profile");
      }
    };

    // fetchAuthorInfo();
    checkIfMe();
  }, [post]);

  return (
    <div
      className={`rounded-lg shadow-md p-6 transition-shadow duration-300 ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="flex items-center mb-4">
        {authorPic && (
          <img
            src={authorPic}
            alt={post.user.fullName}
            className="w-10 h-10 rounded-full mr-3"
          />
        )}
        <div>
          <h2 className="font-bold text-sm">
            {isMe ? "You" : post.user.fullName}
          </h2>
          <span className="text-xs text-gray-500">{post.timestamp}</span>
        </div>
      </div>

      <p className="mb-4 text-sm">{post.content}</p>

      {post.media && post.media.length > 0 && (
        <div className="mb-4 space-y-4">
          {post.media.map((mediaItem, index) => {
            if (mediaItem.type === "image") {
              return (
                <img
                  key={index}
                  src={mediaItem.url}
                  alt="post media"
                  className="w-full rounded-md"
                />
              );
            }
            if (mediaItem.type === "video") {
              return (
                <video key={index} controls className="w-full rounded-md">
                  <source src={mediaItem.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              );
            }
            return null;
          })}
        </div>
      )}

      <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-300">
        {/* Likes */}
        <div className="flex items-center gap-1">
          <LikeButton
            likes={post.likesCount}
            feedId={post.id}
            initialLiked={post.isLikedByUser}
            className="transition-transform duration-150 hover:scale-110"
            aria-label={post.isLikedByUser ? "Unlike" : "Like"}
          />
        </div>

        {/* Comments Toggle */}
        <button
          onClick={onToggleComments}
          className={`flex items-center gap-1 transition-colors duration-200 focus:outline-none ${
            areCommentsOpen
              ? "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              : "text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300"
          }`}
          aria-pressed={areCommentsOpen}
          aria-label="Toggle comments"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="font-medium">
            {commentCount ? commentCount : post.comments.length}
          </span>
        </button>
      </div>
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.object.isRequired,
    userId: PropTypes.string,
    timestamp: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    postLikes: PropTypes.number.isRequired,
    comments: PropTypes.number.isRequired,
    isLikedByUser: PropTypes.bool,
    likesCount: PropTypes.number.isRequired,
    commentsCount: PropTypes.number.isRequired,
    media: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.oneOf(["image", "video"]).isRequired,
        url: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
  onToggleComments: PropTypes.func.isRequired,
  areCommentsOpen: PropTypes.bool.isRequired,
};

export default PostCard;
