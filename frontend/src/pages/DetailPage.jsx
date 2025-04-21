// src/components/JobDetails.jsx
import { useState, useRef } from "react";
import emailjs from 'emailjs-com';
import jobs from "@/data/jobs";
import { useParams } from "react-router-dom";
import axios from "axios";
import ApplicationModal from "src/components/ApplicationModal";
import { capitalizeFirstLetter } from "src/utils/Capitalize";

const JobDetails = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const formRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fileErrors, setFileErrors] = useState({ cv: "", cover_letter: "" });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/jobs/${jobId.toString()}/`,
          { withCredentials: true }
        );
        if (response.status === 200) {
          setJob(response.data);
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    fetchJob();
  });

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
          <p className="text-gray-500 text-sm">
            {capitalizeFirstLetter(job.location)}
          </p>
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
        <ApplicationModal
          job={job}
          fileErrors={fileErrors}
          formRef={formRef}
          setFileErrors={setFileErrors}
          setSubmitting={setSubmitting}
          setSubmitted={setSubmitted}
          setShowModal={setShowModal}
          submitting={submitting}
          submitted={submitted}
          closeModal={closeModal}
          handleFileChange={handleFileChange}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default JobDetails;
