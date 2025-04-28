import axios from "axios";
import { FaFacebook } from "react-icons/fa";

const FacebookLogin = () => {
  const handleFacebookLogin = async () => {
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
      onClick={handleFacebookLogin}
    >
      <FaFacebook className="text-indigo-600" />
      Continue with Facebook
    </button>
  );
};

export default FacebookLogin;
