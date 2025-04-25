import "react";
import { motion } from "framer-motion"; // Importing Framer Motion for animations
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate(); // Hook for programmatic navigation

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }} // Initial animation state (faded and moved up)
      animate={{ opacity: 1, y: 0 }} // Animate to visible state
      transition={{ duration: 0.5 }} // Smooth transition duration
      className="flex flex-col items-center justify-center h-screen text-center bg-gray-100"
    >
      {/* Animated SVG Illustration */}
      <motion.div
        className="w-80 md:w-96"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-48 h-48 text-gray-700 animate-pulse"
        >
          <path d="M1 12h22M12 1v22M4.5 4.5l15 15M4.5 19.5l15-15" />
        </svg>
      </motion.div>

      {/* Page Title */}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-3xl font-bold text-gray-800 mt-4"
      >
        Oops! Page Not Found
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-gray-600 mt-2"
      >
        The page you{"'"}re looking for doesn{"'"}t exist or has been moved.
      </motion.p>

      {/* Animated Button */}
      <motion.button
        whileHover={{ scale: 1.1 }} // Slightly enlarges on hover
        whileTap={{ scale: 0.9 }} // Shrinks slightly when clicked
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
      >
        Go Home
      </motion.button>
    </motion.div>
  );
};

export default NotFoundPage;
