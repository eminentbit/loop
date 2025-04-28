import axios from "axios";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/logout/`,
        {},
        {
          withCredentials: true,
        }
      );

      sessionStorage.clear();

      navigate("/signin");
    } catch (error) {
      console.log("Error loggin out", error);
    }
  };
  return (
    <div>
      <button
        onClick={handleLogout}
        className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors duration-200"
        aria-label="Logout"
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;
