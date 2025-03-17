import { useState } from "react";
import PropTypes from "prop-types";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "," || e.key === "Enter" || e.key === " ") {
      e.preventDefault(); // Prevent the default comma input
      const newTag = inputValue.trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
        setInputValue(""); // Clear the input
      }
    }
    if (e.key === "Backspace" && !inputValue) {
      setTags(tags.slice(0, tags.length - 1));
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      <div className="flex flex-wrap mb-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center bg-gray-300 rounded-full px-2 py-1 mr-2"
          >
            <span>{tag}</span>
            <button
              onClick={() => removeTag(tag)}
              className="ml-1 text-red-500"
            >
              {"×"}
            </button>
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="w-full p-2 mb-3 border rounded bg-gray-100 dark:bg-gray-700"
      />
    </div>
  );
};
TagInput.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  setTags: PropTypes.func.isRequired,
};

export default TagInput;
