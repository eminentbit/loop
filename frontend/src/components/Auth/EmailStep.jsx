import PropTypes from "prop-types";

const EmailStep = ({ onNext, onChange, email }) => {
  return (
    <div className="flex flex-col items-center text-center p-6">
      <h2 className="text-xl font-semibold mb-4">What{"'"}s Your Email?</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter your email address"
        className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 w-full max-w-md"
      />
      <button
        onClick={onNext}
        disabled={!email}
        className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-300"
      >
        Next
      </button>
    </div>
  );
};

EmailStep.propTypes = {
    onNext: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
}

export default EmailStep;
