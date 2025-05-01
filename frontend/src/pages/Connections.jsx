import { useState } from "react";
const peopleMayKnow = [
  {
    name: "Sarah Wilson",
    role: "Product Manager at TechCorp",
    mutual: "12 mutual connections",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Michael Chen",
    role: "Software Engineer at InnovateLabs",
    mutual: "8 mutual connections",
    img: "https://randomuser.me/api/portraits/men/54.jpg",
  },
  {
    name: "Emily Rodriguez",
    role: "UX Designer at DesignHub",
    mutual: "15 mutual connections",
    img: "https://randomuser.me/api/portraits/women/67.jpg",
  },
  {
    name: "David Kim",
    role: "Marketing Director at GrowthCo",
    mutual: "6 mutual connections",
    img: "https://randomuser.me/api/portraits/men/61.jpg",
  },
];

const connections = [
  {
    name: "Alex Thompson",
    role: "Senior Developer",
    company: "TechFlow",
    location: "San Francisco, CA",
    since: "Mar 15, 2024",
    last: "2 days ago",
    img: "https://randomuser.me/api/portraits/men/33.jpg",
  },
  {
    name: "Rachel Martinez",
    role: "Product Designer",
    company: "DesignCraft",
    location: "New York, NY",
    since: "Feb 28, 2024",
    last: "1 week ago",
    img: "https://randomuser.me/api/portraits/women/26.jpg",
  },
  {
    name: "James Wilson",
    role: "Marketing Manager",
    company: "GrowthHub",
    location: "Chicago, IL",
    since: "Jan 12, 2024",
    last: "3 days ago",
    img: "https://randomuser.me/api/portraits/men/45.jpg",
  },
];

const activities = [
  {
    icon: "✔️",
    title: "New Connection",
    desc: "Sarah Wilson accepted your connection request",
    meta: "2 hours ago",
  },
  {
    icon: "⚡",
    title: "Job Update",
    desc: "Michael Chen started a new position at InnovateLabs",
    meta: "1 day ago",
  },
  {
    icon: "⭐",
    title: "Achievement",
    desc: "Emily Rodriguez earned a new certification",
    meta: "2 days ago",
  },
];

