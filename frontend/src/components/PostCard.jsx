import { useContext } from "react";
import PropTypes from "prop-types";
import { DarkModeContext } from "./DarkModeContext";
import { Heart, MessageCircle } from "lucide-react";

const PostCard = ({ post }) => {
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <div
      className={`rounded-lg shadow-md p-6 transition-shadow duration-300 ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="flex items-center mb-4">
        <img
          src={post.profilePic}
          alt={post.username}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <h2 className="font-bold text-sm">{post.username}</h2>
          <span className="text-xs text-gray-500">{post.timestamp}</span>
        </div>
      </div>
      <p className="mb-4 text-sm">{post.content}</p>

      {/* Media Section */}
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

      <div className="flex items-center space-x-4">
        <button className="flex items-center text-gray-500 hover:text-red-500 transition-colors">
          <Heart className="w-5 h-5 mr-1" />
          <span className="text-xs">{post.likes}</span>
        </button>
        <button className="flex items-center text-gray-500 hover:text-blue-500 transition-colors">
          <MessageCircle className="w-5 h-5 mr-1" />
          <span className="text-xs">{post.comments}</span>
        </button>
      </div>
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    profilePic: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    comments: PropTypes.number.isRequired,
    media: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.oneOf(["image", "video"]).isRequired,
        url: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
};

export default PostCard;
