import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import Button from "../job.page.component/ui/Button";
import JobCommentSection from "./comment-section";
import ShareModal from "../ShareModal";

// Custom Textarea Component
function CustomTextarea({ value, onChange, placeholder, className }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${className}`}
    />
  );
}

CustomTextarea.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

export default function JobPost({ job, onLike, onComment, onReply }) {
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log(job);
  }, [job]);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      onComment(job.id, comment);
      setComment("");
    }
  };

  return (
    <div className="shadow-md border rounded-md">
      <div className="flex flex-row items-start gap-4 p-4 border-b">
        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          {job.user.profile ? (
            <img
              src={job.user.profile}
              alt={job.user.fullName}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-sm font-medium text-gray-600">
              {job.user.fullName?.[0] || "?"}
            </span>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{job.user.fullName}</h3>
              <p className="text-sm text-gray-500">{job.user.company}</p>
            </div>
            <p className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}
            </p>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{job.title}</h2>
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded">
            {job.jobType}
          </span>
          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
            {job.salary}
          </span>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
            {job.location}
          </span>
        </div>
        <p className="text-gray-700">{job.description}</p>

        {job.skills && job.skills.length > 0 && (
          <div className="mt-3">
            <p className="text-sm font-medium mb-1">Skills:</p>
            <div className="flex flex-wrap gap-1">
              {job.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col border-t p-4">
        <div className="flex justify-between items-center w-full mb-3">
          <div className="flex gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 text-gray-600 hover:text-indigo-600"
              onClick={() => onLike(job.id)}
            >
              <Heart
                className={`h-5 w-5 ${
                  job.likes > 0 ? "fill-indigo-500 text-indigo-500" : ""
                }`}
              />
              <span>{job.likes}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 text-gray-600 hover:text-indigo-600"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle className="h-5 w-5" />
              <span>{job.comments.length}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 text-gray-600 hover:text-indigo-600"
              onClick={() => {
                console.log("True");
                setIsOpen(true);
              }}
            >
              <Share2 className="h-5 w-5" />
              <span>Share</span>
            </Button>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="text-indigo-600 border-indigo-600 hover:bg-indigo-50"
          >
            Apply Now
          </Button>
        </div>
        {isOpen && (
          <ShareModal
            url={""}
            onClose={() => {
              setIsOpen(false);
            }}
          />
        )}

        {showComments && (
          <div className="w-full">
            <JobCommentSection
              comments={job.comments}
              onReply={(commentId, replyContent) =>
                onReply(job.id, commentId, replyContent)
              }
            />
            <form onSubmit={handleSubmitComment} className="mt-3 flex gap-2">
              <CustomTextarea
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-[60px]"
              />
              <Button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white self-end"
                disabled={!comment.trim()}
              >
                Post
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

JobPost.propTypes = {
  job: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    jobType: PropTypes.string.isRequired,
    salary: PropTypes.string.isRequired,
    content: PropTypes.string,
    location: PropTypes.string.isRequired,
    postedAt: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
      })
    ).isRequired,
    skills: PropTypes.arrayOf(PropTypes.string),
    user: PropTypes.shape({
      fullName: PropTypes.string.isRequired,
      avatar: PropTypes.string,
      company: PropTypes.string.isRequired,
      profile: PropTypes.string,
    }).isRequired,
  }).isRequired,
  onLike: PropTypes.func.isRequired,
  onComment: PropTypes.func.isRequired,
  onReply: PropTypes.func.isRequired,
};
