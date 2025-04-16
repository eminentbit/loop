import { useContext, useState, useEffect } from "react";
import { DarkModeContext } from "../components/DarkModeContext";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import PropTypes from "prop-types";
import teamMembers from "../data/teamMembers";
import messages from "../data/messages";

function TeamCollaboration({ userRole }) {
  const { darkMode } = useContext(DarkModeContext);

  // Sidebar control & role
  const [isOpen, setIsOpen] = useState(() => {
    const storedValue = localStorage.getItem("sidebarOpen");
    return storedValue ? JSON.parse(storedValue) : true;
  });

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(isOpen));
  }, [isOpen]);

  return (
    <div
      className={`${
        darkMode
          ? "bg-gray-900 min-w-full text-white"
          : "bg-gray-100 text-gray-900"
      } min-h-screen`}
    >
      <div className="flex">
        {/* Sidebar now receives parameters */}
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} userRole={userRole} />
        <main
          className={`flex-1 max-w-[100vh] p-8 ${isOpen ? "ml-64" : "ml-16"}`}
        >
          <Header />
          <h1 className="text-3xl font-bold mb-6">Team Collaboration</h1>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Team Members Panel */}
            <div className="w-full lg:w-1/3 bg-white dark:bg-gray-800 shadow rounded p-6">
              <div className="mb-4">
                <h2 className="text-2xl font-semibold">Team Members</h2>
                <input
                  type="text"
                  placeholder="Search team members..."
                  className="mt-2 w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <ul>
                {teamMembers.map((member) => (
                  <li
                    key={member.id}
                    className="mb-4 flex items-center border-b border-gray-200 dark:border-gray-700 pb-2"
                  >
                    {/* Placeholder Profile Icon */}
                    <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex-shrink-0"></div>
                    <div className="ml-3">
                      <p className="font-semibold">{member.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {member.position}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {/* Chat/Collaboration Panel */}
            <div className="w-full lg:w-2/3 bg-white dark:bg-gray-800 shadow rounded flex flex-col">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-semibold">Project Chat</h2>
              </div>
              <div className="p-6 flex-1 overflow-y-auto">
                {messages.map((msg) => (
                  <div key={msg.id} className="mb-4">
                    <div className="flex items-center mb-1">
                      {/* Sender Icon */}
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex-shrink-0"></div>
                      <p className="ml-2 font-semibold">{msg.sender}</p>
                    </div>
                    <p className="text-sm">{msg.content}</p>
                  </div>
                ))}
              </div>
              <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                <form className="flex">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 p-2 border border-gray-300 dark:border-gray-700 rounded-l-md focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

TeamCollaboration.propTypes = {
  userRole: PropTypes.string.isRequired,
};

export default TeamCollaboration;
