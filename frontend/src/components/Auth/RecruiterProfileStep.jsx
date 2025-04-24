import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ArrowRight, ArrowLeft, Building2, Briefcase, Users } from "lucide-react";

const RecruiterProfileStep = ({ nextStep, prevStep, updateFormData, formData }) => {
  const [companyName, setCompanyName] = useState(formData.companyName || "");
  const [companyIndustry, setCompanyIndustry] = useState(formData.industry || "");
  const [companySize, setCompanySize] = useState(formData.companySize || "");
  const [recruitingRole, setRecruitingRole] = useState(formData.companyRole || "");
  const [errors, setErrors] = useState({});

  // Validate fields dynamically
  useEffect(() => {
    const errs = {};
    if (!companyName.trim()) errs.companyName = "Company name is required";
    if (!companyIndustry) errs.companyIndustry = "Industry is required";
    if (!companySize) errs.companySize = "Company size is required";
    if (!recruitingRole) errs.recruitingRole = "Your role is required";
    setErrors(errs);
  }, [companyName, companyIndustry, companySize, recruitingRole]);

  const isFormValid = Object.keys(errors).length === 0;

  const handleNext = () => {
    if (!isFormValid) return;
    updateFormData({ companyName, industry: companyIndustry, companySize, companyRole: recruitingRole });
    nextStep();
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8 space-y-8">
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 text-center">
        Recruiter Profile
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Company Name */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
            <Building2 className="mr-2 text-indigo-500" /> Company Name
          </label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="e.g., Acme Corp"
            className={`mt-1 w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition ${errors.companyName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
          />
          {errors.companyName && <p className="mt-1 text-xs text-red-500">{errors.companyName}</p>}
        </div>

        {/* Industry */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
            <Briefcase className="mr-2 text-indigo-500" /> Company Industry
          </label>
          <select
            value={companyIndustry}
            onChange={(e) => setCompanyIndustry(e.target.value)}
            className={`mt-1 w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition ${errors.companyIndustry ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
          >
            <option value="" disabled>Select an industry</option>
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
          {errors.companyIndustry && <p className="mt-1 text-xs text-red-500">{errors.companyIndustry}</p>}
        </div>

        {/* Company Size */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
            <Users className="mr-2 text-indigo-500" /> Company Size
          </label>
          <select
            value={companySize}
            onChange={(e) => setCompanySize(e.target.value)}
            className={`mt-1 w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition ${errors.companySize ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
          >
            <option value="" disabled>Select size</option>
            <option value="1-10">1-10 employees</option>
            <option value="11-50">11-50 employees</option>
            <option value="51-200">51-200 employees</option>
            <option value="201-500">201-500 employees</option>
            <option value="501-1000">501-1000 employees</option>
            <option value="1001+">1001+ employees</option>
          </select>
          {errors.companySize && <p className="mt-1 text-xs text-red-500">{errors.companySize}</p>}
        </div>

        {/* Recruiting Role */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
            <Briefcase className="mr-2 text-indigo-500" /> Your Role
          </label>
          <select
            value={recruitingRole}
            onChange={(e) => setRecruitingRole(e.target.value)}
            className={`mt-1 w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition ${errors.recruitingRole ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
          >
            <option value="" disabled>Select your role</option>
            <option value="Recruiter">Recruiter</option>
            <option value="HR Manager">HR Manager</option>
            <option value="Talent Acquisition Specialist">Talent Acquisition Specialist</option>
            <option value="Other">Other</option>
          </select>
          {errors.recruitingRole && <p className="mt-1 text-xs text-red-500">{errors.recruitingRole}</p>}
        </div>
      </div>

      <div className="flex justify-between">
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
          disabled={!isFormValid}
          className={`inline-flex items-center gap-2 px-6 py-2 text-white rounded-md transition ${
isFormValid
              ? "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              : "bg-indigo-600 opacity-50 cursor-not-allowed"
          }`}
        >
          Next <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

RecruiterProfileStep.propTypes = {
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  updateFormData: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    companyName: PropTypes.string,
    industry: PropTypes.string,
    companySize: PropTypes.string,
    companyRole: PropTypes.string,
  }).isRequired,
};

export default RecruiterProfileStep;
