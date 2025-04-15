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
    formData.companyRole || ""
  );

  const handleNext = () => {
    if (!companyName || !companyIndustry || !companySize || !recruitingRole) {
      alert("Please fill in all required fields");
      return;
    }
    updateFormData({
      companyName,
      industry: companyIndustry,
      companySize,
      companyRole: recruitingRole,
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
        <select
          id="companyIndustry"
          value={companyIndustry}
          onChange={(e) => setCompanyIndustry(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="" disabled>
            Select an industry
          </option>
          <optgroup label="Technology">
            <option value="Software">Software</option>
            <option value="Hardware">Hardware</option>
            <option value="AI">AI</option>
          </optgroup>
          <optgroup label="Healthcare">
            <option value="Pharmaceuticals">Pharmaceuticals</option>
            <option value="Medical Devices">Medical Devices</option>
            <option value="Biotechnology">Biotechnology</option>
          </optgroup>
          <optgroup label="Finance">
            <option value="Banking">Banking</option>
            <option value="Insurance">Insurance</option>
            <option value="Investment">Investment</option>
          </optgroup>
        </select>
      </div>

      <div>
        <label htmlFor="companySize" className="block font-medium">
          Company Size
        </label>
        <select
          id="companySize"
          value={companySize}
          onChange={(e) => setCompanySize(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="" disabled>
            Select company size
          </option>
          <option value="1-10">1-10</option>
          <option value="11-50">11-50</option>
          <option value="51-200">51-200</option>
          <option value="201-500">201-500</option>
          <option value="501-1000">501-1000</option>
          <option value="1001+">1001+</option>
        </select>
      </div>

      <div>
        <label htmlFor="recruitingRole" className="block font-medium">
          Recruiting Role
        </label>
        <select
          id="recruitingRole"
          value={recruitingRole}
          onChange={(e) => setRecruitingRole(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="" disabled>
            Select your role
          </option>
          <option value="Recruiter">Recruiter</option>
          <option value="HR Manager">HR Manager</option>
          <option value="Talent Acquisition Specialist">
            Talent Acquisition Specialist
          </option>
          <option value="Other">Other</option>
        </select>
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
