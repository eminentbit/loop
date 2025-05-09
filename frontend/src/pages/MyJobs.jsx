import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BriefcaseIcon, Users, FileText, BarChart2 } from "lucide-react";
import PageContainer from "src/components/job.page.component/ui/PageContainer";
import Navbar from "src/components/job.page.component/ui/Navbar";
import { Button } from "src/components/ui/button";
import axios from "axios";

const MyJobs = () => {
  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      try {
        const [applicationResponse, jobsResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/application/user`, {
            withCredentials: true,
          }),
          axios.get(`${import.meta.env.VITE_API_URL}/jobs/user`, {
            withCredentials: true,
          }),
        ]);

        setCompany(applicationResponse.data);
        setJobs(jobsResponse.data);
        setApplications(applicationResponse.data);
      } catch (err) {
        console.log(err);
        setError("Unable to load dashboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading)
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

  if (error)
    return (
      <PageContainer>
        <p className="text-red-500 text-center py-12">{error}</p>
      </PageContainer>
    );

  return (
    <>
      <Navbar />
      <PageContainer>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          My Dashboard
        </h1>

        {/* Company Info */}
        {company && (
          <section className="mb-10 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center">
              <Users className="h-5 w-5 mr-2" /> Company Info
            </h2>
            <p className="mt-2 text-gray-700 dark:text-gray-400">
              Name: {company.name}
            </p>
            <p className="text-gray-700 dark:text-gray-400">
              Email: {company.email}
            </p>
            <p className="text-gray-700 dark:text-gray-400">
              Location: {company.location}
            </p>
            <Link
              to="/company/edit"
              className="mt-4 inline-block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
            >
              Edit Company Details
            </Link>
          </section>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Posted Jobs */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center">
              <BriefcaseIcon className="h-5 w-5 mr-2" /> Posted Jobs
            </h2>
            <Button asChild className="mt-4">
              <Link to="/post-job">Post New Job</Link>
            </Button>
            <ul className="mt-4 space-y-3">
              {jobs.map((job) => (
                <li key={job.id} className="flex justify-between items-center">
                  <Link
                    to={`/jobs/${job.id}`}
                    className="text-blue-600 hover:underline dark:text-blue-400"
                  >
                    {job.title}
                  </Link>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Applications */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center">
              <FileText className="h-5 w-5 mr-2" /> Recent Applications
            </h2>
            <ul className="mt-4 space-y-3">
              {applications.slice(0, 5).map((app) => (
                <li key={app.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {app.applicantName}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {app.jobTitle}
                    </p>
                  </div>
                  <Link
                    to={`/applications/${app.id}`}
                    className="text-blue-600 hover:underline dark:text-blue-400"
                  >
                    View
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to="/applications"
              className="mt-4 inline-block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
            >
              See all applications
            </Link>
          </section>
        </div>

        {/* Analytics */}
        <section className="mt-10 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center">
            <BarChart2 className="h-5 w-5 mr-2" /> Analytics
          </h2>
          <p className="mt-2 text-gray-700 dark:text-gray-400">
            Coming soon: view job views, application trends, and more.
          </p>
        </section>
      </PageContainer>
    </>
  );
};

export default MyJobs;
