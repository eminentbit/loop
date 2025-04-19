import PropTypes from "prop-types";
import { useState } from "react";

const REPORT_TYPES = [
  { value: "spam", label: "Spam" },
  { value: "inappropriate", label: "Inappropriate Content" },
  { value: "harassment", label: "Harassment" },
  { value: "violence", label: "Violence" },
  { value: "other", label: "Other" },
];

function ReportModal({ handleCancelReport, handleConfirmReport }) {
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!reason) return alert("Please select a reason for reporting.");
    handleConfirmReport({ reason, description });
  };

  return (
    <div className="fixed inset-0 backdrop-blur-xs  bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-11/12 max-w-sm">
        <h5 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
          Report Comment
        </h5>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
          Please select a reason and provide an optional description.
        </p>

        <div className="mb-4">
          <label
            htmlFor="reason"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Reason
          </label>
          <select
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">Select a reason</option>
            {REPORT_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Description (optional)
          </label>
          <textarea
            id="description"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Provide more context if needed..."
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={handleCancelReport}
            className="px-4 py-2 rounded-md border text-sm text-gray-800 dark:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-md bg-red-600 text-white text-sm hover:bg-red-700"
          >
            Report
          </button>
        </div>
      </div>
    </div>
  );
}

ReportModal.propTypes = {
  handleConfirmReport: PropTypes.func.isRequired,
  handleCancelReport: PropTypes.func.isRequired,
};

export default ReportModal;
