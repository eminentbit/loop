import { useState } from "react";
import PropTypes from "prop-types";
import { ArrowRight } from "lucide-react";

const BasicInfoStep = ({ nextStep, updateFormData, formData }) => {
  const [fullName, setFullName] = useState(formData.fullName || "");
  const [email, setEmail] = useState(formData.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleNext = () => {
    if (!fullName || !email || !password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    updateFormData({ fullName, email, password });
    nextStep();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Basic Information</h2>

      <div>
        <label htmlFor="fullName" className="block font-medium">
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          value={fullName}
          required
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Enter your full name"
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="email" className="block font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="password" className="block font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter a password"
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block font-medium">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="flex justify-between">
        {/* <button
          onClick={prevStep}
          className="px-4 py-2 bg-gray-300 rounded cursor-pointer"
        >
          Back
        </button> */}
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

BasicInfoStep.propTypes = {
  prevStep: PropTypes.func,
  nextStep: PropTypes.func.isRequired,
  updateFormData: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
};

export default BasicInfoStep;
