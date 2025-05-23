import { useState, useEffect, useRef, useContext } from "react";
import JobCard from "../components/JobsCard";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { ChevronDownIcon } from "lucide-react";
import PropTypes from "prop-types";
import getCookie from "../utils/GetCookie";
import { DarkModeContext } from "../context/DarkModeContext";
import axios from "axios";

import AddJobModal from "../components/AddJob";
import React from "react";
// 🔽 Dropdown Component
const Dropdown = ({ label, options, selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(() => {
    const storedValue = localStorage.getItem("sidebarOpen");
    return storedValue ? JSON.parse(storedValue) : true;
  });

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(isOpen));
  }, [isOpen]);

  const { isDarkMode } = useContext(DarkModeContext);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`relative m-0 transition-colors ${
        isDarkMode ? "text-gray-200" : "text-gray-900"
      }`}
      ref={dropdownRef}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`border rounded-full px-4 py-2 text-left focus:outline-none transition-colors ${
          isDarkMode
            ? "bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600"
            : "bg-white border-gray-300 text-gray-900 hover:bg-gray-100"
        }`}
      >
        <div className="flex">
          {selected !== "All" && selected ? selected : label}
          <ChevronDownIcon />
        </div>
      </button>

      {isOpen && (
        <ul
          className={`absolute z-10 mt-1 rounded-md shadow-lg transition-colors ${
            isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-900"
          }`}
        >
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
              className={`px-4 py-2 cursor-pointer transition-colors ${
                isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// 🔽 Main Jobs Page Component
const JobsPage = ({ userRole }) => {
  const [jobs, setJobs] = useState([]);
  const [isSidebarOpen, setSidebarIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedJobType, setSelectedJobType] = useState("All");
  const [selectedCompany, setSelectedCompany] = useState("All");
  const [selectedSalary, setSelectedSalary] = useState("All");
  const { isDarkMode } = useContext(DarkModeContext);

  // State for new job form (only used if userRole is recruiter)
  const [newJob, setNewJob] = useState({
    title: "",
    company: "",
    location: "",
    type: "",
    description: "",
    salary: "",
  });

  // 🔁 Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`http://localhost:3000.api/jobs/`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie("csrftoken"),
          },
        });
        const data = await response.data;

        setJobs(data);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  // Filter options
  const locations = ["All", "Remote", "Hybrid", "On-site"];
  const jobTypes = ["All", "Full-time", "Contract"];
  const companies = [
    "All",
    ...Array.from(new Set(jobs.map((job) => job.company))),
  ];
  const salaryRanges = [
    "All",
    "$60k - $80k",
    "$70k - $90k",
    "$80k - $100k",
    "100k+",
  ];

  // 🔍 Filter jobs based on search & selections
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation =
      selectedLocation === "All" || job.location === selectedLocation;
    const matchesJobType =
      selectedJobType === "All" || job.type === selectedJobType;
    const matchesCompany =
      selectedCompany === "All" || job.company === selectedCompany;
    const matchesSalary =
      selectedSalary === "All" || job.salary === selectedSalary;

    return (
      matchesSearch &&
      matchesLocation &&
      matchesJobType &&
      matchesCompany &&
      matchesSalary
    );
  });

  // Handle recruiter's job submission
  const handleJobSubmit = async (e) => {
    e.preventDefault();
    //   try {
    //     // const response = await axios.post(
    //     //   // `${import.meta.env.VITE_API_URL}/jobs/`,
    //     //   newJob,
    //     //   {
    //     //     headers: {
    //     //       "Content-Type": "application/json",
    //     //       "X-CSRFToken": getCookie("csrftoken"),
    //     //     },
    //     //     withCredentials: true,
    //     //   }
    //     );

    //     console.log("Job submitted successfully:", response.data);
    //     setJobs((prevJobs) => [...prevJobs, response.data]);
    //     setNewJob({
    //       title: "",
    //       company: "",
    //       location: "",
    //       type: "",
    //       description: "",
    //       salary: "",
    //     });
    //   } catch (error) {
    //     console.log(error);
    //   }
    //   console.log("Submitting job:", newJob);

    //   // Refresh jobs (or optimistically update jobs state)
    //   // const updatedJobs = await fetchUpdatedJobs();
    //   // setJobs(updatedJobs);
    // };

    return (
      <div
        className={`flex min-h-screen transition-colors ${
          isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
        }`}
      >
        <Sidebar
          userRole={userRole}
          isOpen={isSidebarOpen}
          setIsOpen={setSidebarIsOpen}
        />

        <div
          className={`flex-1 p-6 transition-all ${
            isSidebarOpen ? "lg:ml-64" : "lg:ml-16"
          } ${isDarkMode ? "bg-gray-800" : "bg-gray-50"}`}
        >
          <Header className="mb-6" userRole={userRole} />
          <h1 className="text-3xl font-bold mb-6">Job Listings</h1>

          {/* Recruiter Section: Show Add Job form if userRole is recruiter */}
          {userRole === "recruiter" && (
            <AddJobModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              handleJobSubmit={handleJobSubmit}
              newJob={newJob}
              setNewJob={setNewJob}
            />
          )}

          {/* 🔽 Filters */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`flex-1 border rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[200px] transition-colors ${
                isDarkMode
                  ? "bg-gray-700 text-gray-200 border-gray-600"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            />

            <Dropdown
              label="Location"
              options={locations}
              selected={selectedLocation}
              onSelect={setSelectedLocation}
            />
            <Dropdown
              label="Job Type"
              options={jobTypes}
              selected={selectedJobType}
              onSelect={setSelectedJobType}
            />
            <Dropdown
              label="Company"
              options={companies}
              selected={selectedCompany}
              onSelect={setSelectedCompany}
            />
            <Dropdown
              label="Salary Range"
              options={salaryRanges}
              selected={selectedSalary}
              onSelect={setSelectedSalary}
            />
          </div>

          {/* 🧱 Job Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                className={`transition-transform duration-200 hover:scale-105 ${
                  isDarkMode
                    ? "dark:bg-gray-800 text-white border border-gray-700"
                    : "bg-white text-gray-800 border border-gray-300"
                }`}
              />
            ))}
          </div>
          {userRole !== "jobseeker" && (
            <div className="flex items-center justify-center mt-5">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white  font-semibold py-2 px-4 rounded-xl shadow-md transition duration-300 ease-in-out"
              >
                Add New Job
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };
};

JobsPage.propTypes = {
  userRole: PropTypes.string.isRequired,
};

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default JobsPage;
