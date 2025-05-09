import { Check, Clipboard, Download, Mail, Linkedin, X } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";

const ShareModal = ({ url, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}`;
    window.open(twitterUrl, "_blank");
  };

  const handleLinkedInShare = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}`;
    window.open(linkedInUrl, "_blank");
  };

  const handleEmailShare = () => {
    window.location.href = `mailto:?subject=Check this out&body=${encodeURIComponent(
      url
    )}`;
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "shared-content";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full relative">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Share Link</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors text-xl"
          >
            ✕
          </button>
        </div>

        <div className="bg-gray-100 p-3 rounded-md flex items-center gap-2 relative">
          <p className="text-sm text-gray-700 break-all flex-1">{url}</p>
          <button
            onClick={handleCopy}
            className={`transition-colors p-1 rounded hover:bg-gray-200 ${
              copied ? "text-green-600" : "text-gray-600"
            }`}
          >
            {copied ? (
              <Check className="w-5 h-5" />
            ) : (
              <Clipboard className="w-5 h-5" />
            )}
          </button>
          {copied && (
            <span className="absolute top-[-1.5rem] right-3 text-xs text-green-600 bg-white px-2 py-0.5 rounded shadow">
              Copied!
            </span>
          )}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={handleTwitterShare}
            className="flex items-center gap-2 p-2 border rounded hover:bg-blue-50 text-blue-600"
          >
            <X className="w-4 h-4" />X
          </button>

          <button
            onClick={handleLinkedInShare}
            className="flex items-center gap-2 p-2 border rounded hover:bg-blue-50 text-blue-700"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </button>

          <button
            onClick={handleEmailShare}
            className="flex items-center gap-2 p-2 border rounded hover:bg-gray-100 text-gray-700"
          >
            <Mail className="w-4 h-4" />
            Email
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-2 p-2 border rounded hover:bg-gray-100 text-gray-700"
          >
            <Download className="w-4 h-4" />
            Save to Gallery
          </button>
        </div>
      </div>
    </div>
  );
};

ShareModal.propTypes = {
  url: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ShareModal;
