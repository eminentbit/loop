import { useState } from "react";
import { useParams } from "react-router-dom";
import PageContainer from "../../components/job.page.component/ui/PageContainer";
import Navbar from "../../components/job.page.component/ui/Navbar";
import Button from "../../components/job.page.component/ui/Button";
import { getJobById } from "../../data/jobmockData";

const ApplyPage = () => {
  const { jobId } = useParams();
  const job = getJobById(jobId);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: null,
    coverLetter: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API submission
    console.log("Application submitted:", formData);
    setSubmitted(true);
  };

  if (!job) {
    return (
      <PageContainer>
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Job not found
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            This job posting doesn&apos;t exist or has been removed.
          </p>
        </div>
      </PageContainer>
    );
  }

  return (
    <>
      <Navbar />
      <PageContainer>
        <div className="max-w-3xl mx-auto py-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Apply for {job.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            at <span className="font-medium text-blue-600">{job.company}</span>
          </p>

          {submitted ? (
            <div className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 p-4 rounded-md">
              Thank you! Your application has been submitted.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-white dark:bg-gray-900 p-6 rounded-md shadow-md border border-gray-200 dark:border-gray-700"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Resume (PDF only)
                </label>
                <input
                  type="file"
                  name="resume"
                  accept=".pdf"
                  required
                  onChange={handleChange}
                  className="mt-1 block w-full text-gray-700 dark:text-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Cover Letter
                </label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleChange}
                  rows={5}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                ></textarea>
              </div>

              <Button type="submit" size="lg">
                Submit Application
              </Button>
            </form>
          )}
        </div>
      </PageContainer>
    </>
  );
};

export default ApplyPage;
