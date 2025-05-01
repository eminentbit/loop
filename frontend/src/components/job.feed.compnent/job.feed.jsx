import { useState, useEffect } from "react";
// import { jobsData } from "src/data/jobData";
import FeedPost from "./FeedPost";
import Navbar from "../job.page.component/ui/Navbar";
import { PlusCircle, Send } from "lucide-react";
import axios from "axios";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newPostContent, setNewPostContent] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  useEffect(() => {
    // Simulate API call with a delay
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/feed/posts/`,
          { credentials: "include" }
        );
        if (!response.ok) throw new Error("Failed to fetch posts.");
        const data = await response.json();

        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleComment = (postId, comment) => {
    // In a real app, this would be an API call
    // await fetch(`/api/posts/${postId}/comments`, { method: 'POST', body: JSON.stringify({ content: comment }) })
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: Date.now().toString(),
                  author: {
                    name: "Current User",
                    // avatar: "/placeholder.svg?height=40&width=40",
                  },
                  content: comment,
                  postedAt: new Date().toISOString(),
                  likes: 0,
                  replies: [],
                },
              ],
            }
          : post
      )
    );
  };

  const handleReply = (postId, commentId, replyContent) => {
    // In a real app, this would be an API call
    // await fetch(`/api/posts/${postId}/comments/${commentId}/replies`, { method: 'POST', body: JSON.stringify({ content: replyContent }) })
    setPosts(
      posts.map((post) => {
        if (post.id !== postId) return post;

        return {
          ...post,
          comments: post.comments.map((comment) => {
            if (comment.id !== commentId) return comment;

            return {
              ...comment,
              replies: [
                ...(comment.replies || []),
                {
                  id: Date.now().toString(),
                  author: {
                    name: "Current User",
                    // avatar: "/placeholder.svg?height=40&width=40",
                  },
                  content: replyContent,
                  postedAt: new Date().toISOString(),
                  likes: 0,
                },
              ],
            };
          }),
        };
      })
    );
  };

  const handleCommentLike = async (commentId) => {
    try {
      const endpoint = `/feed/comments/${commentId}/like/`;
      await axios.put(
        `${import.meta.env.VITE_API_URL}${endpoint}`,
        {},
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleReplyLike = (postId, commentId, replyId) => {
    setPosts(
      posts.map((post) => {
        if (post.id !== postId) return post;

        return {
          ...post,
          comments: post.comments.map((comment) => {
            if (comment.id !== commentId) return comment;

            return {
              ...comment,
              replies: (comment.replies || []).map((reply) => {
                if (reply.id !== replyId) return reply;
                return { ...reply, likes: (reply.likes || 0) + 1 };
              }),
            };
          }),
        };
      })
    );
  };

  const handleCreatePost = () => {
    const postFeed = async () => {
      const postData = {
        type: "text",
        content: newPostContent,
      };

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/feed/posts/create/`,
          postData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response.data);

        if (response.status === 201) {
          setNewPostContent("");
          // refreshPosts();
        }
      } catch (error) {
        console.log("Error", error);
      }
    };

    postFeed();
    setNewPostContent("");
    setIsCreatingPost(false);
  };

  return (
    <>
      <Navbar />
      <div className="px-4 sm:px-6 lg:px-8 mx-auto py-8 max-w-4xl">
        <div className="mt-10 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-indigo-500">
              Your Feed
            </h1>
            <p className="text-gray-600 mt-2">
              Discover opportunities and connect with your network
            </p>
          </div>
          <button
            onClick={() => setIsCreatingPost(!isCreatingPost)}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg px-4 py-2 flex items-center gap-2"
          >
            <PlusCircle size={18} />
            <span>Create Post</span>
          </button>
        </div>

        {isCreatingPost && (
          <div className="mt-6 bg-white p-4 rounded-lg shadow">
            <div className="mb-2 font-medium text-gray-700">
              Create a new post
            </div>
            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 min-h-32 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="What's on your mind?"
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={() => setIsCreatingPost(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePost}
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg px-4 py-2 flex items-center gap-2"
                disabled={!newPostContent.trim()}
              >
                <Send size={18} />
                <span>Post</span>
              </button>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <div className="space-y-6 mt-8">
            {posts.map((post) => (
              <FeedPost
                key={post.id}
                post={post}
                onComment={handleComment}
                onReply={handleReply}
                onCommentLike={handleCommentLike}
                onReplyLike={handleReplyLike}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
