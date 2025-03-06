import { useState } from "react";
import WelcomeStep from "../components/Auth/WelcomeSetup"; // Welcome screen
import BasicInfoStep from "../components/Auth/BasicInfoStep";
import UserTypeStep from "../components/Auth/UserTypeStep";
import JobSeekerProfileStep from "../components/Auth/JobSeekerProfileStep";
import RecruiterProfileStep from "../components/Auth/RecruiterProfileStep";
import ProfilePictureStep from "../components/Auth/ProfilePictureStep";
import ProgressBar from "../components/Auth/ProgressBar";
import FinalStep from "../components/Auth/FinalStep";

const SignupWizard = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    userType: "",
    jobTitle: "",
    experienceLevel: "",
    skills: [],
    careerInterests: "",
    locationPreference: "",
    companyName: "",
    companyIndustry: "",
    companySize: "",
    recruitingRole: "",
    profilePicture: null,
    aiMatching: true,
    agreedToTerms: false,
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const updateFormData = (newData) => {
    setFormData({ ...formData, ...newData });
  };

  const handleOnSubmit = () => {
    console.log("Submitted");
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <ProgressBar step={step} totalSteps={5} />
      {/* Step 1: Welcome screen */}
      {step === 1 && <WelcomeStep nextStep={nextStep} />}

      {/* Step 2: Basic information */}
      {step === 2 && (
        <BasicInfoStep
          prevStep={prevStep}
          nextStep={nextStep}
          updateFormData={updateFormData}
          formData={formData}
        />
      )}

      {/* Step 3: Choose account type */}
      {step === 3 && (
        <UserTypeStep
          nextStep={nextStep}
          prevStep={prevStep}
          updateFormData={updateFormData}
          formData={formData}
        />
      )}

      {/* Step 4: Profile details (Job Seeker or Recruiter) */}
      {step === 4 &&
        (formData.userType === "job_seeker" ? (
          <JobSeekerProfileStep
            nextStep={nextStep}
            prevStep={prevStep}
            updateFormData={updateFormData}
            formData={formData}
          />
        ) : (
          <RecruiterProfileStep
            nextStep={nextStep}
            prevStep={prevStep}
            updateFormData={updateFormData}
            formData={formData}
          />
        ))}

      {/* Step 5: Profile picture upload  */}
      {step === 5 && (
        <ProfilePictureStep
          nextStep={nextStep}
          prevStep={prevStep}
          updateFormData={updateFormData}
          formData={formData}
        />
      )}

      {/* Step 6 (Final Step): agreement to T&C */}
      {step === 6 && (
        <FinalStep prevStep={prevStep} onSubmit={handleOnSubmit} />
      )}
    </div>
  );
};

export default SignupWizard;
