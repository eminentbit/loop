import { useState, useEffect } from "react";
import axios from "axios";

// Mock API URL - Replace with your actual API base URL in production
const API_BASE_URL = "https://api.yournetworkapp.com";

const peopleMayKnow = [
  {
    id: 1,
    name: "Sarah Wilson",
    role: "Product Manager at TechCorp",
    mutual: "12 mutual connections",
    img: "/api/placeholder/150/150",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Software Engineer at InnovateLabs",
    mutual: "8 mutual connections",
    img: "/api/placeholder/150/150",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "UX Designer at DesignHub",
    mutual: "15 mutual connections",
    img: "/api/placeholder/150/150",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Marketing Director at GrowthCo",
    mutual: "6 mutual connections",
    img: "/api/placeholder/150/150",
  },
];

const connections = [
  {
    id: 1,
    name: "Alex Thompson",
    role: "Senior Developer",
    company: "TechFlow",
    location: "San Francisco, CA",
    since: "Mar 15, 2024",
    last: "2 days ago",
    img: "/api/placeholder/150/150",
  },
  {
    id: 2,
    name: "Rachel Martinez",
    role: "Product Designer",
    company: "DesignCraft",
    location: "New York, NY",
    since: "Feb 28, 2024",
    last: "1 week ago",
    img: "/api/placeholder/150/150",
  },
  {
    id: 3,
    name: "James Wilson",
    role: "Marketing Manager",
    company: "GrowthHub",
    location: "Chicago, IL",
    since: "Jan 12, 2024",
    last: "3 days ago",
    img: "/api/placeholder/150/150",
  },
];

