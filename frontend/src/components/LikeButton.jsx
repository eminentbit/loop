import { useState } from "react";
import axios from "axios";
import { Heart } from "lucide-react";
import FilledHeartIcon from "./FilledHearIcon"; // Adjust the import based on your icon library
import PropTypes from "prop-types";
import getCookie from "../utils/GetCookie";

const LikeButton = ({ feedId, initialLiked }) => {
  const [liked, setLiked] = useState(initialLiked);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/feed/posts/${feedId}/like/`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie("csrftoken"),
          },
          withCredentials: true,
        }
      );

      setLiked(response.data.status === "liked");
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
      {liked ? "Liked" : "Like"}
    </button>
  );
};

LikeButton.propTypes = {
  feedId: PropTypes.number.isRequired,
  initialLiked: PropTypes.bool,
};

export default LikeButton;
