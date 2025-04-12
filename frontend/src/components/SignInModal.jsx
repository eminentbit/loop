import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";
import process from "process";

function SignInModal({ setIsModalOpen }) {
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
      const url = `${process.env.VITE_API_ROOT_URL}/auth/login`;
      // Send the login request (you can replace this with your API call)
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // Check if the login was successful
      if (response.ok) {
        const data = await response.json();
        // Handle successful login (store token, redirect, etc.)
        console.log("Login successful", data);
        // You can store tokens or redirect the user here
      } else {
        const errorData = await response.json();
        // Handle login error (e.g., invalid credentials)
        alert(errorData.message || "Login failed");
      }
    } catch (error) {
      // Handle any network errors or unexpected errors
      console.error("Login error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-md">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full relative">
        {/* Close Button */}
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg"
        >
          ✕
        </button>

        {/* Sign In Heading */}
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

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
            <FaFacebook className="text-blue-600" />
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
        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded px-3 py-2"
          />
          <button
            onClick={handleSubmit}
            type="submit"
            className="bg-[hsl(201,83%,43%)] text-white px-4 py-2 rounded hover:bg-[hsl(201,83%,53%)] transition"
          >
            Sign In
          </button>
        </form>

        {/* Forgot Password + Register Links */}
        <div className="mt-4 text-sm text-gray-600 text-center">
          <Link
            to="/forgot-password"
            onClick={() => setIsModalOpen(false)}
            className="text-blue-500 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            onClick={() => setIsModalOpen(false)}
            className="text-[hsl(201,83%,43%)] hover:underline"
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
};

export default SignInModal;
