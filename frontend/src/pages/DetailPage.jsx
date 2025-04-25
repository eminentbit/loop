import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import ApplicationModal from "src/components/ApplicationModal";
import { capitalizeFirstLetter } from "src/utils/Capitalize";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { DialogHeader } from "src/components/ui/dialog";
import { Button } from "src/components/ui/button";
import { Label } from "recharts";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";

const JobDetails = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fileErrors, setFileErrors] = useState({ cv: "", cover_letter: "" });

  const formRef = useRef();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/jobs/${jobId}/`,
          { withCredentials: true }
        );
        setJob(response.data);
      } catch (err) {
        console.log(err);
        setError("Unable to load job details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

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
      setFileErrors((prev) => ({
        ...prev,
        [name]: "File must be under 10 MB.",
      }));
    } else {
      setFileErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (fileErrors.cv || fileErrors.cover_letter)
      return alert("Fix file errors before submitting.");

    setSubmitting(true);
    const formData = new FormData(formRef.current);

    try {
      console.log(formData);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/application/jobs/${jobId}/`,
        formData,
        { withCredentials: true }
      );
      if (response.status === 200) setSubmitted(true);
    } catch (err) {
      alert(
        err?.response?.data?.error || "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg font-medium">
          Loading job details...
        </p>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-500 text-lg font-medium">
          {error || "Job not found."}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-4xl w-full space-y-8">
        <header className="border-b pb-6">
          <h1 className="text-4xl font-bold text-gray-900">{job.title}</h1>
          <p className="text-gray-700">
            at <span className="font-semibold">{job.company}</span>
          </p>
          <p className="text-sm text-gray-500">
            {capitalizeFirstLetter(job.location)}
          </p>
        </header>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Job Description
          </h2>
          <p className="text-gray-700 whitespace-pre-line leading-relaxed">
            {job.description}
          </p>
        </section>

        {job.requirements?.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Requirements
            </h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              {job.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </section>
        )}

        <div className="pt-4 border-t">
          <button
            onClick={openModal}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition duration-300 shadow-md hover:shadow-lg"
          >
            Apply Now
          </button>
        </div>
      </div>

      {showModal && (
        <div className="backdrop-blur-sm fixed inset-0 flex items-center justify-center z-50">
          <Dialog open={showModal} onOpenChange={closeModal}>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Apply for {job.title}</DialogTitle>
                <Button onClick={closeModal} className="absolute top-3 right-3">
                  <X className="w-5 h-5" />
                </Button>
              </DialogHeader>
              {submitted ? (
                <p className="text-green-600 text-center">
                  Application submitted!
                </p>
              ) : (
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  encType="multipart/form-data"
                  className="space-y-4 pt-4"
                >
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input type="text" name="fullName" id="fullName" required />
                  </div>{" "}
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" name="email" id="email" required />{" "}
                  </div>
                  <div>
                    <Label htmlFor="cv">CV (PDF, max 10MB)</Label>
                    <Input
                      type="file"
                      name="cv"
                      id="cv"
                      accept=".pdf"
                      required
                      onChange={handleFileChange}
                    />
                    {fileErrors.cv && (
                      <p className="text-red-500 text-sm mt-1">
                        {fileErrors.cv}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="cover_letter">
                      Cover Letter (PDF, max 10MB)
                    </Label>
                    <Input
                      type="file"
                      name="cover_letter"
                      id="cover_letter"
                      accept=".pdf"
                      required
                      onChange={handleFileChange}
                    />
                    {fileErrors.cover_letter && (
                      <p className="text-red-500 text-sm mt-1">
                        {fileErrors.cover_letter}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="message">Message (optional)</Label>
                    <Textarea name="message" id="message" rows={4} />
                  </div>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {submitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </form>
              )}
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
