import PropTypes from "prop-types";

function AddJobModal({ isOpen, onClose, handleJobSubmit, newJob, setNewJob }) {
  if (!isOpen) return null;

  // Generic onChange for text inputs/selects
  const handleChange = (e) => {
    const { name, value } = e.target;

    // For multiline bullet fields
    const bulletFields = ["responsibilities", "requirements", "benefits"];

    if (bulletFields.includes(name)) {
      let newValue = value;

      // Add bullet on Enter
      newValue = newValue.replace(/\n(?!• )/g, "\n• ");

      // Add bullet to the first line if missing
      if (!newValue.startsWith("• ")) {
        newValue = "• " + newValue;
      }

      setNewJob({ ...newJob, [name]: newValue });
    } else {
      setNewJob({ ...newJob, [name]: value });
    }
  };

  // Helper function to insert bullet on Enter key press
  const handleBulletKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const { name, value, selectionStart, selectionEnd } = e.target;
      const bullet = "\n\u2022 "; // newline plus bullet
      // If field is empty, add bullet from start
      const newValue =
        value.length === 0
          ? "\u2022 "
          : value.substring(0, selectionStart) +
            bullet +
            value.substring(selectionEnd);
      setNewJob({ ...newJob, [name]: newValue });
      // Optionally, you could set the caret position if needed
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm  bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-3xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-500 hover:text-red-600 text-2xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4">Add a New Job</h2>
        <form
          onSubmit={handleJobSubmit}
          className="space-y-4 max-h-[75vh] overflow-y-auto pr-2"
        >
          {/* Title */}
          <input
            type="text"
            name="title"
            value={newJob.title}
            onChange={handleChange}
            placeholder="Job Title"
            className="w-full p-2 border rounded-md"
            required
          />

          {/* Company */}
          <input
            type="text"
            name="company"
            value={newJob.company}
            onChange={handleChange}
            placeholder="Company Name"
            className="w-full p-2 border rounded-md"
            required
          />

          {/* Location */}
          <select
            name="location"
            value={newJob.location}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="">Select location</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="On-site">On-site</option>
          </select>

          {/* Type */}
          <select
            name="type"
            value={newJob.type}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="">Select type</option>
            <option value="Full-time">Full-time</option>
            <option value="Contract">Contract</option>
          </select>

          {/* Salary */}
          <select
            name="salary"
            value={newJob.salary}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="">Select salary range</option>
            <option value="$60k - $80k">$60k - $80k</option>
            <option value="$70k - $90k">$70k - $90k</option>
            <option value="$80k - $100k">$80k - $100k</option>
            <option value="100k+">100k+</option>
          </select>

          {/* Job Level */}
          <select
            name="level"
            value={newJob.level || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select level</option>
            <option value="Junior">Junior</option>
            <option value="Mid">Mid</option>
            <option value="Senior">Senior</option>
            <option value="Lead">Lead</option>
          </select>

          {/* Department */}
          <input
            type="text"
            name="department"
            value={newJob.department || ""}
            onChange={handleChange}
            placeholder="Department (e.g., Engineering)"
            className="w-full p-2 border rounded-md"
          />

          {/* Description */}
          <textarea
            name="description"
            value={newJob.description}
            onChange={handleChange}
            placeholder="Job Description"
            className="w-full p-2 border rounded-md"
            rows={3}
            required
          />

          {/* Responsibilities */}
          <textarea
            name="responsibilities"
            value={newJob.responsibilities || ""}
            onChange={handleChange}
            onKeyDown={handleBulletKeyDown}
            placeholder="Responsibilities (press Enter for bullet points)"
            className="w-full p-2 border rounded-md"
            rows={3}
          />

          {/* Requirements */}
          <textarea
            name="requirements"
            value={newJob.requirements || ""}
            onChange={handleChange}
            onKeyDown={handleBulletKeyDown}
            placeholder="Requirements (press Enter for bullet points)"
            className="w-full p-2 border rounded-md"
            rows={3}
          />

          {/* Benefits */}
          <textarea
            name="benefits"
            value={newJob.benefits || ""}
            onChange={handleChange}
            onKeyDown={handleBulletKeyDown}
            placeholder="Benefits (press Enter for bullet points)"
            className="w-full p-2 border rounded-md"
            rows={2}
          />

          {/* Application Link */}
          <input
            type="url"
            name="application_link"
            value={newJob.application_link || ""}
            onChange={handleChange}
            placeholder="Link to apply (optional)"
            className="w-full p-2 border rounded-md"
          />

          {/* How to Apply */}
          <textarea
            name="how_to_apply"
            value={newJob.how_to_apply || ""}
            onChange={handleChange}
            placeholder="Instructions for applying"
            className="w-full p-2 border rounded-md"
            rows={2}
          />

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Submit Job
          </button>
        </form>
      </div>
    </div>
  );
}

AddJobModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleJobSubmit: PropTypes.func.isRequired,
  newJob: PropTypes.object.isRequired,
  setNewJob: PropTypes.func.isRequired,
};

export default AddJobModal;
