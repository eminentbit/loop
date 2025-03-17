import { useState, useContext } from "react";
import { DarkModeContext } from "@/components/DarkModeContext";
import { FaCheckCircle } from "react-icons/fa";
import { IoChatbubblesOutline } from "react-icons/io5";
import {
  FiUserPlus,
  FiUser,
  FiUsers,
  FiCalendar,
  FiFileText,
  FiMail,
} from "react-icons/fi";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import PropTypes from "prop-types";

const NetworkPage = ({ userRole }) => {
  const { isDarkMode } = useContext(DarkModeContext);
  const [isOpen, setIsOpen] = useState(true);
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      username: "johndoe",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      verified: true,
      following: false,
    },
    {
      id: 2,
      name: "Jane Smith",
      username: "janesmith",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      verified: false,
      following: true,
    },
    {
      id: 3,
      name: "Mike Johnson",
      username: "mikejohnson",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      verified: true,
      following: false,
    },
  ]);

  const toggleFollow = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, following: !user.following } : user
      )
    );
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} userRole={userRole} />
      <div
        className={`flex-1 p-6 transition-colors ${
          !isOpen ? "ml-16" : "ml-64"
        } ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
        }`}
      >
        <Header />
        <h1 className="text-3xl font-extrabold mb-6">Network</h1>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Panel: Manage My Network */}
          <div className="w-full md:w-1/4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Manage my Network</h2>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded cursor-pointer">
                <FiUser size={20} />
                <span>Followers / Following</span>
              </li>
              <li className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded cursor-pointer">
                <FiUsers size={20} />
                <span>Groups</span>
              </li>
              <li className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded cursor-pointer">
                <FiCalendar size={20} />
                <span>Events</span>
              </li>
              <li className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded cursor-pointer">
                <FiFileText size={20} />
                <span>Pages</span>
              </li>
              <li className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded cursor-pointer">
                <FiMail size={20} />
                <span>Newsletter</span>
              </li>
            </ul>
          </div>

          {/* Right Panel: People to Follow */}
          <div className="w-full md:w-3/4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((user) => (
                <div
                  key={user.id}
                  className={`p-4 rounded-lg shadow-md flex flex-col items-center justify-center w-64 h-72 ${
                    isDarkMode ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  {/* User Avatar */}
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
                  />

                  {/* User Info */}
                  <h2 className="text-lg font-bold flex items-center gap-1 mt-3">
                    {user.name}{" "}
                    {user.verified && (
                      <FaCheckCircle className="text-blue-500" />
                    )}
                  </h2>
                  <p className="text-gray-500 text-sm">@{user.username}</p>

                  {/* Action Buttons */}
                  <div className="mt-4 flex flex-col gap-2 w-full px-4">
                    <button
                      onClick={() => toggleFollow(user.id)}
                      className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md transition text-white ${
                        user.following
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      <FiUserPlus size={18} />
                      {user.following ? "Unfollow" : "Follow"}
                    </button>
                    <button className="w-full p-2 rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300 transition flex items-center justify-center">
                      <IoChatbubblesOutline size={20} />
                      <span className="ml-2">Message</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

NetworkPage.propTypes = {
  userRole: PropTypes.string,
};

export default NetworkPage;
