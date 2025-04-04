import { useState } from "react";
import JobCard from "../components/JobsCard";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import jobs from "../data/recommended";
import { useParams } from "react-router-dom";
const DetailPage = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const jobId = useParams().jobId;

  const applyForJob = () => {
    alert(`You have applied for the job with ID: ${jobId}`);
  };

  return (
    <div>
      <Header />
      <div className="content">
        <Sidebar />
        <div className="job-list">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onApply={() => applyForJob(job.id)}
              onSelect={() => setSelectedJob(job)}
            />
          ))}
        </div>
        {selectedJob && (
          <div className="job-detail">
            <h2>{selectedJob.title}</h2>
            <p>{selectedJob.description}</p>
            <button onClick={() => applyForJob(selectedJob.id)}>Apply</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailPage;
