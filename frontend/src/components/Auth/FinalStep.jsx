import PropTypes from "prop-types";

const FinalStep = ({ prevStep, onSubmit, formData }) => {
  const getValue = (value) => (value ? value : "N/A");

  return (
    <div className="flex flex-col items-center text-center p-8 max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl transition-all">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
        🎉 Review & Confirm
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        You&apos;re almost done! Double-check your info before completing your sign-up.
      </p>

      <div className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-6 rounded-xl shadow-inner text-left space-y-4">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
          Your Details
        </h3>

        <div className="space-y-2">
          <p className="text-gray-800 dark:text-gray-100">
            <span className="font-medium">👤 Name:</span> {getValue(formData?.fullName)}
          </p>
          <p className="text-gray-800 dark:text-gray-100">
            <span className="font-medium">📧 Email:</span> {getValue(formData?.email)}
          </p>
        </div>

        {formData?.profilePicture ? (
          <div className="mt-4 flex flex-col items-center">
            <img
              src={URL.createObjectURL(formData.profilePicture)}
              alt="Profile"
              className="w-24 h-24 object-cover rounded-full border-2 border-blue-500 shadow-md"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {formData.profilePicture.name}
            </p>
          </div>
        ) : (
          <p className="text-gray-800 dark:text-gray-100 mt-2">
            <span className="font-medium">🖼️ Profile Picture:</span> N/A
          </p>
        )}
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300 mt-6">
        By signing up, you agree to our{" "}
        <a
          href="/terms"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Terms & Conditions
        </a>{" "}
        and{" "}
        <a
          href="/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Privacy Policy
        </a>.
      </p>

      <div className="flex gap-4 mt-8">
        <button
          onClick={prevStep}
          className="px-6 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          ⬅ Back
        </button>
        <button
          onClick={onSubmit}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          ✅ Confirm & Sign Up
        </button>
      </div>
    </div>
  );
};

FinalStep.propTypes = {
  prevStep: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    fullName: PropTypes.string,
    email: PropTypes.string,
    profilePicture: PropTypes.object,
  }).isRequired,
};

export default FinalStep;
