import PropTypes from 'prop-types';

const ProgressBar = ({ step, totalSteps }) => {
  const progressPercentage = (step / totalSteps) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
      <div
        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
  );
};

ProgressBar.propTypes = {
    step: PropTypes.number,
    totalSteps: PropTypes.number
}

export default ProgressBar;
