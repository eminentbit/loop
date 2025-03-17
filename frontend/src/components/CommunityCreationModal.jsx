import { useState } from "react";
import PropTypes from "prop-types";
import { IoMdClose } from "react-icons/io";
import TagInput from "./TagInput";

const CreateCommunityModal = ({ isOpen, onClose, onCreate }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [bannerImage, setBannerImage] = useState("");

  const handleSubmit = () => {
    if (!name.trim() || !description.trim()) return;
    const id = 1;

    onCreate({ id, name, description, tags, bannerImage });
    setName("");
    setDescription("");
    setTags([]);
    setBannerImage("");
    onClose(); // Close modal after creation
  };

  if (!isOpen) return null; // Do not render modal if it's not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Create a Community</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <IoMdClose size={24} />
          </button>
        </div>

        {/* Community Name Input */}
        <input
          type="text"
          placeholder="Community Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-3 border rounded bg-gray-100 dark:bg-gray-700"
        />

        {/* Community Description Input */}
        <textarea
          placeholder="Describe your community"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-3 border rounded bg-gray-100 dark:bg-gray-700"
          rows="3"
        />

        {/* Community Tags Input */}
        <TagInput tags={tags} setTags={setTags} />

        {/* Community Banner Image Input */}
        <input
          type="text"
          placeholder="Banner Image URL (optional)"
          value={bannerImage}
          onChange={(e) => setBannerImage(e.target.value)}
          className="w-full p-2 mb-3 border rounded bg-gray-100 dark:bg-gray-700"
        />

        {/* Action Buttons */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

CreateCommunityModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
};

export default CreateCommunityModal;
