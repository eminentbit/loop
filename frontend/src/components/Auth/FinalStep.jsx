import PropTypes from "prop-types";

const FinalStep = ({ prevStep, onSubmit, formData }) => {
  // Helper function to handle missing data
  const getValue = (value) => (value ? value : "N/A");
  console.log("FinalStep formData:", formData);

  return (
    <div className="flex flex-col items-center text-center p-8 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Review Your Information
      </h2>
      <p className="text-gray-500 mb-6">
        You{"'"}re almost there! Please review your details below before
        completing your sign-up.
      </p>

      {/* Review Section */}
      <div className="w-full bg-gray-100 p-4 rounded-lg mb-6 text-left">
        <h3 className="text-lg font-medium text-gray-700 mb-2">Your Details</h3>
        <p className="text-gray-700">
          <strong>Name:</strong> {getValue(formData?.fullName)}
        </p>
        <p className="text-gray-700">
          <strong>Email:</strong> {getValue(formData?.email)}
        </p>

        {formData?.profilePicture ? (
          <div className="flex flex-col items-center mt-4">
            <img
              src={URL.createObjectURL(formData.profilePicture)}
              alt="Profile Preview"
              className="w-24 h-24 object-cover rounded-full shadow"
            />
            <p className="text-gray-500 text-sm mt-2">
              {formData.profilePicture.name}
            </p>
          </div>
        ) : (
          <p className="text-gray-700 mt-2">
            <strong>Profile Picture:</strong> N/A
          </p>
        )}
      </div>

      {/* Terms & Conditions */}
      <p className="text-gray-600 text-sm mb-6">
        By signing up, you confirm that you have read and agree to our&nbsp;
        <a
          href="/terms"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Terms and Conditions
        </a>
        &nbsp;and&nbsp;
        <a
          href="/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Privacy Policy
        </a>
        .
      </p>

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        <button
          onClick={prevStep}
          className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Back
        </button>
        <button
          onClick={onSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Confirm & Sign Up
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
