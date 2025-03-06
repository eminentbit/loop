import PropTypes from "prop-types";

const CommunitySidebar = ({
  communities,
  selectedCommunity,
  setSelectedCommunity,
  openCreateModal,
  isDarkMode,
}) => {
  return (
    <div
      className={`w-64 p-5 border-r ${
        isDarkMode
          ? "bg-gray-800 text-white border-gray-700"
          : "bg-white text-gray-900 border-gray-300"
      }`}
    >
      <h2 className="text-lg font-semibold mb-4">Communities</h2>

      <button
        onClick={openCreateModal}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-700 transition"
      >
        + Create Community
      </button>

      <ul>
        {communities.map((community) => (
          <li
            key={community.id}
            className={`p-3 rounded-md cursor-pointer hover:bg-gray-300 ${
              selectedCommunity?.id === community.id ? "bg-gray-300" : ""
            }`}
            onClick={() => setSelectedCommunity(community)}
          >
            <h3 className="font-bold">{community.name}</h3>
            <p className="text-sm text-gray-500">{community.members} members</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

CommunitySidebar.propTypes = {
  communities: PropTypes.array.isRequired,
  selectedCommunity: PropTypes.object,
  setSelectedCommunity: PropTypes.func.isRequired,
  openCreateModal: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default CommunitySidebar;
