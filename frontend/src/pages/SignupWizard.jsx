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
import { ArrowLeft } from "lucide-react";

const kInitialData = {
  fullName: "",
  email: "",
  password: "",
  userType: "",
  jobTitle: "",
  experienceLevel: "",
  primarySkills: [],
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

  // const isFormValid = () => {
  //   const requiredFields = [
  //     "fullName",
  //     "email",
  //     "password",
  //     "userType",
  //     "agreedToTerms",
  //   ];
  //   for (let field of requiredFields) {
  //     if (!formData[field]) return false;
  //   }
  //   return true;
  // };

  const handleOnSubmit = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/auth/register/`;
      const data = new FormData();

      for (const key in formData) {
        if (key === "skills" && Array.isArray(formData[key])) {
          formData[key].forEach((skill, index) => {
            data.append(`skills[${index}]`, skill);
          });
        } else {
          data.append(key, formData[key]);
        }
      }
      console.log("Form data to be sent:", formData);
      console.log("Form data to be sent (as FormData):", data);

      const response = await axios.post(url, formData, {
        // headers: {
        // "Content-Type": "multipart/form-data",
        // "X-CSRFToken": getCookie("csrftoken"),
        // },
        withCredentials: true,
      });

      console.log("Form submitted successfully:", response.data);
      sessionStorage.setItem("tempUser", formData);
      if (response.data.redirectTo) {
        navigate(response.data.redirectTo);
      } else {
        navigate("/jobs");
      }
    } catch (error) {
      console.error(
        "Error during signup:",
        error.response ? error.response.data : error.message
      );
      alert("There was an error during registration.");
    } finally {
      setFormData(kInitialData);
    }
  };

  return (
    <section className="relative flex flex-col justify-center">
      {/* Back button */}
      <div
        className="left-4 absolute top-4 flex items-center gap-2 bg-indigo-500 text-white px-3 py-2 rounded-full hover:bg-indigo-600 cursor-pointer transition"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm">Back</span>
      </div>

      <div className="w-[90%] max-w-lg mx-auto p-6 overflow-auto mt-20 bg-white shadow-lg rounded-lg max-h-[500px]">
        <div className="text-2xl font-bold text-center text-indigo-500 mb-6">
          Register to Get Started
        </div>
        <ProgressBar step={step} totalSteps={5} />
        {/* Step 1: Welcome screen */}
        {/* {step === 1 && <WelcomeStep nextStep={nextStep} />} */}

        {/* Step 2: Basic information */}
        {step === 1 && (
          <BasicInfoStep
            nextStep={nextStep}
            updateFormData={updateFormData}
            formData={formData}
            canContinue={
              formData.fullName && formData.email && formData.password
            }
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
          (formData.role === "jobseeker" ? (
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
    </section>
  );
};

export default SignupWizard;
