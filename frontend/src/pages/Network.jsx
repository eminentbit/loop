// src/components/NetworkPage.jsx
import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { DarkModeContext } from "@/components/DarkModeContext";
import {
  FiMenu,
  FiUserPlus,
  FiUser,
  FiUsers,
  FiCalendar,
  FiFileText,
  FiMail,
} from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import { IoChatbubblesOutline } from "react-icons/io5";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const NetworkPage = ({ userRole }) => {
  const { isDarkMode } = useContext(DarkModeContext);

  // sidebar open/closed
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // which section is active
  const [activeSection, setActiveSection] = useState("network");

  // --- USERS ---
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [errorUsers, setErrorUsers] = useState(null);

  // --- PAGES ---
  const [pages, setPages] = useState([]);
  const [loadingPages, setLoadingPages] = useState(false);
  const [errorPages, setErrorPages] = useState(null);

  // --- EVENTS ---
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [errorEvents, setErrorEvents] = useState(null);

  // --- NEWSLETTER ---
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [submittingNewsletter, setSubmittingNewsletter] = useState(false);
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [newsletterError, setNewsletterError] = useState(null);

  // fetch users on mount
  useEffect(() => {
    fetch("http://localhost:8000/api/network/users/")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setUsers(data))
      .catch((err) => setErrorUsers(err))
      .finally(() => setLoadingUsers(false));
  }, []);

  // fetch pages when section active
  useEffect(() => {
    if (activeSection !== "pages") return;
    setLoadingPages(true);
    fetch("http://localhost:8000/api/network/pages/")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setPages(data))
      .catch((err) => setErrorPages(err))
      .finally(() => setLoadingPages(false));
  }, [activeSection]);

  // fetch events when section active
  useEffect(() => {
    if (activeSection !== "events") return;
    setLoadingEvents(true);
    fetch("http://localhost:8000/api/network/events/")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setEvents(data))
      .catch((err) => setErrorEvents(err))
      .finally(() => setLoadingEvents(false));
  }, [activeSection]);

  // follow/unfollow handler
  const toggleFollow = async (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, following: !u.following } : u
      )
    );
    try {
      await fetch("http://localhost:8000/api/network/follow-toggle/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: id }),
      });
    } catch {
      // rollback on error
      setUsers((prev) =>
        prev.map((u) =>
          u.id === id ? { ...u, following: !u.following } : u
        )
      );
    }
  };

  // newsletter subscribe handler
  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubmittingNewsletter(true);
    fetch("http://localhost:8000/api/network/subscribe/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: newsletterEmail }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setNewsletterSubmitted(true);
      })
      .catch((err) => setNewsletterError(err))
      .finally(() => setSubmittingNewsletter(false));
  };

  // left‐panel menu
  const menuItems = [
    { icon: FiUser, label: "Network", key: "network" },
    { icon: FiUsers, label: "Groups", key: "groups" },
    { icon: FiCalendar, label: "Events", key: "events" },
    { icon: FiFileText, label: "Pages", key: "pages" },
    { icon: FiMail, label: "Newsletter", key: "newsletter" },
  ];

  return (
    <div className="flex">
      <Sidebar
        userRole={userRole}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <div
        className={`
          flex-1 min-h-screen transition-all duration-300
          ${isSidebarOpen ? "ml-64" : "ml-16"}
          ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}
        `}
      >
        <Header userRole={userRole}>
          <button
            onClick={() => setIsSidebarOpen((o) => !o)}
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <FiMenu size={24} />
          </button>
        </Header>

        <div className="p-6">
          <h1 className="text-3xl font-extrabold mb-6">My Network</h1>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Panel */}
            <aside className="w-full md:w-1/4">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h2 className="text-xl font-bold mb-4">Manage my Network</h2>
                <ul className="space-y-2">
                  {menuItems.map(({ icon: Icon, label, key }) => (
                    <li
                      key={key}
                      onClick={() => setActiveSection(key)}
                      className={`
                        flex items-center gap-2 p-2 rounded cursor-pointer
                        ${
                          activeSection === key
                            ? "bg-blue-100 dark:bg-blue-900"
                            : "hover:bg-gray-100 dark:hover:bg-gray-700"
                        }
                      `}
                    >
                      <Icon size={20} />
                      <span>{label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Right Panel */}
            <main className="w-full md:w-3/4 space-y-6">
              {/* NETWORK */}
              {activeSection === "network" && (
                <section>
                  {loadingUsers && <p>Loading users…</p>}
                  {errorUsers && (
                    <p className="text-red-500">Failed to load users.</p>
                  )}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {users.map((u) => {
                      const name =
                        [u.first_name, u.last_name].filter(Boolean).join(" ") ||
                        u.username;
                      return (
                        <div
                          key={u.id}
                          className={`
                            p-4 rounded-lg shadow-md flex flex-col items-center
                            ${isDarkMode ? "bg-gray-800" : "bg-white"}
                          `}
                        >
                          <img
                            src={u.avatar}
                            alt={u.username}
                            className="w-20 h-20 rounded-full border-2 border-gray-300 object-cover"
                          />
                          <h2 className="mt-3 text-lg font-bold flex items-center gap-1">
                            {name}
                            {u.verified && (
                              <FaCheckCircle className="text-blue-500" />
                            )}
                          </h2>
                          <p className="text-gray-500 text-sm">@{u.username}</p>
                          <div className="mt-4 w-full space-y-2">
                            <button
                              onClick={() => toggleFollow(u.id)}
                              className={`
                                w-full flex items-center justify-center gap-2 py-2 rounded
                                text-white transition
                                ${
                                  u.following
                                    ? "bg-red-600 hover:bg-red-700"
                                    : "bg-blue-600 hover:bg-blue-700"
                                }
                              `}
                            >
                              <FiUserPlus size={18} />
                              {u.following ? "Unfollow" : "Follow"}
                            </button>
                            <button className="w-full flex items-center justify-center gap-2 py-2 rounded bg-gray-200 hover:bg-gray-300 transition">
                              <IoChatbubblesOutline size={18} />
                              Message
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* GROUPS */}
              {activeSection === "groups" && (
                <section className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <h2 className="text-2xl font-bold mb-4">Groups</h2>
                  <p>🚧 Groups are coming soon!</p>
                </section>
              )}

              {/* EVENTS */}
              {activeSection === "events" && (
                <section className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <h2 className="text-2xl font-bold mb-4">Events</h2>
                  {loadingEvents && <p>Loading events…</p>}
                  {errorEvents && (
                    <p className="text-red-500">Failed to load events.</p>
                  )}
                  <ul className="space-y-4">
                    {events.map((ev) => (
                      <li
                        key={ev.id}
                        className="flex justify-between items-start border-b pb-4"
                      >
                        <div>
                          <h3 className="text-xl font-semibold">{ev.title}</h3>
                          <p className="text-gray-500 text-sm">
                            {new Date(ev.start_time).toLocaleString()} –{" "}
                            {new Date(ev.end_time).toLocaleString()}
                          </p>
                          <p className="mt-2">{ev.description}</p>
                        </div>
                        <button className="self-start bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                          Join
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* PAGES */}
              {activeSection === "pages" && (
                <section className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <h2 className="text-2xl font-bold mb-4">Pages</h2>
                  {loadingPages && <p>Loading pages…</p>}
                  {errorPages && (
                    <p className="text-red-500">Failed to load pages.</p>
                  )}
                  <ul className="space-y-2">
                    {pages.map((pg) => (
                      <li key={pg.id} className="flex justify-between">
                        <span>{pg.title}</span>
                        <a
                          href={`/pages/${pg.slug}`}
                          className="text-blue-600 hover:underline"
                        >
                          View
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* NEWSLETTER */}
              {activeSection === "newsletter" && (
                <section className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow max-w-md">
                  <h2 className="text-2xl font-bold mb-4">
                    Subscribe to Newsletter
                  </h2>
                  {newsletterSubmitted ? (
                    <p>🎉 Thank you for subscribing!</p>
                  ) : (
                    <form onSubmit={handleSubscribe} className="space-y-4">
                      <div>
                        <label
                          htmlFor="newsletter_email"
                          className="block mb-1"
                        >
                          Email address
                        </label>
                        <input
                          id="newsletter_email"
                          type="email"
                          value={newsletterEmail}
                          onChange={(e) =>
                            setNewsletterEmail(e.target.value)
                          }
                          required
                          className="w-full border border-gray-300 rounded-lg p-2"
                        />
                      </div>
                      {newsletterError && (
                        <p className="text-red-500">Subscription failed.</p>
                      )}
                      <button
                        type="submit"
                        disabled={submittingNewsletter}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
                      >
                        {submittingNewsletter
                          ? "Subscribing…"
                          : "Subscribe"}
                      </button>
                    </form>
                  )}
                </section>
              )}
            </main>
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
