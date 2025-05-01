// Ensure you have "darkMode: 'class'" in your tailwind.config.js

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, Calendar, BriefcaseIcon, ArrowLeft, Sun, Moon } from "lucide-react";
import PageContainer from "../../components/job.page.component/ui/PageContainer";
import Tag from "../../components/job.page.component/ui/Tag";
import { getJobById, getUserById } from "../../data/jobmockData";
import Navbar from "src/components/job.page.component/ui/Navbar";

// Utility to format dates
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const JobDetailsPage = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [employer, setEmployer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Theme state: 'light' or 'dark'
  const [theme, setTheme] = useState("light");

  // Load theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") {
      setTheme(saved);
    }
  }, []);

  // Apply theme class on <html> and persist
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      if (jobId) {
        const found = getJobById(jobId);
        if (found) {
          setJob(found);
          setEmployer(getUserById(found.employerId));
        }
      }
      setIsLoading(false);
    }, 500);
  }, [jobId]);

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

  if (!job) {
    return (
      <PageContainer>
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
            Job not found
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            This job posting doesn&apos;t exist or has been removed.
          </p>
          <Link
            to="/apply/:jobId"
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
        {/* Theme Toggle Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
        </div>

        <div className="max-w-4xl mx-auto">
          <Link
            to="/jobs"
            className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Jobs
          </Link>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {job.title}
                  </h1>
                  <div className="mt-2">
                    <Link
                      to={`/company/${job.company}`}
                      className="text-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {job.company}
                    </Link>
                  </div>
                </div>
                <Link
                  to={`/apply/${job.id}`}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 transition-colors"
                >
                  Apply Now
                </Link>
              </div>

              <div className="mt-4 flex flex-wrap gap-4 text-gray-600 dark:text-gray-400">
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
                    <BriefcaseIcon className="h-5 w-5 mr-1 text-gray-400 dark:text-gray-500" />
                    <span className="capitalize">
                      {job.jobType.replace("-", " ")}
                    </span>
                  </div>
                )}

                {job.salary && (
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {job.salary}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  Job Description
                </h2>
                <div className="prose max-w-none text-gray-600 dark:text-gray-400">
                  {job.description}
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  Required Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag, i) => (
                    <Tag key={i} label={tag} />
                  ))}
                </div>
              </div>

              {job.applicationDeadline && (
                <div className="mt-6 flex items-center text-gray-600 dark:text-gray-400">
                  <Calendar className="h-5 w-5 mr-1 text-gray-400 dark:text-gray-500" />
                  <span>
                    Application deadline: {formatDate(job.applicationDeadline)}
                  </span>
                </div>
              )}
            </div>

            {employer && (
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <img
                    src={employer.avatar}
                    alt={employer.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <Link
                      to={`/profile/${employer.id}`}
                      className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {employer.name}
                    </Link>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Posted {formatDate(job.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </PageContainer>
    </>
  );
};

export default JobDetailsPage;
