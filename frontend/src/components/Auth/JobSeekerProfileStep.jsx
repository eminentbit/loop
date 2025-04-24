import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ArrowRight, ArrowLeft, Briefcase, Star, MapPin, FileText } from "lucide-react";

const JobSeekerProfileStep = ({ nextStep, prevStep, updateFormData, formData }) => {
  const [jobTitle, setJobTitle] = useState(formData.currentJobTitle || "");
  const [experienceLevel, setExperienceLevel] = useState(formData.experienceLevel || "");
  const [skills, setSkills] = useState(formData.primarySkills || []);
  const [careerInterests, setCareerInterests] = useState(formData.careerInterests || "");
  const [locationPreference, setLocationPreference] = useState(formData.locationPreference || "");
  const [errors, setErrors] = useState({});

  // Validate inputs
  useEffect(() => {
    const errs = {};
    if (!jobTitle.trim()) errs.jobTitle = "Current job title is required";
    if (!experienceLevel) errs.experienceLevel = "Experience level is required";
    if (skills.length === 0 || skills.every(s => !s.trim())) errs.skills = "At least one skill is required";
    setErrors(errs);
  }, [jobTitle, experienceLevel, skills]);

  const isFormValid = Object.keys(errors).length === 0;

  const handleNext = () => {
    if (!isFormValid) return;
    updateFormData({ currentJobTitle: jobTitle, experienceLevel, primarySkills: skills, careerInterests, locationPreference });
    nextStep();
  };

  const handleSkillsChange = (e) => {
    const vals = e.target.value.split(",").map(s => s.trim()).filter(Boolean);
    setSkills(vals);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
      <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-6">
        Job Seeker Profile
      </h2>

      <div className="space-y-6">
        {/* Current Job Title */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
            <FileText className="mr-2 text-indigo-500" /> Current Job Title
          </label>
          <input
            type="text"
            value={jobTitle}
            onChange={e => setJobTitle(e.target.value)}
            placeholder="e.g., Frontend Developer"
            className={`mt-1 w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${errors.jobTitle ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
          />
          {errors.jobTitle && <p className="mt-1 text-xs text-red-500">{errors.jobTitle}</p>}
        </div>

        {/* Experience Level */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
            <Star className="mr-2 text-indigo-500" /> Experience Level
          </label>
          <select
            value={experienceLevel}
            onChange={e => setExperienceLevel(e.target.value)}
            className={`mt-1 w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${errors.experienceLevel ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
          >
            <option value="" disabled>Select your experience</option>
            <option value="0-1">0-1 years</option>
            <option value="1-3">1-3 years</option>
            <option value="3-5">3-5 years</option>
            <option value="5-10">5-10 years</option>
            <option value="10+">10+ years</option>
          </select>
          {errors.experienceLevel && <p className="mt-1 text-xs text-red-500">{errors.experienceLevel}</p>}
        </div>

        {/* Skills */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
            <Briefcase className="mr-2 text-indigo-500" /> Primary Skills
          </label>
          <input
            type="text"
            value={skills.join(", ")}
            onChange={handleSkillsChange}
            placeholder="e.g., React, TypeScript, Node.js"
            className={`mt-1 w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${errors.skills ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
          />
          {errors.skills && <p className="mt-1 text-xs text-red-500">{errors.skills}</p>}
        </div>

        {/* Career Interests & Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
              <Briefcase className="mr-2 text-indigo-500" /> Career Interests
            </label>
            <input
              type="text"
              value={careerInterests}
              onChange={e => setCareerInterests(e.target.value)}
              placeholder="e.g., UI/UX, Fullstack"
              className="mt-1 w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition border-gray-300 dark:border-gray-600"
            />
          </div>
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
              <MapPin className="mr-2 text-indigo-500" /> Location Preference
            </label>
            <select
              value={locationPreference}
              onChange={e => setLocationPreference(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition border-gray-300 dark:border-gray-600"
            >
              <option value="" disabled>Select location</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
              <option value="onsite">On-site</option>
            </select>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={prevStep}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <ArrowLeft size={18} /> Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={!isFormValid}
          className={`inline-flex items-center gap-2 px-6 py-2 text-white bg-indigo-600 rounded-md transition ${
            isFormValid
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

JobSeekerProfileStep.propTypes = {
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  updateFormData: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    currentJobTitle: PropTypes.string,
    experienceLevel: PropTypes.string,
    primarySkills: PropTypes.arrayOf(PropTypes.string),
    careerInterests: PropTypes.string,
    locationPreference: PropTypes.string,
  }).isRequired,
};

export default JobSeekerProfileStep;