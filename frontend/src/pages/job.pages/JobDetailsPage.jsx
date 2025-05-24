import { useState, useRef, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Briefcase,
  ArrowLeft,
  Sun,
  Moon,
  X,
} from "lucide-react";
import PageContainer from "src/components/job.page.component/ui/PageContainer";
import Tag from "src/components/job.page.component/ui/Tag";
import Navbar from "src/components/job.page.component/ui/Navbar";
import axios from "axios";
import { enumToSalary, enumToString } from "src/utils/EnumToString";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { DialogHeader } from "src/components/ui/dialog";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import { Textarea } from "src/components/ui/textarea";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const JobDetailsPage = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [isApplied, setIsApplied] = useState(false);

  // Theme state: 'light' or 'dark'
  const [theme, setTheme] = useState("light");

  // Modal/form state
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fileErrors, setFileErrors] = useState({ cv: "", cover_letter: "" });
  const navigate = useNavigate();
  const formRef = useRef();

  // Load user from session
  useEffect(() => {
    const stored = sessionStorage.getItem("user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        setUser(null);
      }
    }
  }, []);

  // Load theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") setTheme(saved);
  }, []);

  // Apply theme class and persist
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  // Fetch job details
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/jobs/${jobId}/`, {
        withCredentials: true,
      })
      .then((response) => {
        if (isMounted) setJob(response.data);
      })
      .catch(() => {
        if (isMounted)
          setError("Unable to load job details. Please try again later.");
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [jobId]);

  // Check if user has already applied
  useEffect(() => {
    if (!job || !user) {
      setIsApplied(false);
      return;
    }
    const applications = job.JobApplication || [];
    const applied = applications.some(
      (app) => String(app.userId) === String(user.id)
    );
    setIsApplied(applied);
  }, [job, user]);

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setSubmitted(false);
    setFileErrors({ cv: "", cover_letter: "" });
    if (formRef.current) formRef.current.reset();
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
    if (fileErrors.cv || fileErrors.cover_letter) {
      return alert("Fix file errors before submitting.");
    }
    setSubmitting(true);
    const formData = new FormData(formRef.current);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/application/jobs/${jobId}/`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
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

  if (isLoading) {
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
  }

  if (error || !job) {
    return (
      <PageContainer>
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
            {error || "Job not found"}
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            This job posting doesn&apos;t exist or has been removed.
          </p>
          <Link
            to="/jobs"
            className="mt-4 inline-block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
          >
            Back to Jobs
          </Link>
        </div>
      </PageContainer>
    );
  }

  return (
    <>
      <Navbar />
      <PageContainer>
        {/* Theme Toggle */}
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </button>
        </div>

        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6">
            <Link
              to="/jobs"
              className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Jobs
            </Link>

            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {job.title}
                </h1>
                <Link
                  to={`/company/${job.company}`}
                  className="text-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {job.company}
                </Link>
              </div>
              {user?.role === "jobseeker" ? (
                <Button
                  size="lg"
                  onClick={() => {
                    if (!isApplied) {
                      openModal();
                      return;
                    }
                    navigate("/applications");
                  }}
                >
                  {!isApplied ? "Apply Now" : "View Applications"}
                </Button>
              ) : (
                <Button
                  size="lg"
                  onClick={() => navigate(`/job/${jobId}/applicants`)}
                >
                  See applicants
                </Button>
              )}
            </div>

            {/* Meta */}
            <div className="mt-4 flex flex-wrap gap-4 text-gray-600">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-1 text-gray-400 dark:text-gray-500" />
                <span>{job.location}</span>
                {job.isRemote && (
                  <span className="ml-2 px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs">
                    Remote
                  </span>
                )}
              </div>
              {job.jobType && (
                <div className="flex items-center">
                  <Briefcase className="h-5 w-5 mr-1 text-gray-400 dark:text-gray-500" />
                  <span className="capitalize">
                    {enumToString(job.jobType)}
                  </span>
                </div>
              )}
              {job.salary && (
                <div className="flex items-center">
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {enumToSalary(job.salary)}
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Job Description
              </h2>
              <div className="prose max-w-none text-gray-600 dark:text-gray-400">
                {job.description}
              </div>
            </div>

            {/* Skills */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Required Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((tag, i) => (
                  <Tag key={i} label={tag} />
                ))}
              </div>
            </div>

            {/* Deadline */}
            {job.applicationDeadline && (
              <div className="mt-6 flex items-center text-gray-600 dark:text-gray-400">
                <Calendar className="h-5 w-5 mr-1 text-gray-400 dark:text-gray-500" />
                <span>
                  Application deadline: {formatDate(job.applicationDeadline)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
            <Dialog open={showModal} onOpenChange={closeModal}>
              <DialogContent className="w-full max-w-lg p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                <DialogHeader>
                  <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Apply for {job.title}
                  </DialogTitle>
                  <Button
                    onClick={closeModal}
                    size="icon"
                    variant="ghost"
                    className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </DialogHeader>

                {submitted ? (
                  <p className="text-green-600 dark:text-green-400 text-center mt-6">
                    Application submitted!
                  </p>
                ) : (
                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    className="space-y-4 mt-4"
                  >
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        Full Name
                      </label>
                      <Input
                        type="text"
                        id="fullName"
                        name="fullName"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        Email
                      </label>
                      <Input type="email" id="email" name="email" required />
                    </div>
                    <div>
                      <label
                        htmlFor="cv"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        CV (PDF, max 10MB)
                      </label>
                      <Input
                        type="file"
                        id="cv"
                        name="cv"
                        accept=".pdf"
                        required
                        onChange={handleFileChange}
                      />
                      {fileErrors.cv && (
                        <p className="text-sm text-red-500 mt-1">
                          {fileErrors.cv}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="cover_letter"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        Cover Letter (PDF, max 10MB)
                      </label>
                      <Input
                        type="file"
                        id="cover_letter"
                        name="cover_letter"
                        accept=".pdf"
                        required
                        onChange={handleFileChange}
                      />
                      {fileErrors.cover_letter && (
                        <p className="text-sm text-red-500 mt-1">
                          {fileErrors.cover_letter}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        Message (optional)
                      </label>
                      <Textarea id="message" name="message" rows={4} />
                    </div>
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full"
                    >
                      {submitting ? "Submitting..." : "Submit Application"}
                    </Button>
                  </form>
                )}
              </DialogContent>
            </Dialog>
          </div>
        )}
      </PageContainer>
    </>
  );
};

export default JobDetailsPage;
