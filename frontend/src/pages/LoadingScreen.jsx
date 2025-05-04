import  { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoLoop from "../assets/logo-loop.jpg";

export default function LoadingScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading process
    const timer = setTimeout(() => {
      navigate("/job-feeds"); // Redirect to jobs page after 3 seconds
    }, 3000);

    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, [navigate]);

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-50">
      <div className="flex flex-col items-center space-y-8">
        {/* Logo with pulse animation */}
        <img
          src={logoLoop}
          alt="LOOP-0S Logo"
          className="w-32 h-32 object-contain animate-pulse"
        />

        {/* Horizontal loader bar */}
        <div className="relative w-64 h-1 bg-gray-200 overflow-hidden rounded-full">
          <div className="absolute inset-y-0 left-0 w-full bg-blue-500 animate-slide" />
        </div>
      </div>
    </div>
  );
}