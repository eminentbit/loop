import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";
import axios from "axios";
import getCookie from "../utils/GetCookie";
import { ArrowLeft } from "lucide-react";

function SignInModal({ setIsModalOpen, onClose }) {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the username and password from the form
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Validate the form data (optional)
    if (!email || !password) {
      alert("Please enter both username and password");
      return;
    }

    try {
      const url = `${import.meta.env.VITE_API_URL}/auth/login/`;

      const response = await axios.post(
        url,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie("csrftoken"),
          },
          withCredentials: true,
        }
      );

      console.log("Login successful", response.data);

      if (setIsModalOpen) {
        setIsModalOpen(false);
      }
      navigate("/feed");
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        alert(error.response.data.message || "Login failed");
      } else {
        console.error("Login error:", error);
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="fixed bg-gray-50 inset-0 z-50 flex flex-col items-center justify-center bg-opacity-50 backdrop-blur-md">
      {/* Back button */}
      <div
        className="left-4 absolute top-4 flex items-center gap-2 bg-indigo-500 text-white px-3 py-2 rounded-full hover:bg-indigo-600 cursor-pointer transition"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm">Back</span>
      </div>
      <div className="bg-white mt-20 overflow-auto rounded-lg shadow-xl p-8 max-w-lg w-[90%] relative">
        {/* Close Button */}
        <button
          onClick={
            onClose
              ? onClose
              : () => {
                  setIsModalOpen(false);
                }
          }
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg"
        >
          ✕
        </button>

        {/* Sign In Heading */}
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>

        {/* OAuth Sign-in Options */}
        <div className="flex flex-col gap-3">
          <button className="flex items-center justify-center gap-2 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 transition">
            <FaGoogle className="text-red-500" />
            Continue with Google
          </button>
          <button className="flex items-center justify-center gap-2 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 transition">
            <FaGithub className="text-gray-700" />
            Continue with GitHub
          </button>
          <button className="flex items-center justify-center gap-2 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 transition">
            <FaFacebook className="text-indigo-600" />
            Continue with Facebook
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-2 text-gray-500 text-sm">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Email/Password Sign-in */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded px-3 py-2"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded px-3 py-2"
          />
          <button
            type="submit"
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-500 transition"
          >
            Sign In
          </button>
        </form>

        {/* Forgot Password + Register Links */}
        <div className="mt-4 text-sm text-gray-600 text-center">
          <Link
            to="/forgot-password"
            onClick={() => setIsModalOpen(false)}
            className="text-indigo-500 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            onClick={() => setIsModalOpen(false)}
            className="text-indigo-500 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

SignInModal.propTypes = {
  setIsModalOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func,
};

export default SignInModal;
