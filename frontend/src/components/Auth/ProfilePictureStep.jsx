import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const ProfilePictureStep = ({
  nextStep,
  prevStep,
  updateFormData,
  formData,
}) => {
  const [selectedFile, setSelectedFile] = useState(
    formData.profilePicture || null
  );
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    updateFormData({ profilePicture: file });
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  // Cleanup the object URL when component unmounts or when previewUrl changes
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="flex flex-col items-center text-center p-8 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Upload Your Profile Picture
      </h2>
      <p className="text-gray-500 mb-6">
        This is optional; you can skip for now.
      </p>

      {/* Image preview or placeholder */}
      <div className="mb-6">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Profile Preview"
            className="w-32 h-32 object-cover rounded-full mx-auto"
          />
        ) : (
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full mb-4 text-gray-700 py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {selectedFile && (
        <p className="text-sm text-green-600 mb-6">
          File selected: {selectedFile.name}
        </p>
      )}

      <div className="flex gap-4">
        <button
          onClick={prevStep}
          className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Back
        </button>
        <button
          onClick={nextStep}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
  formData: PropTypes.object.isRequired,
};

export default ProfilePictureStep;
