import { Link } from "react-router-dom";
import { MapPin, Clock, BriefcaseIcon } from "lucide-react";

// Utility function to format dates
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
import Tag from "../ui/Tag";
import PropTypes from "prop-types";
import { enumToSalary, enumToString } from "src/utils/EnumToString";

// Utility function to calculate relative time
const timeAgo = (dateString) => {
  const now = new Date();
  const past = new Date(dateString);
  const seconds = Math.floor((now - past) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count > 0) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
};

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

const JobCard = ({ job }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900">
            <Link
              to={`/job/${job.id}`}
              className="hover:text-blue-600 transition-colors"
            >
              {job.title}
            </Link>
          </h3>
          <span className="text-sm text-gray-500">
            {timeAgo(job.createdAt)}
          </span>
        </div>

        <div className="flex items-center mt-2 text-gray-600">
          <Link
            to={`/company/${job.company}`}
            className="font-medium hover:text-blue-600 transition-colors"
          >
            {job.company}
          </Link>
        </div>

        <div className="flex items-center mt-2 text-sm text-gray-500">
          <MapPin className="h-4 w-4 mr-1 text-gray-400" />
          <span>{job.location}</span>
          {job.isRemote && (
            <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs">
              Remote
            </span>
          )}
          {job.jobType && (
            <div className="flex items-center ml-4">
              <BriefcaseIcon className="h-4 w-4 mr-1 text-gray-400" />
              <span className="capitalize">{enumToString(job.jobType)}</span>
            </div>
          )}
        </div>

        <p className="mt-4 text-sm text-gray-600">
          {truncateText(job.description, 150)}
        </p>

        {job.tags && (
          <div className="mt-4 flex flex-wrap gap-2">
            {job.tags.map((tag, index) => (
              <Tag key={index} label={tag} />
            ))}
          </div>
        )}

        <div className="mt-6 flex justify-between items-center">
          {job.salary && (
            <span className="text-sm font-medium text-gray-900">
              {enumToSalary(job.salary)}
            </span>
          )}

          {job.applicationDeadline && (
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1 text-gray-400" />
              <span>Apply by {formatDate(job.applicationDeadline)}</span>
            </div>
          )}
        </div>
      </div>
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
        <Link
          to={`/job/${job.id}`}
          className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};
JobCard.propTypes = {
  job: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    isRemote: PropTypes.bool,
    jobType: PropTypes.string,
    description: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    salary: PropTypes.string,
    applicationDeadline: PropTypes.string,
  }).isRequired,
};

export default JobCard;
