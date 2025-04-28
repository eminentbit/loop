// components/CreateCommunityCard.js
import { useContext } from "react";
import PropTypes from "prop-types";
import { DarkModeContext } from "@/context/DarkModeContext";

const CreateCommunityCard = ({ onCreate }) => {
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <div
      onClick={onCreate}
      className={`cursor-pointer border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
        isDarkMode ? "border-gray-600" : "border-gray-300"
      }`}
    >
      <div className="text-4xl font-bold text-blue-500 mb-4">+</div>
      <h3 className="text-xl font-semibold mb-2">Create Your Community</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Loop your ideas into a vibrant community on Loop OS!
      </p>
    </div>
  );
};
CreateCommunityCard.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

export default CreateCommunityCard;
