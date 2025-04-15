import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchCSRF from "../utils/FetchCsrf";
import PropTypes from "prop-types";

const ProtectiveWrapper = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        await fetchCSRF();

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/auth/profile/`,
          {
            credentials: "include", // sends cookies/session data
          }
        );

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Session check failed", error);
        setIsAuthenticated(false);
      }
    };

    checkSession();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
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
