import axios from "axios";
import { FaGoogle } from "react-icons/fa";

const GoogleLogin = () => {
  const handleGoogleLogin = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/auth/google/`;
      const response = await axios.get(url, {
        withCredentials: true,
      });

      console.log("Google login successful", response.data);
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  return (
    <button
      className="flex items-center justify-center gap-2 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 transition cursor-pointer"
      onClick={handleGoogleLogin}
    >
      <FaGoogle className="text-red-500" />
      Continue with Google
    </button>
  );
};

export default GoogleLogin;
