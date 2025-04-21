import { useState, useRef } from "react";
import emailjs from 'emailjs-com';
import jobs from "@/data/jobs";
import { useParams } from "react-router-dom";

const JobDetails = () => {
  const { jobId } = useParams();
  const job = jobs.find((j) => j.id === Number(jobId));
  const formRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fileErrors, setFileErrors] = useState({ cv: "", cover_letter: "" });

  // if someone navigates to an invalid ID
  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-700 text-xl">Job not found.</p>
      </div>
    );
  }

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setSubmitted(false);
    setFileErrors({ cv: "", cover_letter: "" });
    formRef.current?.reset();
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (file && file.size > 10 * 1024 * 1024) {
      setFileErrors((errs) => ({
        ...errs,
        [name]: "File must be under 10 MB.",
      }));
    } else {
      setFileErrors((errs) => ({ ...errs, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // prevent send if file errors exist
    if (fileErrors.cv || fileErrors.cover_letter) {
      alert("Please fix file size errors before submitting.");
      return;
    }

    setSubmitting(true);
    emailjs
      .sendForm(
        "YOUR_SERVICE_ID", // ← replace with your EmailJS service ID
        "YOUR_TEMPLATE_ID", // ← replace with your EmailJS template ID
        formRef.current,
        "YOUR_USER_ID" // ← replace with your EmailJS user ID
      )
      .then(() => {
        setSubmitting(false);
        setSubmitted(true);
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        setSubmitting(false);
        alert("Something went wrong. Please try again.");
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-start">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl w-full">
        {/* Header */}
        <div className="mb-6 border-b pb-4">
          <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>
          <p className="text-gray-600 text-sm mt-1">
            at <span className="font-semibold">{job.company}</span>
          </p>
          <p className="text-gray-500 text-sm">{job.location}</p>
        </div>

        {/* Description */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Job Description
          </h2>
          <p className="text-gray-600 leading-relaxed">{job.description}</p>
        </section>

        {/* Requirements */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Requirements
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {job.requirements.map((req, i) => (
              <li key={i}>{req}</li>
            ))}
          </ul>
        </section>

        {/* Apply Button */}
        <div className="mt-8">
          <button
            onClick={openModal}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition"
          >
            Apply Now
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
                      <p className="text-red-500 text-sm mt-1">
                        {fileErrors.cv}
                      </p>
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
                  We’ve received your application. We’ll get back to you soon.
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
      )}
    </div>
  );
};

export default JobDetails;
