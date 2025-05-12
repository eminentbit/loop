import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "./Auth/Spinner";

const ProtectiveWrapper = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/auth/check-auth/`,
          {
            credentials: "include",
          }
        );

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          return;
        }
      } catch (error) {
        console.error("Session check failed", error);
        setIsAuthenticated(false);
      }
      const storedSession = sessionStorage.getItem("user");

      if (storedSession != "undefined") {
        setIsAuthenticated(true);
        return;
      }
    };

    checkSession();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        {/* Loading spinner */}
        <Spinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    navigate("/signin", { replace: true });
    return null;
  }

  return <>{children}</>;
};

ProtectiveWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectiveWrapper;
