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
      jobTitle,
      experienceLevel,
      skills,
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
        <input
          id="experienceLevel"
          type="text"
          value={experienceLevel}
          onChange={(e) => setExperienceLevel(e.target.value)}
          placeholder="Experience Level"
          className="w-full p-2 border rounded"
        />
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
        <input
          id="locationPreference"
          type="text"
          value={locationPreference}
          onChange={(e) => setLocationPreference(e.target.value)}
          placeholder="Location Preference"
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

JobSeekerProfileStep.propTypes = {
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  updateFormData: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
};

export default JobSeekerProfileStep;
