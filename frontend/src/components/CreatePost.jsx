import { useState, useContext } from "react";
import { Camera, Video, FileText, Calendar, Send } from "lucide-react";
import { DarkModeContext } from "./DarkModeContext";

const CreatePost = () => {
  const [postContent, setPostContent] = useState("");
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      } rounded-lg shadow p-4 transition-all duration-300`}
    >
      <div className="flex items-center mb-4">
        <img
          src="https://i.pravatar.cc/150?img=5"
          alt="Your Profile"
          className="w-10 h-10 rounded-full mr-3"
        />
        <input
          type="text"
          placeholder="What do you want to share?"
          className={`flex-1 rounded-full px-4 py-2 text-sm focus:outline-none transition-all duration-300 ${
            isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"
          }`}
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />
        <button
          type="submit"
          className="ml-2 text-gray-500 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
      <div className="flex justify-around border-t border-gray-200 dark:border-gray-700 pt-4">
        <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
          <Camera className="w-5 h-5" />
          <span className="text-xs">Media</span>
        </button>
        <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 dark:hover:text-green-400 transition-colors">
          <Calendar className="w-5 h-5" />
          <span className="text-xs">Event</span>
        </button>
        <button className="flex items-center space-x-2 text-gray-500 hover:text-purple-500 dark:hover:text-purple-400 transition-colors">
          <FileText className="w-5 h-5" />
          <span className="text-xs">Article</span>
        </button>
        <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors">
          <Video className="w-5 h-5" />
          <span className="text-xs">Live</span>
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
