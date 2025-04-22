import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { DarkModeContext } from "../components/DarkModeContext";
import { ArrowLeft, DownloadCloud, FileText, User, Tag, MessageCircle } from "lucide-react";

const mockReports = [
  {
    id: 1,
    title: "Quarterly Hiring Report",
    date: "Q1 2023",
    author: "Alice Johnson",
    tags: ["Hiring", "Recruitment", "Engineering"],
    attachments: [
      { name: "Full Report.pdf", url: "#" },
      { name: "Summary.xlsx", url: "#" }
    ],
    content:
      "This report provides a detailed summary of hiring trends and recruitment outcomes during the first quarter of 2023. Key departments involved include Engineering, Marketing, and HR.",
  },
  {
    id: 2,
    title: "Investor Engagement Report",
    date: "March 2023",
    author: "Bob Lee",
    tags: ["Investors", "Funding", "Presentations"],
    attachments: [
      { name: "Investor Deck.pptx", url: "#" }
    ],
    content:
      "In March 2023, the company engaged with 15 investors, conducted 6 demo presentations, and received feedback on funding rounds, product-market fit, and future projections.",
  },
  {
    id: 3,
    title: "Market Analysis Report",
    date: "February 2023",
    author: "Clara Smith",
    tags: ["Market", "Analysis", "Growth"],
    attachments: [],
    content:
      "A comprehensive analysis of market dynamics, competitor positioning, consumer behavior patterns, and future growth opportunities in the sector.",
  },
];

function ViewReport() {
  const { darkMode } = useContext(DarkModeContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    { user: "John", text: "Great insights!", date: "2023-04-01" },
    { user: "Jane", text: "Very helpful, thanks.", date: "2023-04-02" },
  ]);
  const report = mockReports.find((r) => r.id.toString() === id);

  const handleComment = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([
        ...comments,
        { user: "You", text: comment, date: new Date().toISOString().slice(0, 10) },
      ]);
      setComment("");
    }
  };

  // Placeholder for PDF download
  const handleDownload = () => {
    alert("Download as PDF (functionality to be implemented)");
  };

  return (
    <div
      className={`min-h-screen px-3 md:px-12 py-8 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-xs mb-6" aria-label="Breadcrumb">
          <ol className="flex gap-2 text-gray-500 dark:text-gray-400">
            <li>
              <button onClick={() => navigate("/")} className="hover:underline">Dashboard</button>
              <span className="mx-1">/</span>
            </li>
            <li>
              <button onClick={() => navigate(-1)} className="hover:underline">Reports</button>
              <span className="mx-1">/</span>
            </li>
            <li className="text-gray-700 dark:text-gray-200">{report ? report.title : "Not found"}</li>
          </ol>
        </nav>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center gap-2 text-sm px-3 py-2 rounded mb-6 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            darkMode
              ? "bg-gray-700 text-gray-200 hover:bg-[#1389c9]"
              : "bg-white text-gray-900 border border-gray-300 hover:bg-[#1389c9] hover:text-white"
          }`}
        >
          <ArrowLeft size={16} />
          Back to Reports
        </button>

        {/* Report Card */}
        {report ? (
          <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 animate-fadeIn`} tabIndex="0" aria-label="Report details">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-2">
              <h1 className="text-2xl font-bold">{report.title}</h1>
              <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <FileText size={16} className="mr-1" />
                {report.date}
              </span>
            </div>
            <div className="flex flex-wrap gap-3 items-center mb-4">
              <span className="inline-flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300">
                <User size={16} /> {report.author}
              </span>
              {report.tags.length > 0 && (
                <span className="inline-flex items-center gap-1">
                  <Tag size={16} className="text-blue-500" />
                  {report.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 rounded-full text-xs mr-1">
                      {tag}
                    </span>
                  ))}
                </span>
              )}
            </div>
            <p className="mb-5 text-base text-gray-700 dark:text-gray-300 leading-relaxed">{report.content}</p>
            {report.attachments.length > 0 && (
              <div className="mb-4">
                <h2 className="text-sm font-semibold mb-2">Attachments:</h2>
                <ul className="list-disc ml-6">
                  {report.attachments.map((a) => (
                    <li key={a.name} className="mb-1">
                      <a href={a.url} className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2">
                        <DownloadCloud size={16} /> {a.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <button
              onClick={handleDownload}
              className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <DownloadCloud size={18} /> Download as PDF
            </button>
          </div>
        ) : (
          <div className="bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100 p-6 rounded-lg text-center shadow animate-fadeIn">
            <p className="text-lg font-semibold">Report not found</p>
            <p className="text-sm mt-1">Please check the report ID.</p>
          </div>
        )}

        {/* Comments Section */}
        {report && (
          <section className="mt-10 bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-100 dark:border-gray-700 animate-fadeIn" aria-label="Comments">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
              <MessageCircle size={20} /> Comments
            </h2>
            <ul className="mb-4 max-h-40 overflow-y-auto pr-2">
              {comments.length === 0 ? (
                <li className="text-gray-500 dark:text-gray-400 text-sm">No comments yet.</li>
              ) : (
                comments.map((c, i) => (
                  <li key={i} className="mb-2 border-l-4 border-blue-200 dark:border-blue-700 pl-3">
                    <span className="font-semibold text-blue-700 dark:text-blue-300">{c.user}</span>
                    <span className="ml-2 text-xs text-gray-400">{c.date}</span>
                    <div className="text-gray-700 dark:text-gray-300">{c.text}</div>
                  </li>
                ))
              )}
            </ul>
            <form onSubmit={handleComment} className="flex flex-col md:flex-row gap-2">
              <input
                type="text"
                className="flex-1 rounded px-3 py-2 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                aria-label="Add a comment"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Post
              </button>
            </form>
          </section>
        )}
      </div>
      {/* Animations */}
      <style>
        {`
          .animate-fadeIn {
            animation: fadeIn 0.5s;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(16px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
    </div>
  );
}

export default ViewReport;