import { useState, useContext } from "react";
import { DarkModeContext } from "@/components/DarkModeContext";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import {
  FaSearch,
  FaComment,
  FaUser,
  FaBell,
  FaCheckCircle,
} from "react-icons/fa";

const NotificationPage = () => {
  const { isDarkMode } = useContext(DarkModeContext);
  const [isOpen, setIsOpen] = useState(true);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "message",
      content: "You received a message from Alex",
      isRead: false,
    },
    {
      id: 2,
      type: "mention",
      content: "Sarah mentioned you in a post",
      isRead: false,
    },
    {
      id: 3,
      type: "community",
      content: "New post in 'Developers Hub'",
      isRead: true,
    },
    {
      id: 4,
      type: "general",
      content: "Your profile verification was approved",
      isRead: false,
    },
  ]);
  const [search, setSearch] = useState("");

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, isRead: true }))
    );
  };

  const getIcon = (type) => {
    switch (type) {
      case "message":
        return <FaComment className="text-blue-500" />;
      case "mention":
        return <FaUser className="text-green-500" />;
      case "community":
        return <FaBell className="text-yellow-500" />;
      default:
        return <FaCheckCircle className="text-gray-500" />;
    }
  };

  const filteredNotifications = notifications.filter((notif) =>
    notif.content.toLowerCase().includes(search.toLowerCase())
  );

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="flex transition-all duration-300 ease-in-out">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className={`flex-1 p-6 transition-colors ${
          isOpen ? "ml-64" : "ml-16"
        } ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
        }`}
      >
        <Header />
        <div className="mt-6 flex flex-col lg:flex-row gap-6">
          {/* Left Column: Notifications List */}
          <div className="w-full lg:w-2/3">
            <div
              className={`rounded-lg shadow-lg p-6 ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold">Notifications</h2>
                <button
                  onClick={markAllAsRead}
                  className="text-blue-600 hover:underline"
                >
                  Mark all as read
                </button>
              </div>
              {/* Search Bar */}
              <div className="relative mb-4">
                <FaSearch className="absolute left-3 top-3 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className={`w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>
              {/* Notifications List */}
              <div className="space-y-4 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-700">
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`flex items-center gap-3 p-4 rounded-lg transition-all duration-200 ease-in-out ${
                        notif.isRead
                          ? isDarkMode
                            ? "bg-gray-700"
                            : "bg-gray-100"
                          : isDarkMode
                          ? "bg-blue-900 hover:bg-blue-800"
                          : "bg-blue-50 hover:bg-blue-100"
                      }`}
                    >
                      {getIcon(notif.type)}
                      <p
                        className={`flex-1 ${
                          notif.isRead
                            ? isDarkMode
                              ? "text-gray-400"
                              : "text-gray-500"
                            : "font-bold text-black"
                        }`}
                      >
                        {notif.content}
                      </p>
                      {!notif.isRead && (
                        <button
                          onClick={() => markAsRead(notif.id)}
                          className="text-sm text-blue-600 hover:underline"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center">
                    No notifications found.
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* Right Column: Notification Summary */}
          <div className="w-full lg:w-1/3">
            <div
              className={`rounded-lg shadow-lg p-6 ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <h2 className="text-2xl font-bold mb-4">Notification Summary</h2>
              <p className="mb-2">
                You have{" "}
                <span className="font-bold text-blue-600">{unreadCount}</span>{" "}
                unread notification{unreadCount !== 1 && "s"}.
              </p>
              <p className="mb-4">
                Total notifications:{" "}
                <span className="font-bold">{notifications.length}</span>
              </p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full">
                Manage Notification Settings
              </button>
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">Recent Activity</h3>
                <ul className="list-disc pl-5 text-sm space-y-2">
                  <li
                    className={isDarkMode ? "text-gray-400" : "text-gray-600"}
                  >
                    Alex sent you a new message
                  </li>
                  <li
                    className={isDarkMode ? "text-gray-400" : "text-gray-600"}
                  >
                    Sarah mentioned you in a post
                  </li>
                  <li
                    className={isDarkMode ? "text-gray-400" : "text-gray-600"}
                  >
                    Profile verification approved
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
