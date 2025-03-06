import PropTypes from 'prop-types';

const PasswordStep = ({ onNext, onChange, password }) => {
  return (
    <div className="flex flex-col items-center text-center p-6">
      <h2 className="text-xl font-semibold mb-4">Create a Password</h2>
      <input
        type="password"
        value={password}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter a secure password"
        className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 w-full max-w-md"
      />
      <button
        onClick={onNext}
        disabled={password.length < 6}
        className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-300"
      >
        Next
      </button>
    </div>
  );
};

PasswordStep.propTypes = {
    onNext: PropTypes.func,
    onChange: PropTypes.func,
    password: PropTypes.string
}

export default PasswordStep;