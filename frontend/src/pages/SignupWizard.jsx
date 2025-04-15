import { useState } from "react";
// import WelcomeStep from "../components/Auth/WelcomeSetup"; // Welcome screen
import BasicInfoStep from "../components/Auth/BasicInfoStep";
import UserTypeStep from "../components/Auth/UserTypeStep";
import JobSeekerProfileStep from "../components/Auth/JobSeekerProfileStep";
import RecruiterProfileStep from "../components/Auth/RecruiterProfileStep";
import ProfilePictureStep from "../components/Auth/ProfilePictureStep";
import ProgressBar from "../components/Auth/ProgressBar";
import FinalStep from "../components/Auth/FinalStep";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const kInitialData = {
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
  industry: "",
  companySize: "",
  companyRole: "",
  profilePicture: null,
  aiMatching: true,
  agreedToTerms: false,
};

const SignupWizard = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(kInitialData);
  const navigate = useNavigate();

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const updateFormData = (newData) => {
    setFormData({ ...formData, ...newData });
  };

  const handleOnSubmit = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/auth/register`;
      console.log("Sending request to:", url, formData);

      const response = await axios.post(url, formData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Form submitted successfully:", response.data);
      setFormData(kInitialData);
      navigate("/dashboard");
    } catch (error) {
      console.error(
        "Error during signup:",
        error.response ? error.response.data : error.message
      );

      // You can display specific error message to the user based on status code
      if (error.response) {
        // Example: Handle server-side error
        if (error.response.status === 409) {
          alert("Email is already in use.");
        } else {
          alert("There was an issue with registration. Please try again.");
        }
      } else {
        // If no response (network error, etc.)
        alert("Network error. Please check your connection and try again.");
      }
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <ProgressBar step={step} totalSteps={5} />
      {/* Step 1: Welcome screen */}
      {/* {step === 1 && <WelcomeStep nextStep={nextStep} />} */}

      {/* Step 2: Basic information */}
      {step === 1 && (
        <BasicInfoStep
          nextStep={nextStep}
          updateFormData={updateFormData}
          formData={formData}
        />
      )}

      {/* Step 3: Choose account type */}
      {step === 2 && (
        <UserTypeStep
          nextStep={nextStep}
          prevStep={prevStep}
          updateFormData={updateFormData}
          formData={formData}
        />
      )}

      {/* Step 4: Profile details (Job Seeker or Recruiter) */}
      {step === 3 &&
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
      {step === 4 && (
        <ProfilePictureStep
          nextStep={nextStep}
          prevStep={prevStep}
          updateFormData={updateFormData}
          formData={formData}
        />
      )}

      {/* Step 6 (Final Step): agreement to T&C */}
      {step === 5 && (
        <FinalStep
          prevStep={prevStep}
          onSubmit={handleOnSubmit}
          formData={formData}
        />
      )}
    </div>
  );
};

export default SignupWizard;
