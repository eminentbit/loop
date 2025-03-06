// Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 p-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h3 className="text-xl font-bold text-white">Loop</h3>
          <p className="text-sm">
            Connecting Talent with Opportunity, Effortlessly.
          </p>
        </div>
        <nav className="flex space-x-4">
          <Link to="/support" className="hover:text-white">
            Support
          </Link>
          <Link to="/privacy" className="hover:text-white">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-white">
            Terms of Service
          </Link>
          <Link to="/contact" className="hover:text-white">
            Contact
          </Link>
        </nav>
      </div>
      <div className="mt-4 text-center text-xs">
        &copy; {new Date().getFullYear()} Loop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
