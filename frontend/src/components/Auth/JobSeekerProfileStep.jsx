import { useState } from "react";
import PropTypes from "prop-types";

const JobSeekerProfileStep = ({
  nextStep,
  prevStep,
  updateFormData,
  formData,
}) => {
  const [jobTitle, setJobTitle] = useState(formData.jobTitle || "");
  const [experienceLevel, setExperienceLevel] = useState(
    formData.experienceLevel || ""
  );
  const [skills, setSkills] = useState(formData.skills || []);
  const [careerInterests, setCareerInterests] = useState(
    formData.careerInterests || ""
  );
  const [locationPreference, setLocationPreference] = useState(
    formData.locationPreference || ""
  );

  const handleNext = () => {
    if (!jobTitle || !experienceLevel || !skills.length) {
      alert("Please fill in all required fields");
      return;
    }
    updateFormData({
      currentJobTitle: jobTitle,
      experienceLevel,
      primarySkills: skills,
      careerInterests,
      locationPreference,
    });
    nextStep();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Job Seeker Profile</h2>

      <div>
        <label htmlFor="jobTitle" className="block font-medium">
          Current Job Title
        </label>
        <input
          id="jobTitle"
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder="Current Job Title"
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="experienceLevel" className="block font-medium">
          Experience Level
        </label>
        <select
          id="experienceLevel"
          value={experienceLevel}
          onChange={(e) => setExperienceLevel(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Experience Level</option>
          <option value="0-1">0-1 years</option>
          <option value="1-3">1-3 years</option>
          <option value="3-5">3-5 years</option>
          <option value="5-10">5-10 years</option>
          <option value="10+">10+ years</option>
        </select>
      </div>

      <div>
        <label htmlFor="skills" className="block font-medium">
          Primary Skills
        </label>
        <input
          id="skills"
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value.split(","))}
          placeholder="Primary Skills (comma separated)"
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="careerInterests" className="block font-medium">
          Career Interests
        </label>
        <input
          id="careerInterests"
          type="text"
          value={careerInterests}
          onChange={(e) => setCareerInterests(e.target.value)}
          placeholder="Career Interests"
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="locationPreference" className="block font-medium">
          Location Preference
        </label>
        <select
          id="locationPreference"
          value={locationPreference}
          onChange={(e) => setLocationPreference(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Location</option>
          <option value="remote">Remote</option>
          <option value="hybrid">Hybrid</option>
          <option value="onsite">On-site</option>
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

JobSeekerProfileStep.propTypes = {
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  updateFormData: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
};

export default JobSeekerProfileStep;
