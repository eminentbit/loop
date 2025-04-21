import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ArrowRight } from "lucide-react";

const BasicInfoStep = ({ nextStep, updateFormData, formData }) => {
  const [fullName, setFullName] = useState(formData.fullName || "");
  const [email, setEmail] = useState(formData.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  // Validate fields on change
  useEffect(() => {
    const newErrors = {};
    if (confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
  }, [password, confirmPassword]);

  const isFormValid =
    fullName.trim() &&
    email.trim() &&
    password &&
    confirmPassword &&
    Object.keys(errors).length === 0;

  const handleNext = () => {
    if (!isFormValid) {
      // Highlight missing fields or password mismatch
      const newErrors = {};
      if (!fullName.trim()) newErrors.fullName = "Full name is required";
      if (!email.trim()) newErrors.email = "Email is required";
      if (!password) newErrors.password = "Password is required";
      if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password";
      if (password && confirmPassword && password !== confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
      setErrors(newErrors);
      return;
    }
    updateFormData({ fullName, email, password });
    nextStep();
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center">
         Information Required
      </h2>

      <div className="space-y-4">
        {/* Full Name */}
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Full Name<span className="text-red-500">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
            className={`mt-1 w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 border-gray-300 dark:border-gray-600 ${errors.fullName ? 'border-red-500' : ''}`}
          />
          {errors.fullName && (
            <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Email<span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={`mt-1 w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 border-gray-300 dark:border-gray-600 ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Password<span className="text-red-500">*</span>
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter a strong password"
            className={`mt-1 w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 border-gray-300 dark:border-gray-600 ${errors.password ? 'border-red-500' : ''}`}
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Confirm Password<span className="text-red-500">*</span>
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter your password"
            className={`mt-1 w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 border-gray-300 dark:border-gray-600 ${errors.confirmPassword ? 'border-red-500' : ''}`}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>
          )}
        </div>
      </div>

      <div className="text-right">
        <button
          onClick={handleNext}
          disabled={!isFormValid}
          className={`inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200 ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Next
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

BasicInfoStep.propTypes = {
  nextStep: PropTypes.func.isRequired,
  updateFormData: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    fullName: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

export default BasicInfoStep;
