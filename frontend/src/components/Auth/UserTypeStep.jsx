import { useState } from "react";
import PropTypes from "prop-types";

const UserTypeStep = ({ nextStep, prevStep, updateFormData, formData }) => {
  const [userType, setUserType] = useState(formData.userType || "");

  const handleNext = () => {
    if (!userType) {
      alert("Please select an account type");
      return;
    }
    updateFormData({ userType });
    nextStep();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Select Account Type</h2>

      <div className="flex space-x-4">
        <button
          className={`px-4 py-2 rounded ${
            userType === "job_seeker" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => setUserType("job_seeker")}
        >
          Job Seeker
        </button>
        <button
          className={`px-4 py-2 rounded ${
            userType === "recruiter" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => setUserType("recruiter")}
        >
          Recruiter
        </button>
      </div>

      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="px-4 py-2 bg-gray-300 rounded cursor-pointer"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

UserTypeStep.propTypes = {
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  updateFormData: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
};

export default UserTypeStep;
