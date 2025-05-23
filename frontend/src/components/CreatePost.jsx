import { useState, useContext, useRef } from "react";
import { Camera, Video, FileText, Calendar, Send } from "lucide-react";
import DefaultProfile from "../assets/default-profile.png"; // Placeholder for profile image
import { DarkModeContext } from "../context/DarkModeContext";
import ConfirmationModal from "./ConfirmationModal"; // Create this separately
// import getCookie from "../utils/GetCookie";
import PropTypes from "prop-types";
import axios from "axios";
import SignInModal from "./SignInModal";

const CreatePost = ({ onPostSuccess }) => {
  const [postContent, setPostContent] = useState("");
  const [modalType, setModalType] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState(null); // holds FileList or file info
  const [showModal, setShowModal] = useState(false);
  const { isDarkMode } = useContext(DarkModeContext);
  const [modalOpen, setModalOpen] = useState(false);
  const fileInputRef = useRef(null);

  // This function triggers the file input based on the selected type
  const triggerFileSelection = (type) => {
    setModalType(type);
    // Optionally set accepted file types by type:
    // For media, you might want images/videos; for others, you might accept documents.
    // Here we handle a simple case.
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset previous selection
      fileInputRef.current.click();
    }
  };

  // Called when the file input changes
  const handleFileChange = (e) => {
    const files = e.target.files;
    // Only proceed if a file has been selected
    if (files && files.length > 0) {
      setSelectedFiles(files);
      setShowModal(true);
    }
  };

  // Handles text-only submission (without file/document selection)
  const handleTextSubmit = async () => {
    const storedUser = sessionStorage.getItem("user");
    if (!storedUser) {
      setModalOpen(true);
      return;
    }
    const postData = {
      type: "text",
      content: postContent,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/feed/posts/create/`,
        postData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);

      if (response.status === 201) {
        setPostContent("");
        onPostSuccess();
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  // Handles the submission when a file/document was selected (via the modal)
  const handleModalSubmit = async () => {
    // Example using FormData to send file(s) along with other data
    const formData = new FormData();
    formData.append("type", modalType);
    formData.append("content", postContent);
    // Append all selected files
    Array.from(selectedFiles).forEach((file) => {
      formData.append("attachments", file);
    });

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/feed/posts/create/`,
      {
        method: "POST",
        // When using FormData, do not set Content-Type manually.
        body: formData,
        credentials: "include",
      }
    );

    if (response.ok) {
      setPostContent("");
      setSelectedFiles(null);
      setModalType(null);
      setShowModal(false);
      onPostSuccess();
    }
  };

  return (
    <>
      <div
        className={`${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        } rounded-lg shadow p-4 transition-all duration-300`}
      >
        <div className="flex items-center mb-4">
          <img
            src={DefaultProfile}
            alt="Your Profile"
            className="w-10 h-10 rounded-full mr-3"
          />
          <input
            type="text"
            placeholder="What do you want to share?"
            className={`flex-1 rounded-full px-4 py-2 text-sm focus:outline-none transition-all duration-300 ${
              isDarkMode
                ? "bg-gray-700 text-white"
                : "bg-gray-100 text-gray-900"
            }`}
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />
          {/* Text posts submitted directly */}
          <button
            onClick={handleTextSubmit}
            className="ml-2 text-gray-500 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <div className="flex justify-around border-t border-gray-200 dark:border-gray-700 pt-4">
          <button
            onClick={() => triggerFileSelection("media")}
            className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            <Camera className="w-5 h-5" />
            <span className="text-xs">Media</span>
          </button>
          <button
            onClick={() => triggerFileSelection("event")}
            className="flex items-center space-x-2 text-gray-500 hover:text-green-500 dark:hover:text-green-400 transition-colors"
          >
            <Calendar className="w-5 h-5" />
            <span className="text-xs">Event</span>
          </button>
          <button
            onClick={() => triggerFileSelection("article")}
            className="flex items-center space-x-2 text-gray-500 hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
          >
            <FileText className="w-5 h-5" />
            <span className="text-xs">Article</span>
          </button>
          <button
            onClick={() => triggerFileSelection("live")}
            className="flex items-center space-x-2 text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
          >
            <Video className="w-5 h-5" />
            <span className="text-xs">Live</span>
          </button>
        </div>
      </div>

      {/* Hidden file input used to trigger file/document selection */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        // Optionally, change accepted file types based on modalType
        accept={modalType === "media" ? "image/*,video/*" : "*"}
        onChange={handleFileChange}
      />

      {modalOpen && (
        <SignInModal
          onClose={() => {
            setModalOpen(false);
          }}
          setIsModalOpen={setModalOpen}
        />
      )}

      {/* Show the ConfirmationModal only when files are selected */}
      {showModal && selectedFiles && (
        <ConfirmationModal
          open={showModal}
          type={modalType}
          file={selectedFiles}
          content={postContent}
          onCancel={() => {
            // Cancel selection and reset state
            setShowModal(false);
            setModalType(null);
            setSelectedFiles(null);
          }}
          onSend={handleModalSubmit}
        />
      )}
    </>
  );
};

CreatePost.propTypes = {
  onPostSuccess: PropTypes.func,
  setOpenMedia: PropTypes.func,
};

export default CreatePost;
