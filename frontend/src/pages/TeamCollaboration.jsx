import { useContext, useState, useEffect, useRef } from "react";
import { DarkModeContext } from "../context/DarkModeContext";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import PropTypes from "prop-types";
import teamMembers from "../data/teamMembers";
import messages from "../data/messages";
import { SendHorizonal, Users, MessageSquare } from "lucide-react";

function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0]?.toUpperCase())
    .join("")
    .slice(0, 2);
}

function TeamCollaboration({ userRole }) {
  const { darkMode } = useContext(DarkModeContext);

  const [isOpen, setIsOpen] = useState(() => {
    const storedValue = localStorage.getItem("sidebarOpen");
    return storedValue ? JSON.parse(storedValue) : true;
  });

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(isOpen));
  }, [isOpen]);

  const [search, setSearch] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState(messages);

  const chatEndRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom on new message
    if (chatEndRef.current)
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const filteredMembers = search
    ? teamMembers.filter((m) =>
        m.name.toLowerCase().includes(search.toLowerCase())
      )
    : teamMembers;

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (chatInput.trim()) {
      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "You",
          content: chatInput,
          self: true,
        },
      ]);
      setChatInput("");
    }
  };

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-gray-100"
          : "bg-gradient-to-br from-blue-50 via-gray-100 to-white text-gray-900"
      }`}
    >
      <div className="flex">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} userRole={userRole} />
        <main
          className={`flex-1 p-4 md:p-8 transition-all duration-300 ${
            isOpen ? "ml-64" : "ml-16"
          }`}
        >
          <Header />
          <div className="flex items-center gap-3 mb-8">
            <Users className="text-blue-600 dark:text-blue-400" size={32} />
            <h1 className="text-3xl font-extrabold tracking-tight">
              Team Collaboration
            </h1>
          </div>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Team Members Panel */}
            <section
              className={`w-full lg:w-1/3 
                bg-white/80 dark:bg-gray-900/80 
                backdrop-blur-sm 
                shadow-xl border border-gray-200 dark:border-gray-800
                rounded-2xl relative p-6
                transition-all duration-300
                `}
              aria-label="Team members"
            >
              <div className="flex items-center gap-2 mb-4">
                <Users className="text-blue-500" size={22} />
                <h2 className="text-xl font-semibold tracking-tight">
                  Team Members
                </h2>
              </div>
              <input
                type="text"
                placeholder="Search team members..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`mt-2 w-full p-2 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-blue-500
                  ${
                    darkMode
                      ? "bg-gray-800 border-gray-700 placeholder-gray-500 text-white"
                      : "bg-gray-50 border-gray-300 placeholder-gray-400"
                  }
                `}
              />
              <ul className="mt-4 max-h-[50vh] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-blue-400">
                {filteredMembers.length > 0 ? (
                  filteredMembers.map((member) => (
                    <li
                      key={member.id}
                      className="mb-4 flex items-center border-b border-gray-200 dark:border-gray-800 pb-3 last:border-0 last:mb-0"
                    >
                      {/* Avatar with initials */}
                      <div
                        className={`w-12 h-12 flex items-center justify-center rounded-full font-bold text-lg mr-3
                          transition-all duration-200 shadow
                          ${
                            darkMode
                              ? "bg-gradient-to-tr from-blue-900 via-gray-700 to-gray-800 text-blue-200"
                              : "bg-gradient-to-tr from-blue-400 via-blue-200 to-white text-blue-900"
                          }
                        `}
                      >
                        {getInitials(member.name)}
                      </div>
                      <div>
                        <p className="font-semibold">{member.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {member.position}
                        </p>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="text-center text-gray-400 italic mt-8">
                    No team members found.
                  </li>
                )}
              </ul>
            </section>
            {/* Chat/Collaboration Panel */}
            <section
              className={`w-full lg:w-2/3 flex flex-col 
                bg-white/80 dark:bg-gray-900/85 
                backdrop-blur-sm
                shadow-2xl border border-gray-200 dark:border-gray-800
                rounded-2xl relative
                transition-all duration-300
                `}
              aria-label="Project chat"
            >
              <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-200 dark:border-gray-800">
                <MessageSquare className="text-blue-500" size={22} />
                <h2 className="text-xl font-semibold tracking-tight">
                  Project Chat
                </h2>
              </div>
              <div className="flex-1 p-6 overflow-y-auto bg-transparent">
                <div className="flex flex-col gap-5">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex items-end gap-2 ${
                        msg.self ? "justify-end" : "justify-start"
                      }`}
                    >
                      {!msg.self && (
                        <div
                          className={`w-8 h-8 flex items-center justify-center rounded-full font-semibold text-sm shadow
                            ${
                              darkMode
                                ? "bg-blue-900 text-blue-200"
                                : "bg-blue-100 text-blue-700"
                            }
                          `}
                        >
                          {getInitials(msg.sender)}
                        </div>
                      )}
                      <div
                        className={`
                          max-w-xs px-4 py-2 rounded-2xl shadow 
                          text-sm font-medium
                          ${
                            msg.self
                              ? darkMode
                                ? "bg-blue-700 text-white"
                                : "bg-blue-500 text-white"
                              : darkMode
                              ? "bg-gray-800 text-gray-100"
                              : "bg-gray-100 text-gray-900"
                          }
                          transition-all duration-300
                        `}
                      >
                        <span className="block">{msg.content}</span>
                      </div>
                      {msg.self && (
                        <div
                          className={`w-8 h-8 flex items-center justify-center rounded-full font-semibold text-sm shadow
                            ${
                              darkMode
                                ? "bg-blue-900 text-blue-200"
                                : "bg-blue-100 text-blue-700"
                            }
                          `}
                        >
                          You
                        </div>
                      )}
                    </div>
                  ))}
                  {/* For scroll-to-bottom */}
                  <div ref={chatEndRef} />
                </div>
              </div>
              <form
                className="flex px-6 py-4 border-t border-gray-200 dark:border-gray-800 bg-transparent"
                onSubmit={handleChatSubmit}
                autoComplete="off"
                aria-label="Send a message"
              >
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className={`flex-1 p-3 rounded-l-lg border-t border-b border-l transition-all duration-200 focus:ring-2 focus:ring-blue-500
                    ${
                      darkMode
                        ? "bg-gray-800 border-gray-700 placeholder-gray-500 text-white"
                        : "bg-white border-gray-300 placeholder-gray-400"
                    }
                  `}
                  aria-label="Message"
                />
                <button
                  type="submit"
                  className={`flex items-center gap-2 border-t border-b border-r rounded-r-lg px-5 py-3 font-bold transition-all
                    ${
                      darkMode
                        ? "bg-blue-700 hover:bg-blue-600 border-blue-700 text-white"
                        : "bg-blue-600 hover:bg-blue-700 border-blue-600 text-white"
                    }
                  `}
                  aria-label="Send message"
                >
                  <SendHorizonal size={20} />
                  Send
                </button>
              </form>
            </section>
          </div>
          {/* Animations */}
          <style>
            {`
              .scrollbar-thin::-webkit-scrollbar {
                width: 6px;
                background: transparent;
              }
              .scrollbar-thin::-webkit-scrollbar-thumb {
                background: #60a5fa;
                border-radius: 4px;
              }
              .scrollbar-thin {
                scrollbar-width: thin;
                scrollbar-color: #60a5fa transparent;
              }
            `}
          </style>
        </main>
      </div>
    </div>
  );
}

TeamCollaboration.propTypes = {
  userRole: PropTypes.string.isRequired,
};

export default TeamCollaboration;
