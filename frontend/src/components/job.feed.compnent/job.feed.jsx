import { useState, useEffect } from "react";
import { jobsData } from "src/data/jobData";
import JobPost from "./job.post";
import Navbar from "../job.page.component/ui/Navbar";

export default function JobFeed() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with a delay
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/jobs')
        // const data = await response.json()
        setTimeout(() => {
          setJobs(jobsData);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleLike = (jobId) => {
    // In a real app, this would be an API call
    // await fetch(`/api/jobs/${jobId}/like`, { method: 'POST' })
    setJobs(
      jobs.map((job) =>
        job.id === jobId ? { ...job, likes: job.likes + 1 } : job
      )
    );
  };

  const handleComment = (jobId, comment) => {
    // In a real app, this would be an API call
    // await fetch(`/api/jobs/${jobId}/comments`, { method: 'POST', body: JSON.stringify({ content: comment }) })
    setJobs(
      jobs.map((job) =>
        job.id === jobId
          ? {
              ...job,
              comments: [
                ...job.comments,
                {
                  id: Date.now().toString(),
                  author: {
                    name: "Current User",
                    avatar: "/placeholder.svg?height=40&width=40",
                  },
                  content: comment,
                  postedAt: new Date().toISOString(),
                  replies: [],
                },
              ],
            }
          : job
      )
    );
  };

  const handleReply = (jobId, commentId, replyContent) => {
    // In a real app, this would be an API call
    // await fetch(`/api/jobs/${jobId}/comments/${commentId}/replies`, { method: 'POST', body: JSON.stringify({ content: replyContent }) })
    setJobs(
      jobs.map((job) => {
        if (job.id !== jobId) return job;

        return {
          ...job,
          comments: job.comments.map((comment) => {
            if (comment.id !== commentId) return comment;

            return {
              ...comment,
              replies: [
                ...(comment.replies || []),
                {
                  id: Date.now().toString(),
                  author: {
                    name: "Current User",
                    avatar: "/placeholder.svg?height=40&width=40",
                  },
                  content: replyContent,
                  postedAt: new Date().toISOString(),
                },
              ],
            };
          }),
        };
      })
    );
  };

  return (
    <>
      <Navbar />
      <div className="px-4 sm:px-6 lg:px-8 mx-auto py-8">
        <div className="mt-10">
          <h1 className="text-2xl md:text-3xl font-bold text-indigo-500">
            Explore Your Next Opportunity
          </h1>
          <p className="text-gray-600 mt-2">
            Discover jobs that match your skills and passion.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <div className="space-y-6 mt-8">
            {jobs.map((job) => (
              <JobPost
                key={job.id}
                job={job}
                onLike={handleLike}
                onComment={handleComment}
                onReply={handleReply}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
