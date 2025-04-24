import { useState } from "react";
import axios from "axios";
import { Heart } from "lucide-react";
import FilledHeartIcon from "./FilledHearIcon"; // Adjust the import based on your icon library
import PropTypes from "prop-types";

const LikeButton = ({ feedId, initialLiked, likes }) => {
  const [liked, setLiked] = useState(initialLiked);
  const [loading, setLoading] = useState(false);
  const [likesCount, setLikesCount] = useState(likes);

  const handleLike = async () => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/feed/posts/${feedId}/like/`,
        {},
        {
          withCredentials: true,
        }
      );

      setLiked(response.data.status === "liked");
      setLikesCount(response.data.likesCount);
    } catch (err) {
      console.error("Error toggling like:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      className={`flex items-center gap-1 text-sm font-medium transition ${
        liked ? "text-red-500" : "text-gray-500 hover:text-red-400"
      }`}
      disabled={loading}
    >
      {liked ? (
        <FilledHeartIcon className="w-5 h-5 fill-current" />
      ) : (
        <Heart className="w-5 h-5" />
      )}
      <span className="font-medium">{likesCount}</span>
    </button>
  );
};

LikeButton.propTypes = {
  feedId: PropTypes.number.isRequired,
  initialLiked: PropTypes.bool.isRequired,
  likes: PropTypes.number.isRequired,
};

export default LikeButton;
