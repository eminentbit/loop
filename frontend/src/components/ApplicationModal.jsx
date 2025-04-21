import PropTypes from "prop-types";

function ApplicationModal({
  closeModal,
  submitted,
  job,
  formRef,
  handleSubmit,
  fileErrors,
  submitting,
  handleFileChange,
}) {
  return (
    <div>
      <div className="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
          {/* Close */}
          <button
            onClick={closeModal}
            className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 text-2xl"
          >
            &times;
          </button>

          {!submitted ? (
            <>
              <h3 className="text-xl font-semibold mb-4">
                Apply for {job.title}
              </h3>

              {/* Requirements */}
              <ul className="list-disc list-inside mb-4 text-gray-700 space-y-1">
                {job.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                {/* hidden job_title */}
                <input type="hidden" name="job_title" value={job.title} />

                {/* Name & Email */}
                <div className="mb-4">
                  <label
                    htmlFor="from_name"
                    className="block text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    id="from_name"
                    name="from_name"
                    type="text"
                    required
                    className="w-full border border-gray-300 rounded-lg p-2"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="from_email"
                    className="block text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    id="from_email"
                    name="from_email"
                    type="email"
                    required
                    className="w-full border border-gray-300 rounded-lg p-2"
                  />
                </div>

                {/* CV Upload */}
                <div className="mb-4">
                  <label htmlFor="cv" className="block text-gray-700 mb-1">
                    Upload CV (PDF/DOC, max 10 MB)
                  </label>
                  <input
                    id="cv"
                    name="cv"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    required
                    className="w-full"
                  />
                  {fileErrors.cv && (
                    <p className="text-red-500 text-sm mt-1">{fileErrors.cv}</p>
                  )}
                </div>

                {/* Cover Letter Upload */}
                <div className="mb-4">
                  <label
                    htmlFor="cover_letter"
                    className="block text-gray-700 mb-1"
                  >
                    Upload Cover Letter (PDF/DOC, max 10 MB)
                  </label>
                  <input
                    id="cover_letter"
                    name="cover_letter"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    required
                    className="w-full"
                  />
                  {fileErrors.cover_letter && (
                    <p className="text-red-500 text-sm mt-1">
                      {fileErrors.cover_letter}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={
                    submitting ||
                    Boolean(fileErrors.cv) ||
                    Boolean(fileErrors.cover_letter)
                  }
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg"
                >
                  {submitting ? "Submitting…" : "Submit Application"}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Thank you!</h3>
              <p className="mb-4">
                We&apos;ve received your application. We&apos;ll get back to you
                soon.
              </p>
              <button
                onClick={closeModal}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

ApplicationModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  submitted: PropTypes.bool.isRequired,
  job: PropTypes.shape({
    title: PropTypes.string.isRequired,
    requirements: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  formRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  fileErrors: PropTypes.shape({
    cv: PropTypes.string,
    cover_letter: PropTypes.string,
  }).isRequired,
  submitting: PropTypes.bool.isRequired,
  handleFileChange: PropTypes.func.isRequired,
};

export default ApplicationModal;
