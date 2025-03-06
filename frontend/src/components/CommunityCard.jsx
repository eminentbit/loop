import PropTypes from "prop-types";

const CommunityCard = ({ community, onJoin, isJoined }) => {
  return (
    <div className="p-5 rounded-lg shadow-lg bg-white dark:bg-gray-800 border">
      <h3 className="text-xl font-semibold">{community.name}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {community.description}
      </p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-xs text-gray-500">
          Tags: {community.tags.join(", ")}
        </span>
        {!isJoined && (
          <button
            onClick={onJoin}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            Join
          </button>
        )}
      </div>
    </div>
  );
};

CommunityCard.propTypes = {
  community: PropTypes.object.isRequired,
  onJoin: PropTypes.func.isRequired,
  isJoined: PropTypes.bool.isRequired,
};

export default CommunityCard;
