import { useState } from "react";
import PropTypes from "prop-types";
import { ArrowRight, ArrowLeft, User, Briefcase } from "lucide-react";

const UserTypeStep = ({ nextStep, prevStep, updateFormData, formData }) => {
  // Initialize from formData.role to match parent branching
  const [userType, setUserType] = useState(formData.role || "");
  const [error, setError] = useState("");

  const handleSelect = (type) => {
    setUserType(type);
    setError("");
  };

  const handleNext = () => {
    if (!userType) {
      setError("Please select an account type to continue.");
      return;
    }
    // Update parent formData with 'role' key for consistent branching
    updateFormData({ role: userType });
    nextStep();
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 text-center mb-6">
        Select Your Account Type
      </h2>

      <div className="flex gap-4">
        {[
          { type: "jobseeker", label: "Job Seeker", Icon: User },
          { type: "recruiter", label: "Recruiter", Icon: Briefcase }
        ].map(({ type, label, Icon }) => (
          <button
            key={type}
            type="button"
            onClick={() => handleSelect(type)}
            className={`flex-1 flex flex-col items-center p-4 border rounded-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              userType === type
                ? "border-indigo-500 bg-indigo-50 dark:bg-gray-700 shadow-lg"
                : "border-gray-200 dark:border-gray-600 hover:shadow-md"
            }`}
          >
            <Icon size={32} className="mb-2 text-indigo-500 dark:text-indigo-400" />
            <span className="font-medium text-gray-800 dark:text-gray-100">{label}</span>
          </button>
        ))}
      </div>

      {error && (
        <p className="mt-4 text-sm text-red-500 text-center">{error}</p>
      )}

      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={prevStep}
          className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <ArrowLeft size={18} /> Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={!userType}
          className={`inline-flex items-center gap-2 px-6 py-2 text-white bg-indigo-600 rounded-md transition ${
            userType
              ? "hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              : "opacity-50 cursor-not-allowed"
          }`}
        >
          Next <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

UserTypeStep.propTypes = {
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  updateFormData: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    role: PropTypes.string,
  }).isRequired,
};

export default UserTypeStep;