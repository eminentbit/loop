import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, Calendar, BriefcaseIcon, ArrowLeft } from "lucide-react";
import PageContainer from "../../components/job.page.component/ui/PageContainer";
import Button from "../../components/job.page.component/ui/Button";
import Tag from "../../components/job.page.component/ui/Tag";
import Navbar from "src/components/job.page.component/ui/Navbar";
import axios from "axios";
import { enumToSalary, enumToString } from "src/utils/EnumToString";
import ApplicationModal from "src/components/ApplicationModal";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const JobDetailsPage = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Modal/form state
  const [isOpen, setIsOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fileErrors, setFileErrors] = useState({ cv: "", cover_letter: "" });
  const formRef = useRef();

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/jobs/${jobId}`
        );
        setJob(response.data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [jobId]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
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
    const data = Object.fromEntries(formData.entries());

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
    try {
      console.log("Form data is", data);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/application/jobs/${jobId}/`,
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
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

  if (isLoading)
    return (
      <>
        <Navbar />
        <PageContainer>
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </PageContainer>
      </>
    );
  if (!job)
    return (
      <PageContainer>
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-700">
            Job not found
          </h2>
          <Link
            to="/jobs"
            className="mt-4 inline-block text-blue-600 hover:text-blue-800"
          >
            Back to Jobs
          </Link>
        </div>
      </PageContainer>
    );

  return (
    <>
      <Navbar />
      <PageContainer>
        <div className="max-w-4xl mx-auto">
          <Link
            to="/jobs"
            className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Jobs
          </Link>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              {/* Job header */}
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {job.title}
                  </h1>
                  <Link
                    to={`/company/${job.company}`}
                    className="text-lg text-gray-700 hover:text-blue-600"
                  >
                    {job.company}
                  </Link>
                </div>
                <Button size="lg" onClick={openModal}>
                  Apply Now
                </Button>
              </div>

              {/* Job meta */}
              <div className="mt-4 flex flex-wrap gap-4 text-gray-600">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-1" />
                  {job.location}
                  {job.isRemote && (
                    <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs">
                      Remote
                    </span>
                  )}
                </div>
                {job.jobType && (
                  <div className="flex items-center">
                    <BriefcaseIcon className="h-5 w-5 mr-1" />
                    <span className="capitalize">
                      {enumToString(job.jobType)}
                    </span>
                  </div>
                )}
                {job.salary && (
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900">
                      {enumToSalary(job.salary)}
                    </span>
                  </div>
                )}
              </div>

              {/* Description & skills */}
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-3">Job Description</h2>
                <div className="prose max-w-none text-gray-600">
                  {job.description}
                </div>
              </div>
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-3">Required Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((tag, i) => (
                    <Tag key={i} label={tag} />
                  ))}
                </div>
              </div>

              {/* Deadline */}
              {job.applicationDeadline && (
                <div className="mt-6 flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-1" />
                  <span>
                    Application deadline: {formatDate(job.applicationDeadline)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Modal */}
          {isOpen && (
            <ApplicationModal
              formRef={formRef}
              onSubmit={handleSubmit}
              onFileChange={handleFileChange}
              onClose={closeModal}
              showModal={isOpen}
              submitting={submitting}
              submitted={submitted}
              cvError={fileErrors.cv}
              coverLetterError={fileErrors.cover_letter}
              jobTitle={job.title}
            />
          )}
        </div>
      </PageContainer>
    </>
  );
};

export default JobDetailsPage;
