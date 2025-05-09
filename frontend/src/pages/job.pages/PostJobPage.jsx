import { useEffect, useState, useCallback } from "react";
import { PlusCircle, X } from "lucide-react";
import PageContainer from "../../components/job.page.component/ui/PageContainer";
import Button from "../../components/job.page.component/ui/Button";
import { useNavigate } from "react-router-dom";
import Navbar from "src/components/job.page.component/ui/Navbar";
import axios from "axios";

const PostJobPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    company: user?.company || "",
    location: "",
    description: "",
    salary: "",
    applicationDeadline: "",
    isRemote: false,
    jobType: "FULL_TIME",
  });

  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [isJobseeker, setIsJobseeker] = useState(false);
  const [showUpgradeForm, setShowUpgradeForm] = useState(false);

  useEffect(() => {
    // Use a try-catch block to handle potential storage errors
    try {
      const storedUser = sessionStorage.getItem("user");

      setUser(storedUser ? JSON.parse(storedUser) : null);
      if (!storedUser) {
        navigate("/signin");
      }
      // Check if the user is a jobseeker
      if (JSON.parse(storedUser).role === "jobseeker") {
        setIsJobseeker(true);
      }
    } catch (error) {
      console.error("Error accessing sessionStorage:", error);
    }
  }, [navigate]);

  // Update company name if user changes after initial render
  useEffect(() => {
    console.log(isJobseeker, user);
    if (user?.company && !formData.company) {
      setFormData((prev) => ({
        ...prev,
        company: user.company,
      }));
    }
  }, [user, formData.company, isJobseeker]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear error when field is edited
    setErrors((prevErrors) => {
      if (prevErrors[name]) {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      }
      return prevErrors;
    });
  }, []);

  const handleCheckboxChange = useCallback((e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  }, []);

  const handleAddTag = useCallback(
    (e) => {
      if (e.key === "Enter" && tagInput.trim()) {
        e.preventDefault();
        const normalizedTag = tagInput.trim();
        if (!tags.includes(normalizedTag)) {
          setTags((prevTags) => [...prevTags, normalizedTag]);

          // Clear the tags error if it exists
          setErrors((prevErrors) => {
            if (prevErrors.tags) {
              const newErrors = { ...prevErrors };
              delete newErrors.tags;
              return newErrors;
            }
            return prevErrors;
          });
        }
        setTagInput("");
      }
    },
    [tagInput, tags]
  );

  const handleRemoveTag = useCallback((tagToRemove) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Job title is required";
    if (!formData.company.trim())
      newErrors.company = "Company name is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.description.trim())
      newErrors.description = "Job description is required";
    if (tags.length === 0)
      newErrors.tags = "At least one skill/tag is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, tags]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!validateForm()) return;

      setIsSubmitting(true);
      try {
        const jobData = {
          ...formData,
          skills: tags,
        };

        console.log(jobData);

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/jobs/create`,
          jobData,
          {
            withCredentials: true,
          }
        );

        console.log("Job posted successfully:", response.data);
        navigate("/jobs");
      } catch (error) {
        console.error("Error posting job:", error);
        setErrors((prev) => ({
          ...prev,
          submit: error.response?.data?.message || "Failed to post job",
        }));
      } finally {
        setIsSubmitting(false);
      }
    },
    [validateForm, formData, tags, navigate]
  );

  const handleUpgrade = useCallback(() => {
    // Implement the logic to upgrade user to recruiter
    setShowUpgradeForm(false);
    // In a real app, you would call an API endpoint to update the user role
    try {
      sessionStorage.setItem("userRole", "recruiter");
      setIsJobseeker(false);
    } catch (error) {
      console.error("Error updating session storage:", error);
    }
  }, []);

  return (
    <>
      <Navbar />
      <PageContainer title="Post a Job">
        {isJobseeker && !showUpgradeForm && (
          <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md mb-6">
            <p className="text-sm">
              You are currently a jobseeker. To post a job, you need to become a
              recruiter.
            </p>
            <Button
              size="sm"
              onClick={() => setShowUpgradeForm(true)}
              className="mt-2"
            >
              Convert to Recruiter
            </Button>
          </div>
        )}
        {showUpgradeForm ? (
          <div className="bg-white p-4 rounded-md shadow-sm mb-6 max-w-3xl mx-auto">
            <h3 className="text-lg font-medium">Convert to Recruiter</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpgrade();
              }}
            >
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Your Company"
                    required
                  />
                </div>
                <Button type="submit" size="sm" className="mt-2">
                  Submit & Become Recruiter
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Job Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        disabled={isJobseeker}
                        onChange={handleInputChange}
                        placeholder="e.g. Senior Frontend Developer"
                        className={`w-full px-3 py-2 border ${
                          errors.title ? "border-red-500" : "border-gray-300"
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                        aria-invalid={errors.title ? "true" : "false"}
                        aria-describedby={
                          errors.title ? "title-error" : undefined
                        }
                      />
                      {errors.title && (
                        <p
                          id="title-error"
                          className="mt-1 text-sm text-red-500"
                        >
                          {errors.title}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="company"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Company <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          disabled={isJobseeker}
                          onChange={handleInputChange}
                          placeholder="e.g. Acme Inc."
                          className={`w-full px-3 py-2 border ${
                            errors.company
                              ? "border-red-500"
                              : "border-gray-300"
                          } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                          aria-invalid={errors.company ? "true" : "false"}
                          aria-describedby={
                            errors.company ? "company-error" : undefined
                          }
                        />
                        {errors.company && (
                          <p
                            id="company-error"
                            className="mt-1 text-sm text-red-500"
                          >
                            {errors.company}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="location"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Location <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          disabled={isJobseeker}
                          placeholder="e.g. San Francisco, CA"
                          className={`w-full px-3 py-2 border ${
                            errors.location
                              ? "border-red-500"
                              : "border-gray-300"
                          } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                          aria-invalid={errors.location ? "true" : "false"}
                          aria-describedby={
                            errors.location ? "location-error" : undefined
                          }
                        />
                        {errors.location && (
                          <p
                            id="location-error"
                            className="mt-1 text-sm text-red-500"
                          >
                            {errors.location}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Job Description <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        disabled={isJobseeker}
                        rows={6}
                        placeholder="Describe the role, responsibilities, requirements, benefits, etc."
                        className={`w-full px-3 py-2 border ${
                          errors.description
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                        aria-invalid={errors.description ? "true" : "false"}
                        aria-describedby={
                          errors.description ? "description-error" : undefined
                        }
                      />
                      {errors.description && (
                        <p
                          id="description-error"
                          className="mt-1 text-sm text-red-500"
                        >
                          {errors.description}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="experience"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Experience Required
                      </label>
                      <select
                        id="experience"
                        name="experience"
                        disabled={isJobseeker}
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      >
                        <option value="">Select experience level</option>
                        <option value="entry">Entry Level (0-2 years)</option>
                        <option value="mid">Mid Level (2-5 years)</option>
                        <option value="senior">Senior Level (5+ years)</option>
                        <option value="lead">Lead/Manager (7+ years)</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="requiredSkills"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Required Skills
                      </label>
                      <textarea
                        id="requiredSkills"
                        name="requiredSkills"
                        value={formData.requiredSkills}
                        onChange={handleInputChange}
                        disabled={isJobseeker}
                        rows={3}
                        placeholder="List the key skills required for this position"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="salary"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Salary Range
                        </label>
                        <select
                          id="salary"
                          name="salary"
                          disabled={isJobseeker}
                          value={formData.salary}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        >
                          <option value="">Select salary range</option>
                          <option value="VERY_LOW"> {"<"}$50,000</option>
                          <option value="LOW">$50,000 - $70,000</option>
                          <option value="MEDIUM">$70,000 - $90,000</option>
                          <option value="HIGH">$90,000 - $120,000</option>
                          <option value="VERY_HIGH">$120,000 - $150,000</option>
                          <option value="ULTRA">$150,000+</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="applicationDeadline"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Application Deadline
                        </label>
                        <input
                          type="date"
                          id="applicationDeadline"
                          disabled={isJobseeker}
                          name="applicationDeadline"
                          value={formData.applicationDeadline}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="jobType"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Job Type
                        </label>
                        <select
                          id="jobType"
                          name="jobType"
                          disabled={isJobseeker}
                          value={formData.jobType}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        >
                          <option value="FULL_TIME">Full-time</option>
                          <option value="PART_TIME">Part-time</option>
                          <option value="CONTRACT">Contract</option>
                          <option value="FREELANCE">Freelance</option>
                          <option value="INTERN">Internship</option>
                        </select>
                      </div>

                      <div className="flex items-center h-full pt-6">
                        <input
                          type="checkbox"
                          id="isRemote"
                          name="isRemote"
                          disabled={isJobseeker}
                          checked={formData.isRemote}
                          onChange={handleCheckboxChange}
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label
                          htmlFor="isRemote"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          This is a remote position
                        </label>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="tags"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Skills / Tags <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <PlusCircle className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          id="tags"
                          value={tagInput}
                          disabled={isJobseeker}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyDown={handleAddTag}
                          placeholder="Add a skill and press Enter (e.g. React, JavaScript, Marketing)"
                          className={`w-full pl-10 pr-4 py-2 border ${
                            errors.tags ? "border-red-500" : "border-gray-300"
                          } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                          aria-invalid={errors.tags ? "true" : "false"}
                          aria-describedby={
                            errors.tags ? "tags-error" : undefined
                          }
                        />
                      </div>
                      {errors.tags && (
                        <p
                          id="tags-error"
                          className="mt-1 text-sm text-red-500"
                        >
                          {errors.tags}
                        </p>
                      )}

                      {tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {tags.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {tag}
                              <button
                                type="button"
                                disabled={isJobseeker}
                                className="ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-blue-800 hover:bg-blue-200"
                                onClick={() => handleRemoveTag(tag)}
                                aria-label={`Remove ${tag} tag`}
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-4 flex justify-end">
                      <Button
                        type="submit"
                        isLoading={isSubmitting}
                        size="lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Posting..." : "Post Job"}
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </PageContainer>
    </>
  );
};

export default PostJobPage;
