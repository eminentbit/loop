import PropTypes from "prop-types";
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

const arrowVariants = {
  animate: {
    y: [0, 10, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const WelcomeStep = ({ nextStep }) => {
  return (
    <div className="flex flex-col items-center text-center p-8 relative bg-gradient-to-r from-white to-blue-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Welcome to Our Platform!
      </h1>
      <p className="text-gray-600 text-lg mb-8">
        Join us today and take the first step toward exciting opportunities.
        Let&apos;s get you set up quickly!
      </p>

      {/* Arrow Animation using Framer Motion */}
      <motion.div
        variants={arrowVariants}
        animate="animate"
        className="absolute bottom-24"
      >
        <ArrowDown className="text-blue-500" size={28} />
      </motion.div>

      <button
        onClick={nextStep}
        className="mt-10 bg-blue-600 text-white px-8 py-3 rounded-lg shadow hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
      >
        Get Started
      </button>
    </div>
  );
};

WelcomeStep.propTypes = {
  nextStep: PropTypes.func.isRequired,
};

export default WelcomeStep;
