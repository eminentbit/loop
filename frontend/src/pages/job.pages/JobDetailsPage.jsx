import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, Calendar, BriefcaseIcon, ArrowLeft } from "lucide-react";
import PageContainer from "../../components/job.page.component/ui/PageContainer";
import Button from "../../components/job.page.component/ui/Button";
import Tag from "../../components/job.page.component/ui/Tag";
import { getJobById, getUserById } from "../../data/jobmockData";
import Navbar from "src/components/job.page.component/ui/Navbar";

// Utility function to format dates
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const JobDetailsPage = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [employer, setEmployer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      if (jobId) {
        const foundJob = getJobById(jobId);
        if (foundJob) {
          setJob(foundJob);
          const jobEmployer = getUserById(foundJob.employerId);
          setEmployer(jobEmployer);
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
          <h2 className="text-2xl font-semibold text-gray-700">
            Job not found
          </h2>
          <p className="mt-2 text-gray-600">
            This job posting doesn&apos;t exist or has been removed.
          </p>
          <Link
            to="/jobs"
            className="mt-4 inline-block text-blue-600 hover:text-blue-800"
          >
            Back to Jobs
          </Link>
        </div>
      </PageContainer>
    );
  }

  return (
    <>
      <Navbar/>
      <PageContainer>
        <div className="max-w-4xl mx-auto">
          <Link
            to="/jobs"
            className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Jobs
          </Link>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {job.title}
                  </h1>
                  <div className="mt-2">
                    <Link
                      to={`/company/${job.company}`}
                      className="text-lg text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      {job.company}
                    </Link>
                  </div>
                </div>
                <Button size="lg" className="cursor-pointer">
                  Apply Now
                </Button>
              </div>

              <div className="mt-4 flex flex-wrap gap-4 text-gray-600">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-1 text-gray-400" />
                  <span>{job.location}</span>
                  {job.isRemote && (
                    <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs">
                      Remote
                    </span>
                  )}
                </div>

                {job.jobType && (
                  <div className="flex items-center">
                    <BriefcaseIcon className="h-5 w-5 mr-1 text-gray-400" />
                    <span className="capitalize">
                      {job.jobType.replace("-", " ")}
                    </span>
                  </div>
                )}

                {job.salary && (
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900">
                      {job.salary}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Job Description
                </h2>
                <div className="prose max-w-none text-gray-600">
                  {job.description}
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Required Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag, index) => (
                    <Tag key={index} label={tag} />
                  ))}
                </div>
              </div>

              {job.applicationDeadline && (
                <div className="mt-6 flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-1 text-gray-400" />
                  <span>
                    Application deadline: {formatDate(job.applicationDeadline)}
                  </span>
                </div>
              )}
            </div>

            {employer && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div className="flex items-center">
                  <img
                    src={employer.avatar}
                    alt={employer.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <Link
                      to={`/profile/${employer.id}`}
                      className="text-sm font-medium text-gray-900 hover:text-blue-600"
                    >
                      {employer.name}
                    </Link>
                    <p className="text-sm text-gray-500">
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
