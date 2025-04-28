import { useState } from "react";
import PropTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";
import { Reply } from "lucide-react";
import Button from "../job.page.component/ui/Button";

function JobCommentSection({ comments, onReply }) {
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState("");

  const handleSubmitReply = (commentId) => {
    if (replyContent.trim()) {
      onReply(commentId, replyContent);
      setReplyContent("");
    }
  };

  if (comments.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        No comments yet. Be the first to comment!
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <div key={comment.id} className="space-y-3">
          <div className="flex gap-3">
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {comment.author.avatar ? (
                <img
                  src={comment.author.avatar}
                  alt={comment.author.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-sm font-medium text-gray-600">
                  {comment.author.name[0]}
                </span>
              )}
            </div>
            <div className="flex-1">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between items-start">
                  <span className="font-medium text-sm">
                    {comment.author.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(comment.postedAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
                <p className="text-sm mt-1">{comment.content}</p>
              </div>

              <div className="mt-1 ml-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-gray-500 hover:text-indigo-600"
                  onClick={() =>
                    setReplyingTo(replyingTo === comment.id ? null : comment.id)
                  }
                >
                  <Reply className="h-3 w-3 mr-1" />
                  Reply
                </Button>
              </div>
            </div>
          </div>

          {/* Replies to this comment */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="ml-10 space-y-3">
              {comment.replies.map((reply) => (
                <div key={reply.id} className="flex gap-3">
                  <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {reply.author.avatar ? (
                      <img
                        src={reply.author.avatar}
                        alt={reply.author.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-xs font-medium text-gray-600">
                        {reply.author.name[0]}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 bg-gray-50 p-2 rounded-lg">
                    <div className="flex justify-between items-start">
                      <span className="font-medium text-xs">
                        {reply.author.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatDistanceToNow(new Date(reply.postedAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                    <p className="text-xs mt-1">{reply.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Reply form */}
          {replyingTo === comment.id && (
            <div className="ml-10 flex gap-2">
              <textarea
                placeholder={`Reply to ${comment.author.name}...`}
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="min-h-[60px] text-sm border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div className="flex flex-col gap-2">
                <Button
                  type="button"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-3 py-1 h-auto"
                  disabled={!replyContent.trim()}
                  onClick={() => handleSubmitReply(comment.id)}
                >
                  Reply
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="text-xs px-3 py-1 h-auto"
                  onClick={() => {
                    setReplyingTo(null);
                    setReplyContent("");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

JobCommentSection.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      author: PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string,
      }).isRequired,
      content: PropTypes.string.isRequired,
      postedAt: PropTypes.string.isRequired,
      replies: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          author: PropTypes.shape({
            name: PropTypes.string.isRequired,
            avatar: PropTypes.string,
          }).isRequired,
          content: PropTypes.string.isRequired,
          postedAt: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
  onReply: PropTypes.func.isRequired,
};

export default JobCommentSection;