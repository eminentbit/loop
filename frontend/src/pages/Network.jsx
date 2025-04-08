import  { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
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

const NetworkPage = ({ userRole }) => {
  const { isDarkMode } = useContext(DarkModeContext);
  const [isOpen, setIsOpen] = useState(true);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/network/users/", {
          credentials: "include",
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Follow / unfollow handler
  const toggleFollow = async (id) => {
    // Optimistic update
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, following: !u.following } : u))
    );

    try {
      await fetch("http://localhost:8000/api/network/follow-toggle/", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: id }),
      });
    } catch (err) {
      console.error("Follow toggle failed:", err);
      // Rollback
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, following: !u.following } : u))
      );
    }
  };

  if (loading) return <div className="p-6">Loading network…</div>;
  if (error) return <div className="p-6 text-red-500">Failed to load users.</div>;

  return (
    <div className="flex min-h-screen">
      <Sidebar userRole={userRole} isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className={`flex-1 p-6 transition-colors ${
          !isOpen ? "ml-16" : "ml-64"
        } ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
        }`}
      >
        <Header userRole={userRole} />
        <h1 className="text-3xl font-extrabold mb-6">Network</h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Panel */}
          <div className="w-full md:w-1/4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Manage my Network</h2>
            <ul className="space-y-3">
              {[
                { icon: FiUser, label: "Followers / Following" },
                { icon: FiUsers, label: "Groups" },
                { icon: FiCalendar, label: "Events" },
                { icon: FiFileText, label: "Pages" },
                { icon: FiMail, label: "Newsletter" },
              ].map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded cursor-pointer"
                >
                  <Icon size={20} />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Panel */}
          <div className="w-full md:w-3/4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((user) => {
                const fullName =
                  [user.first_name, user.last_name].filter(Boolean).join(" ") ||
                  user.username;
                return (
                  <div
                    key={user.id}
                    className={`p-4 rounded-lg shadow-md flex flex-col items-center justify-center w-64 h-72 ${
                      isDarkMode ? "bg-gray-800" : "bg-white"
                    }`}
                  >
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
                    />

                    <h2 className="text-lg font-bold flex items-center gap-1 mt-3">
                      {fullName}
                      {user.verified && (
                        <FaCheckCircle className="text-blue-500" />
                      )}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      @{user.username}
                    </p>

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
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

NetworkPage.propTypes = {
  userRole: PropTypes.string.isRequired,
};

export default NetworkPage;
