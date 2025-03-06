import { useState } from "react";
import PropTypes from "prop-types";

const RecruiterProfileStep = ({
  nextStep,
  prevStep,
  updateFormData,
  formData,
}) => {
  const [companyName, setCompanyName] = useState(formData.companyName || "");
  const [companyIndustry, setCompanyIndustry] = useState(
    formData.companyIndustry || ""
  );
  const [companySize, setCompanySize] = useState(formData.companySize || "");
  const [recruitingRole, setRecruitingRole] = useState(
    formData.recruitingRole || ""
  );

  const handleNext = () => {
    updateFormData({
      companyName,
      companyIndustry,
      companySize,
      recruitingRole,
    });
    nextStep();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Recruiter Profile</h2>

      <div>
        <label htmlFor="companyName" className="block font-medium">
          Company Name
        </label>
        <input
          id="companyName"
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Company Name"
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="companyIndustry" className="block font-medium">
          Company Industry
        </label>
        <input
          id="companyIndustry"
          type="text"
          value={companyIndustry}
          onChange={(e) => setCompanyIndustry(e.target.value)}
          placeholder="Company Industry"
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="companySize" className="block font-medium">
          Company Size
        </label>
        <input
          id="companySize"
          type="text"
          value={companySize}
          onChange={(e) => setCompanySize(e.target.value)}
          placeholder="Company Size"
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="recruitingRole" className="block font-medium">
          Recruiting Role
        </label>
        <input
          id="recruitingRole"
          type="text"
          value={recruitingRole}
          onChange={(e) => setRecruitingRole(e.target.value)}
          placeholder="Recruiting Role"
          className="w-full p-2 border rounded"
        />
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

RecruiterProfileStep.propTypes = {
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  updateFormData: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
};

export default RecruiterProfileStep;
