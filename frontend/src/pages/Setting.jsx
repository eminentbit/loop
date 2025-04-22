import { useContext, useState, useEffect } from "react";
import { DarkModeContext } from "../components/DarkModeContext";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import PropTypes from "prop-types";
import { Bell, Eye, Mail, Phone, MessageCircle, Settings as Cog } from "lucide-react";

function Settings({ userRole }) {
  const { darkMode } = useContext(DarkModeContext);

  // Sidebar control & role
  const [isOpen, setIsOpen] = useState(() => {
    const storedValue = localStorage.getItem("sidebarOpen");
    return storedValue ? JSON.parse(storedValue) : true;
  });

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(isOpen));
  }, [isOpen]);

  // Settings state
  const [notifyInvestorUpdates, setNotifyInvestorUpdates] = useState(true);
  const [investorVisibility, setInvestorVisibility] = useState("public");
  const [contactMethod, setContactMethod] = useState("email");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 1200);
  };

  // Display values for summary
  const visibilityLabel = {
    public: "Public",
    private: "Private",
    connections: "Connections Only",
  }[investorVisibility];

  const contactIcons = {
    email: <Mail size={16} />,
    phone: <Phone size={16} />,
    "in-app": <MessageCircle size={16} />,
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-950 text-gray-100" : "bg-gray-100 text-gray-900"
      } min-h-screen transition-colors duration-300`}
    >
      <div className="flex">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} userRole={userRole} />
        <main
          className={`flex-1 p-4 md:p-8 transition-all duration-300 ${
            !isOpen ? "ml-16" : "ml-64"
          }`}
        >
          <Header userRole={userRole} />
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-6 mt-2">
            <Cog size={28} className="text-blue-600 dark:text-blue-400" />
            <h1 className="text-3xl font-bold tracking-tight">Investor Settings</h1>
          </div>
          {/* Settings summary bar */}
          <div
            className={`rounded-xl px-4 py-3 mb-6 flex flex-wrap items-center gap-6 shadow-sm border ${
              darkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
            aria-label="Current settings summary"
          >
            <span className="flex items-center gap-2 text-sm">
              <Bell size={16} className="text-blue-500" />
              Notifications:{" "}
              <span className={`font-semibold ${notifyInvestorUpdates ? "text-green-600 dark:text-green-400" : "text-gray-500"}`}>
                {notifyInvestorUpdates ? "Enabled" : "Disabled"}
              </span>
            </span>
            <span className="flex items-center gap-2 text-sm">
              <Eye size={16} className="text-blue-500" />
              Visibility: <span className="font-semibold">{visibilityLabel}</span>
            </span>
            <span className="flex items-center gap-2 text-sm">
              {contactIcons[contactMethod]}
              Contact: <span className="font-semibold capitalize">{contactMethod.replace("-", " ")}</span>
            </span>
          </div>

          <form
            onSubmit={handleSave}
            className={`relative bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 max-w-2xl mx-auto space-y-8 animate-fadeIn`}
            aria-label="Settings form"
          >
            {/* Notification Toggle */}
            <div className="flex justify-between items-center">
              <label htmlFor="notify-toggle" className="text-lg font-medium flex items-center gap-2">
                <Bell className="text-blue-500" size={20} /> Notify about investor updates
              </label>
              <button
                type="button"
                aria-pressed={notifyInvestorUpdates}
                aria-label={notifyInvestorUpdates ? "Disable notifications" : "Enable notifications"}
                onClick={() => setNotifyInvestorUpdates((v) => !v)}
                className={`w-12 h-7 inline-flex items-center rounded-full transition bg-gray-300 dark:bg-gray-700 duration-200 focus:outline-none border-2 border-transparent focus:ring-2 focus:ring-blue-400
                  ${notifyInvestorUpdates ? "bg-blue-600 dark:bg-blue-500" : ""}
                `}
              >
                <span
                  className={`inline-block w-6 h-6 rounded-full bg-white dark:bg-gray-300 shadow transform transition duration-200 ${
                    notifyInvestorUpdates ? "translate-x-5" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Visibility Option */}
            <div>
              <label htmlFor="visibility" className="text-lg font-medium mb-2 flex items-center gap-2">
                <Eye className="text-blue-500" size={20} /> Investor profile visibility
              </label>
              <select
                id="visibility"
                value={investorVisibility}
                onChange={(e) => setInvestorVisibility(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="connections">Connections Only</option>
              </select>
            </div>

            {/* Contact Method */}
            <div>
              <span className="text-lg font-medium mb-2 flex items-center gap-2">
                <Mail className="text-blue-500" size={20} /> Preferred contact method
              </span>
              <div className="flex flex-col md:flex-row gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="email"
                    checked={contactMethod === "email"}
                    onChange={() => setContactMethod("email")}
                    className="accent-blue-600"
                  />
                  <Mail size={16} /> Email
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="phone"
                    checked={contactMethod === "phone"}
                    onChange={() => setContactMethod("phone")}
                    className="accent-blue-600"
                  />
                  <Phone size={16} /> Phone
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="in-app"
                    checked={contactMethod === "in-app"}
                    onChange={() => setContactMethod("in-app")}
                    className="accent-blue-600"
                  />
                  <MessageCircle size={16} /> In-App Messages
                </label>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex items-center justify-end pt-2">
              <button
                type="submit"
                disabled={saving}
                className={`flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white px-6 py-2 rounded-lg font-medium shadow focus:outline-none focus:ring-2 focus:ring-blue-400
                  ${saving ? "opacity-60 cursor-not-allowed" : ""}
                `}
              >
                {saving ? (
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                    <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                ) : (
                  <Cog size={18} />
                )}
                {saving
                  ? "Saving..."
                  : saved
                  ? "Settings Saved!"
                  : "Save Settings"}
              </button>
            </div>
          </form>
          <style>
            {`
              .animate-fadeIn { animation: fadeIn 0.6s;}
              @keyframes fadeIn { from { opacity: 0; transform: translateY(30px);} to { opacity: 1; transform: translateY(0);} }
            `}
          </style>
        </main>
      </div>
    </div>
  );
}

Settings.propTypes = {
  userRole: PropTypes.string.isRequired,
};

export default Settings;