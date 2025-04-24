import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Camera, XCircle } from "lucide-react";

const ProfilePictureStep = ({ nextStep, prevStep, updateFormData, formData }) => {
  const [selectedFile, setSelectedFile] = useState(formData.profilePicture || null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedFile(file);
      setPreviewUrl(url);
      updateFormData({ profilePicture: file });
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    updateFormData({ profilePicture: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <div className="max-w-sm mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center">
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Upload Your Profile Picture
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        Optional: Add a personal touch to your profile
      </p>

      <div
        className="relative mx-auto w-36 h-36 rounded-full border-4 border-dashed border-indigo-300 dark:border-indigo-600 bg-gray-50 dark:bg-gray-700 flex items-center justify-center cursor-pointer hover:border-indigo-400 transition"
        onClick={() => fileInputRef.current && fileInputRef.current.click()}
      >
        {previewUrl ? (
          <>
            <img
              src={previewUrl}
              alt="Preview"
              className="absolute inset-0 w-full h-full object-cover rounded-full"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-0 right-0 m-1 text-red-500 hover:text-red-600 bg-white dark:bg-gray-800 rounded-full"
            >
              <XCircle size={20} />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center text-indigo-500">
            <Camera size={48} />
            <span className="mt-2 text-sm">Click to upload</span>
          </div>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={prevStep}
          className="inline-flex items-center gap-2 px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          Back
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="inline-flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {selectedFile ? "Continue" : "Skip"}
        </button>
      </div>
    </div>
  );
};

ProfilePictureStep.propTypes = {
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  updateFormData: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    profilePicture: PropTypes.instanceOf(File),
  }).isRequired,
};

export default ProfilePictureStep;