export default function App() {
  const [showRequestCard, setShowRequestCard] = useState(false);
  const [connected, setConnected] = useState({});

  const handleConnectClick = (name) => {
    setConnected(prev => ({ ...prev, [name]: true }));
  };

  const handleSendRequestClick = () => {
    setShowRequestCard(true);
  };

  const handleCloseRequestCard = () => {
    setShowRequestCard(false);
  };

  const handleSearch = (e) => {
    // Implement your search logic here
    console.log("Searching for:", e.target.value);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 flex items-center h-16 px-7 md:px-4 gap-8 sticky top-0 z-20">
        <nav className="hidden md:flex gap-5 text-base font-medium">
          <img src="./assets/logo-loop.jpg" alt="Logo" className="w-13 h-8" />
          <a className="hover:bg-blue-400  bg-blue-50 px-2 py-1 rounded" href="/network">Network</a>
          <a className="hover:bg-blue-400 bg-blue-50 px-2 py-1 rounded" href="/jobs">Jobs</a>
          
        </nav>
        <div className="flex-1 flex items-center">
          <input
            type="search"
            className="w-full bg-slate-100 border border-slate-200 rounded-md py-2 px-4 text-sm"
            placeholder="Search by name, company, skills, or location"
            onChange={handleSearch}
          />
        </div>
        <div className="flex items-center gap-4 ml-4">
          <img
            src="https://img.icons8.com/ios-glyphs/30/000000/bell.png"
            alt="Notifications"
            className="w-6 h-6"
          />
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            className="w-8 h-8 rounded-full"
            alt="User"
          />
        </div>
      </header>
      {/* Main content layout */}
      <div className="flex max-w-7xl mx-auto min-h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <aside className="w-64 min-w-[220px] bg-white border-r border-slate-200 p-8 pt-10 flex flex-col gap-8 hidden lg:flex">
          <div>
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
              <div className="text-3xl font-bold mb-1">534</div>
              <div className="mb-2 text-slate-700">Total Connections</div>
              <div className="text-green-600 font-semibold text-lg">
                +12 <span className="text-slate-500 text-base font-normal">This Month</span>
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-3 font-medium text-blue-700">
              <button
                className="text-left bg-blue-50 py-2 px-3 rounded hover:bg-blue-100"
                onClick={handleSendRequestClick}
              >
                Send New Connection Request
              </button>
              {showRequestCard && (
                <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-6 w-96">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-lg font-semibold">Send Connection Request</h4>
                      <button
                        onClick={handleCloseRequestCard}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <span className="text-2xl">&times;</span>
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Search by name or email"
                      className="w-full border border-gray-300 rounded-md py-2 px-3 mb-4"
                    />
                    <textarea
                      placeholder="Add a note (optional)"
                      className="w-full border border-gray-300 rounded-md py-2 px-3 mb-4"
                      rows="3"
                    ></textarea>
                    <div className="flex justify-end">
                      <button
                        onClick={handleCloseRequestCard}
                        className="bg-gray-200 text-gray-700 rounded-md py-2 px-4 mr-2"
                      >
                        Cancel
                      </button>
                      <button className="bg-blue-500 text-white rounded-md py-2 px-4">
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <button
              
                className="text-slate-500 hover:bg-blue-50 py-1.5 px-3 rounded text-left"
                onClick={() => setShowRequestCard(true)}
              >
                View Pending Requests (8)
              </button>
              {showRequestCard && (
                <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-6 w-96">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-lg font-semibold">Pending Requests</h4>
                      <button
                        onClick={handleCloseRequestCard}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <span className="text-2xl">&times;</span>
                      </button>
                    </div>
                    <div className="mb-4">
                      <ul>
                        {[
                          {
                            name: "John Doe",
                            role: "Software Engineer",
                            company: "Tech Solutions Inc.",
                            img: "https://randomuser.me/api/portraits/men/1.jpg",
                          },
                          {
                            name: "Jane Smith",
                            role: "Product Manager",
                            company: "Innovate Co.",
                            img: "https://randomuser.me/api/portraits/women/2.jpg",
                          },
                        ].map((request, index) => (
                          <li
                            key={index}
                            className="flex items-center justify-between py-2 border-b border-gray-100 last:border-none"
                          >
                            <div className="flex items-center">
                              <img src={request.img} alt={request.name} className="w-10 h-10 rounded-full mr-3" />
                              <div>
                                <p className="font-medium">{request.name}</p>
                                <p className="text-sm text-gray-500">{request.role} at {request.company}</p>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={handleCloseRequestCard}
                        className="bg-gray-200 text-gray-700 rounded-md py-2 px-4 mr-2"
                      >
                        Close
                      </button>
                      {/* Optional: Add action buttons for pending requests */}
                      {/* <button className="bg-blue-500 text-white rounded-md py-2 px-4">
                        Accept All
                      </button> */}
                    </div>
                  </div>
                </div>
              )}
              <button
                className="text-slate-500 hover:bg-blue-50 py-1.5 px-3 rounded text-left"
                onClick={() => setShowRequestCard(true)} // Reusing the same card for simplicity
              >
                Message Connections
              </button>
              {showRequestCard && (
                <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-6 w-96">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-lg font-semibold">Message Connections</h4>
                      <button
                        onClick={handleCloseRequestCard}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <span className="text-2xl">&times;</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </aside>
        {/* Main */}
        <main className="flex-1 flex flex-col gap-8 px-8 py-8 md:px-2 md:py-4 bg-slate-50">
          {/* People You May Know */}
          <section>
            <h3 className="font-semibold text-lg mb-2">People You May Know</h3>
            <div className="flex flex-wrap gap-4">
              {peopleMayKnow.map((person) => (
                <div
                  key={person.name}
                  className="relative bg-white rounded-xl border p-4 w-52 flex flex-col items-center gap-2 shadow-sm"
                >
                  <button className="absolute top-2 right-2 text-gray-400 text-lg hover:text-gray-700" title="Remove">
                    ×
                  </button>
                  <img
                    src={person.img}
                    alt={person.name}
                    className="w-12 h-12 rounded-full mb-1"
                  />
                  <span className="font-semibold">{person.name}</span>
                  <span className="text-sm text-slate-500 text-center">{person.role}</span>
                  <span className="text-xs text-slate-400">{person.mutual}</span>
                  {connected[person.name] ? (
                    <span className="mt-1 px-4 py-1 border border-gray-400 rounded text-gray-700 font-medium text-sm">
                      Connected
                    </span>
                  ) : (
                    <button onClick={() => handleConnectClick(person.name)} className="mt-1 px-4 py-1 border border-blue-600 rounded text-blue-700 font-medium text-sm hover:bg-blue-600 hover:text-white transition">
                      Connect
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>
          {/* Connections Table */}
          <section className="bg-white rounded-xl shadow-sm border p-4">
            <h3 className="font-semibold text-lg mb-3">Your Connections</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-500 font-medium">
                    <th className="py-2 px-2 text-left">Name</th>
                    <th className="py-2 px-2 text-left">Role &amp; Company</th>
                    <th className="py-2 px-2 text-left">Location</th>
                    <th className="py-2 px-2 text-left">Connected Since</th>
                    <th className="py-2 px-2 text-left">Last Interaction</th>
                    <th className="py-2 px-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {connections.map((c) => (
                    <tr key={c.name} className="border-b last:border-b-0 border-slate-100">
                      <td className="py-2 px-2 flex items-center gap-2">
                        <img src={c.img} className="w-9 h-9 rounded-full" alt={c.name} />
                        {c.name}
                      </td>
                      <td className="py-2 px-2">
                        <div>{c.role}</div>
                        <div className="text-slate-400 text-xs">{c.company}</div>
                      </td>
                      <td className="py-2 px-2">{c.location}</td>
                      <td className="py-2 px-2">{c.since}</td>
                      <td className="py-2 px-2">{c.last}</td>
                      <td className="py-2 px-2">
                        <div className="flex gap-2 items-center">
                          <button title="Message" className="text-slate-500 hover:text-blue-600 text-xl">✉️</button>
                          <button title="Remove" className="text-slate-400 hover:text-red-500 text-xl">🗑️</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          {/* Recent Activities */}
          <section className="bg-white rounded-xl shadow-sm border p-4">
            <h3 className="font-semibold text-lg mb-3">Recent Activities</h3>
            <ul className="flex flex-col gap-4">
              {activities.map((a, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-blue-600 text-xl mt-1">{a.icon}</span>
                  <div>
                    <div className="font-medium">{a.title}</div>
                    <div>{a.desc}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{a.meta}</div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
          {/* Bottom stats */}
          <section className="flex flex-wrap gap-6 mt-2">
            {/* Industry Distribution */}
            <div className="bg-white rounded-xl shadow-sm border p-4 flex-1 min-w-[200px]">
              <div className="font-medium text-slate-500 mb-2 flex items-center gap-1">
                <span role="img" aria-label="bar">📊</span> Industry Distribution
              </div>
              <div className="mb-2">
                <div className="flex justify-between text-xs">
                  <span>Technology</span>
                  <span>45%</span>
                </div>
                <div className="w-full bg-blue-100 rounded h-2 mt-0.5 mb-2">
                  <div className="bg-blue-600 h-2 rounded" style={{ width: "45%" }} />
                </div>
                <div className="flex justify-between text-xs">
                  <span>Design</span>
                  <span>30%</span>
                </div>
                <div className="w-full bg-blue-100 rounded h-2 mt-0.5 mb-2">
                  <div className="bg-sky-400 h-2 rounded" style={{ width: "30%" }} />
                </div>
                <div className="flex justify-between text-xs">
                  <span>Marketing</span>
                  <span>25%</span>
                </div>
                <div className="w-full bg-orange-100 rounded h-2 mt-0.5">
                  <div className="bg-orange-400 h-2 rounded" style={{ width: "25%" }} />
                </div>
              </div>
            </div>
            {/* Top Locations */}
            <div className="bg-white rounded-xl shadow-sm border p-4 flex-1 min-w-[200px]">
              <div className="font-medium text-slate-500 mb-2 flex items-center gap-1">
                <span role="img" aria-label="loc">📍</span> Top Locations
              </div>
              <div className="text-sm flex flex-col gap-1">
                <div className="flex justify-between">
                  <span>San Francisco, CA</span>
                  <span>156</span>
                </div>
                <div className="flex justify-between">
                  <span>New York, NY</span>
                  <span>98</span>
                </div>
                <div className="flex justify-between">
                  <span>London, UK</span>
                  <span>64</span>
                </div>
              </div>
            </div>
            {/* Network Growth */}
            <div className="bg-white rounded-xl shadow-sm border p-4 flex-1 min-w-[200px]">
              <div className="font-medium text-slate-500 mb-2 flex items-center gap-1">
                <span role="img" aria-label="growth">📈</span> Network Growth
              </div>
              <div className="text-blue-600 font-bold text-2xl mb-1">+23%</div>
              <div className="text-sm text-slate-400">Growth this quarter</div>
            </div>
          </section>
        </main>
      </div>
      {/* Responsive sidebar for mobile */}
      <div className="lg:hidden flex bg-white border-t border-slate-200 justify-around py-3 fixed bottom-0 left-0 right-0 z-30">
        <button className="font-medium text-blue-700">+ Connect</button>
        <button className="text-slate-500">Pending (8)</button>
        <button className="text-slate-500">Messages</button>
        <button className="text-slate-500">Privacy</button>
      </div>
    </div>
  );
}