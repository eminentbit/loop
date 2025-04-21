import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `${isActive(path) ? "text-indigo-500 font-bold" : "text-gray-500"} hover:text-indigo-500 font-medium transition-colors`;

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <div
            className="h-10 w-20 flex items-center justify-center mr-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src="/landing.page.images/image.png" alt="Loop" className="bg-transparent" />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className={linkClass(link.path)}>
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="px-5 py-2 rounded-full bg-white border border-gray-200 text-indigo-500 font-medium shadow-sm hover:shadow-lg hover:bg-indigo-100 hover:text-indigo-500 transition-all cursor-pointer"
            onClick={() => navigate("/signin")}
            >
              Login
            </button>
            <button className="px-5 py-2 rounded-full bg-indigo-500 text-white font-medium shadow-sm hover:shadow-lg hover:bg-indigo-700 transition-all cursor-pointer"
            onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-gray-500 hover:text-indigo-500 transition-colors cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`${linkClass(link.path)} py-2`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <button className="w-full px-5 py-2 rounded-full bg-white border border-gray-200 text-indigo-500 font-medium shadow-sm hover:shadow-lg hover:bg-indigo-100 hover:text-indigo-500 transition-all cursor-pointer"
              onClick={() => {
                setIsMenuOpen(false);
                navigate("/signin")
              }}
              >
                Login
              </button>
              <button className="w-full px-5 py-2 rounded-full bg-indigo-500 text-white font-medium shadow-sm hover:bg-indigo-700 transition-all cursor-pointer"
              onClick={() => {
                setIsMenuOpen(false);
                navigate("/signup")
              }}
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