const activities = [
  {
    id: 1,
    icon: "✔️",
    title: "New Connection",
    desc: "Sarah Wilson accepted your connection request",
    meta: "2 hours ago",
  },
  {
    id: 2,
    icon: "⚡",
    title: "Job Update",
    desc: "Michael Chen started a new position at InnovateLabs",
    meta: "1 day ago",
  },
  {
    id: 3,
    icon: "⭐",
    title: "Achievement",
    desc: "Emily Rodriguez earned a new certification",
    meta: "2 days ago",
  },
];

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [connected, setConnected] = useState({});
  const [connectionRequests, setConnectionRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch pending connection requests on component mount
  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const fetchPendingRequests = async () => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      // For now, simulate with dummy data
      const dummyRequests = [
        {
          id: 101,
          name: "John Doe",
          role: "Software Engineer",
          company: "Tech Solutions Inc.",
          img: "/api/placeholder/150/150",
        },
        {
          id: 102,
          name: "Jane Smith",
          role: "Product Manager",
          company: "Innovate Co.",
          img: "/api/placeholder/150/150",
        },
      ];

      // In real implementation, you would use axios like this:
      // const response = await axios.get(`${API_BASE_URL}/connection-requests`);
      // setConnectionRequests(response.data);

      setConnectionRequests(dummyRequests);
    } catch (err) {
      setError("Failed to load connection requests");
      console.error("Error fetching connection requests:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnectClick = async (personId, personName) => {
    setIsLoading(true);
    try {
      // Make API call to send connection request
      await axios.post(`${API_BASE_URL}/connections`, {
        recipientId: personId,
      });

      // Update UI immediately for better UX while request processes
      setConnected((prev) => ({ ...prev, [personName]: true }));
    } catch (err) {
      setError("Failed to send connection request");
      console.error("Error sending connection request:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendRequest = async (userId, message) => {
    setIsLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/connection-requests`, {
        recipientId: userId,
        message,
      });

      // Close modal after successful request
      setShowModal(false);
    } catch (err) {
      setError("Failed to send request");
      console.error("Error sending request:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptRequest = async (requestId) => {
    setIsLoading(true);
    try {
      await axios.put(
        `${API_BASE_URL}/connection-requests/${requestId}/accept`
      );

      // Update the requests list
      setConnectionRequests((prev) =>
        prev.filter((request) => request.id !== requestId)
      );
    } catch (err) {
      setError("Failed to accept request");
      console.error("Error accepting request:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeclineRequest = async (requestId) => {
    setIsLoading(true);
    try {
      await axios.put(
        `${API_BASE_URL}/connection-requests/${requestId}/decline`
      );

      // Update the requests list
      setConnectionRequests((prev) =>
        prev.filter((request) => request.id !== requestId)
      );
    } catch (err) {
      setError("Failed to decline request");
      console.error("Error declining request:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveConnection = async (connectionId) => {
    if (window.confirm("Are you sure you want to remove this connection?")) {
      setIsLoading(true);
      try {
        await axios.delete(`${API_BASE_URL}/connections/${connectionId}`);

        // You would typically refresh the connections list after this
        // This is simplified for the example
      } catch (err) {
        setError("Failed to remove connection");
        console.error("Error removing connection:", err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // eslint-disable-next-line no-unused-vars
  const handleMessageConnection = async (connectionId) => {
    // Navigate to messaging interface or open messaging modal
    setModalType("message");
    setShowModal(true);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // For a real implementation, you might want to debounce this and call an API
  };

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 flex items-center h-16 px-4 md:px-6 gap-4 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-6">
          <img src="/api/placeholder/120/40" alt="Logo" className="w-8 h-8" />
          <nav className="hidden md:flex gap-5 text-sm font-medium">
            <a
              className="bg-blue-100 text-blue-600 px-3 py-1.5 rounded hover:bg-blue-200 transition-colors"
              href="/network"
            >
              Network
            </a>
            <a
              className="text-slate-600 px-3 py-1.5 rounded hover:bg-slate-100 transition-colors"
              href="/jobs"
            >
              Jobs
            </a>
            <a
              className="text-slate-600 px-3 py-1.5 rounded hover:bg-slate-100 transition-colors"
              href="/messages"
            >
              Messages
            </a>
          </nav>
        </div>
        <div className="flex-1 max-w-xl mx-auto">
          <div className="relative">
            <input
              type="search"
              className="w-full bg-slate-100 border border-slate-200 rounded-full py-2 px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search by name, company, skills, or location"
              onChange={handleSearch}
              value={searchTerm}
            />
            <div className="absolute left-3 top-2.5 text-slate-400">🔍</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            className="relative text-slate-600 hover:text-blue-600"
            title="Notifications"
          >
            <span className="text-xl">🔔</span>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>
          <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
            <img
              src="/api/placeholder/150/150"
              className="w-8 h-8 rounded-full border-2 border-white"
              alt="User"
            />
          </div>
        </div>
      </header>

      {/* Main content layout */}
      <div className="flex max-w-7xl mx-auto min-h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-200 p-6 pt-8 flex flex-col gap-6 lg:block">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-4">
            <div className="text-3xl font-bold mb-1 text-blue-700">534</div>
            <div className="mb-2 text-slate-700 font-medium">
              Total Connections
            </div>
            <div className="text-green-600 font-semibold">
              +12{" "}
              <span className="text-slate-500 text-sm font-normal">
                This Month
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <h3 className="font-medium text-slate-500 text-sm mb-1">
              MANAGE NETWORK
            </h3>
            <button
              onClick={() => openModal("send")}
              className="flex items-center gap-2 text-left text-blue-600 bg-blue-50 py-2 px-3 rounded font-medium hover:bg-blue-100 transition-colors"
            >
              <span>+</span> Send Connection Request
            </button>
            <button
              onClick={() => openModal("pending")}
              className="flex items-center gap-2 text-left text-slate-600 hover:bg-slate-50 py-2 px-3 rounded transition-colors"
            >
              <span>👥</span> View Pending Requests
              <span className="ml-auto bg-blue-100 text-blue-700 text-xs rounded-full px-2 py-0.5">
                {connectionRequests.length || 8}
              </span>
            </button>
            <button
              onClick={() => openModal("message")}
              className="flex items-center gap-2 text-left text-slate-600 hover:bg-slate-50 py-2 px-3 rounded transition-colors"
            >
              <span>✉️</span> Message Connections
            </button>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <h3 className="font-medium text-slate-500 text-sm mb-1">
              INSIGHTS
            </h3>
            <button className="flex items-center gap-2 text-left text-slate-600 hover:bg-slate-50 py-2 px-3 rounded transition-colors">
              <span>📊</span> Network Analytics
            </button>
            <button className="flex items-center gap-2 text-left text-slate-600 hover:bg-slate-50 py-2 px-3 rounded transition-colors">
              <span>🔄</span> Connection Activity
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 flex flex-col gap-6 px-6 py-8 md:px-4 md:py-6 bg-slate-50">
          {/* Error message if any */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg mb-4 flex justify-between items-center">
              <span>{error}</span>
              <button
                onClick={() => setError(null)}
                className="text-red-400 hover:text-red-600"
              >
                ×
              </button>
            </div>
          )}

          {/* People You May Know */}
          <section>
            <h3 className="font-semibold text-lg mb-4 text-slate-800">
              People You May Know
            </h3>
            <div className="flex flex-wrap gap-4">
              {peopleMayKnow.map((person) => (
                <div
                  key={person.id}
                  className="bg-white rounded-xl border border-slate-200 p-4 w-56 flex flex-col items-center text-center gap-2 shadow-sm hover:shadow-md transition-shadow"
                >
                  <button
                    className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 text-lg"
                    title="Remove suggestion"
                  >
                    ×
                  </button>
                  <img
                    src={person.img}
                    alt={person.name}
                    className="w-16 h-16 rounded-full mb-2 border-2 border-slate-100"
                  />
                  <span className="font-semibold text-slate-800">
                    {person.name}
                  </span>
                  <span className="text-sm text-slate-500 leading-tight">
                    {person.role}
                  </span>
                  <span className="text-xs text-slate-400">
                    {person.mutual}
                  </span>
                  {connected[person.name] ? (
                    <span className="mt-2 px-4 py-1.5 border border-slate-300 rounded-full text-slate-600 font-medium text-sm">
                      Connected
                    </span>
                  ) : (
                    <button
                      onClick={() => handleConnectClick(person.id, person.name)}
                      disabled={isLoading}
                      className="mt-2 px-4 py-1.5 border border-blue-600 rounded-full text-blue-600 font-medium text-sm hover:bg-blue-600 hover:text-white transition-colors"
                    >
                      Connect
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Connections Table */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-100">
              <h3 className="font-semibold text-lg text-slate-800">
                Your Connections
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-100">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="py-3 px-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Role & Company
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Connected Since
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Last Interaction
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100">
                  {connections.map((c) => (
                    <tr key={c.id} className="hover:bg-blue-50">
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              src={c.img}
                              className="h-10 w-10 rounded-full"
                              alt={c.name}
                            />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-slate-900">
                              {c.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="text-sm text-slate-900">{c.role}</div>
                        <div className="text-sm text-slate-500">
                          {c.company}
                        </div>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-sm text-slate-700">
                        {c.location}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-sm text-slate-700">
                        {c.since}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-sm text-slate-700">
                        {c.last}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleMessageConnection(c.id)}
                            className="text-blue-600 hover:text-blue-800"
                            title="Message"
                          >
                            ✉️
                          </button>
                          <button
                            onClick={() => handleRemoveConnection(c.id)}
                            className="text-slate-500 hover:text-red-600"
                            title="Remove connection"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Recent Activities */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <h3 className="font-semibold text-lg mb-4 text-slate-800">
              Recent Activities
            </h3>
            <ul className="divide-y divide-slate-100">
              {activities.map((activity) => (
                <li key={activity.id} className="flex items-start gap-4 py-3">
                  <div className="flex-shrink-0 bg-blue-100 text-blue-600 rounded-full p-2 flex items-center justify-center w-9 h-9">
                    {activity.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800">
                      {activity.title}
                    </h4>
                    <p className="text-slate-600">{activity.desc}</p>
                    <span className="text-xs text-slate-400 mt-1 block">
                      {activity.meta}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Bottom stats */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            {/* Industry Distribution */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <div className="font-medium text-slate-500 mb-3 flex items-center gap-2">
                <span>📊</span> Industry Distribution
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-slate-700">
                      Technology
                    </span>
                    <span className="text-slate-600">45%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: "45%" }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-slate-700">Design</span>
                    <span className="text-slate-600">30%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                      className="bg-sky-500 h-2 rounded-full"
                      style={{ width: "30%" }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-slate-700">
                      Marketing
                    </span>
                    <span className="text-slate-600">25%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full"
                      style={{ width: "25%" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Top Locations */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <div className="font-medium text-slate-500 mb-3 flex items-center gap-2">
                <span>📍</span> Top Locations
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-700">San Francisco, CA</span>
                  <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-0.5 rounded-full">
                    156
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-700">New York, NY</span>
                  <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-0.5 rounded-full">
                    98
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-700">London, UK</span>
                  <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-0.5 rounded-full">
                    64
                  </span>
                </div>
              </div>
            </div>

            {/* Network Growth */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <div className="font-medium text-slate-500 mb-3 flex items-center gap-2">
                <span>📈</span> Network Growth
              </div>
              <div className="text-blue-600 font-bold text-2xl mb-1">+23%</div>
              <div className="text-sm text-slate-500">Growth this quarter</div>
              <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
                <div className="flex justify-between mb-1">
                  <span>Last quarter:</span>
                  <span>+15%</span>
                </div>
                <div className="flex justify-between">
                  <span>Year to date:</span>
                  <span>+47%</span>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Mobile navigation */}
      <div className="lg:hidden flex bg-white border-t border-slate-200 justify-around py-3 fixed bottom-0 left-0 right-0 z-30 shadow-lg">
        <button className="flex flex-col items-center text-blue-600">
          <span className="text-lg">👥</span>
          <span className="text-xs">Network</span>
        </button>
        <button className="flex flex-col items-center text-slate-500">
          <span className="text-lg">💼</span>
          <span className="text-xs">Jobs</span>
        </button>
        <button className="flex flex-col items-center text-slate-500">
          <span className="text-lg">✉️</span>
          <span className="text-xs">Messages</span>
        </button>
        <button className="flex flex-col items-center text-slate-500">
          <span className="text-lg">⚙️</span>
          <span className="text-xs">Settings</span>
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4 border-b border-slate-200 pb-3">
              <h4 className="text-lg font-semibold text-slate-800">
                {modalType === "send" && "Send Connection Request"}
                {modalType === "pending" && "Pending Requests"}
                {modalType === "message" && "Message Connections"}
              </h4>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>

            {modalType === "send" && (
              <div>
                <input
                  type="text"
                  placeholder="Search by name or email"
                  className="w-full border border-slate-300 rounded-lg py-2 px-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <textarea
                  placeholder="Add a personalized note (recommended)"
                  className="w-full border border-slate-300 rounded-lg py-2 px-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                ></textarea>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() =>
                      handleSendRequest(1, "Hello, I'd like to connect")
                    }
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Send Request"}
                  </button>
                </div>
              </div>
            )}

            {modalType === "pending" && (
              <div>
                {connectionRequests.length > 0 ? (
                  <ul className="divide-y divide-slate-100">
                    {connectionRequests.map((request) => (
                      <li
                        key={request.id}
                        className="py-3 flex justify-between items-center"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={request.img}
                            alt={request.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <p className="font-medium text-slate-800">
                              {request.name}
                            </p>
                            <p className="text-sm text-slate-500">
                              {request.role} at {request.company}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAcceptRequest(request.id)}
                            className="text-xs px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleDeclineRequest(request.id)}
                            className="text-xs px-3 py-1 border border-slate-300 text-slate-600 rounded-md hover:bg-slate-50"
                          >
                            Decline
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-6 text-slate-500">
                    No pending requests at this time
                  </div>
                )}
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {modalType === "message" && (
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Select Connection
                  </label>
                  <select className="w-full border border-slate-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    {connections.map((connection) => (
                      <option key={connection.id} value={connection.id}>
                        {connection.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Message
                  </label>
                  <textarea
                    placeholder="Type your message here..."
                    className="w-full border border-slate-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows="4"
                  ></textarea>
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Send Message
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
