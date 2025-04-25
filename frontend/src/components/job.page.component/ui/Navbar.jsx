import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Briefcase, User as UserIcon, Users } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar= () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="bg-white shadow fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
            <div
            className="h-10 w-20 flex items-center justify-center mr-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src="/landing.page.images/image.png" alt="Loop" className="bg-transparent" />
          </div>
            </div>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link 
              to="/jobs" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/jobs') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              } transition-colors duration-200`}
            >
              Jobs
            </Link>
            
            <Link 
              to="/post-job" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/post-job') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              } transition-colors duration-200`}
            >
              Post a Job
            </Link>
            
            <Link 
              to="/following" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/following') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              } transition-colors duration-200`}
            >
              Following
            </Link>
            
            {user ? (
              <div className="flex items-center ml-4">
                <Link 
                  to={`/profile/${user.id}`} 
                  className="flex items-center"
                >
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="h-8 w-8 rounded-full object-cover border-2 border-blue-500 transition-transform hover:scale-105"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700 hover:text-blue-600">
                    {user.name}
                  </span>
                </Link>
                <button 
                  onClick={logout}
                  className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link 
                  to="/login" 
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            <Link
              to="/jobs"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/jobs') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              } transition-colors duration-200`}
              onClick={closeMenu}
            >
              <div className="flex items-center">
                <Briefcase className="h-5 w-5 mr-2" />
                Jobs
              </div>
            </Link>
            
            <Link
              to="/post-job"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/post-job') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              } transition-colors duration-200`}
              onClick={closeMenu}
            >
              <div className="flex items-center">
                <Briefcase className="h-5 w-5 mr-2" />
                Post a Job
              </div>
            </Link>
            
            <Link
              to="/following"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/following') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              } transition-colors duration-200`}
              onClick={closeMenu}
            >
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Following
              </div>
            </Link>
            
            {user ? (
              <>
                <Link
                  to={`/profile/${user.id}`}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive(`/profile/${user.id}`) 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  } transition-colors duration-200`}
                  onClick={closeMenu}
                >
                  <div className="flex items-center">
                    <UserIcon className="h-5 w-5 mr-2" />
                    Profile
                  </div>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-2 px-3 py-2">
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                  onClick={closeMenu}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                  onClick={closeMenu}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;