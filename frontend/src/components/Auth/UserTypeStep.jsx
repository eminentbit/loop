import { useState } from "react";
import PropTypes from "prop-types";
import { ArrowRight } from "lucide-react";

const UserTypeStep = ({ nextStep, prevStep, updateFormData, formData }) => {
  const [userType, setUserType] = useState(formData.userType || "");

  const handleNext = () => {
    if (!userType) {
      alert("Please select an account type");
      return;
    }
    updateFormData({ role: userType });
    nextStep();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Select Account Type</h2>

      <div className="flex space-x-4">
        <button
          className={`px-4 py-2 rounded ${
            userType === "jobseeker" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => setUserType("jobseeker")}
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
          className="px-5 py-2 hover:bg-indigo-700 transition-colors duration-300 bg-indigo-500 text-white rounded cursor-pointer flex items-center gap-2"
        >
          Next
          <ArrowRight size={18}/>
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
