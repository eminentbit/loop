import { useContext, useState, useEffect } from "react";
import { DarkModeContext } from "../components/DarkModeContext";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import PropTypes from "prop-types";

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

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Settings saved:", {
      notifyInvestorUpdates,
      investorVisibility,
      contactMethod,
    });
    alert("Settings saved successfully!");
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      } min-h-screen`}
    >
      <div className="flex">
        {/* Sidebar now receives parameters */}
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} userRole={userRole} />
        <main className={`flex-1 p-8 ${!isOpen ? "ml-16" : "ml-64"}`}>
          <Header userRole={userRole} />
          <h1 className="text-3xl font-bold mb-6">Investor Settings</h1>

          <form
            onSubmit={handleSave}
            className="bg-white dark:bg-gray-800 p-6 rounded shadow-md space-y-6 max-w-2xl"
          >
            {/* Notification Toggle */}
            <div className="flex justify-between items-center">
              <label className="text-lg font-medium">
                Notify about investor updates
              </label>
              <input
                type="checkbox"
                checked={notifyInvestorUpdates}
                onChange={() =>
                  setNotifyInvestorUpdates(!notifyInvestorUpdates)
                }
                className="w-5 h-5 text-blue-600"
              />
            </div>

            {/* Visibility Option */}
            <div>
              <label className="block text-lg font-medium mb-2">
                Investor profile visibility
              </label>
              <select
                value={investorVisibility}
                onChange={(e) => setInvestorVisibility(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900 focus:outline-none"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="connections">Connections Only</option>
              </select>
            </div>

            {/* Contact Method */}
            <div>
              <label className="block text-lg font-medium mb-2">
                Preferred contact method
              </label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="email"
                    checked={contactMethod === "email"}
                    onChange={() => setContactMethod("email")}
                  />
                  <span>Email</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="phone"
                    checked={contactMethod === "phone"}
                    onChange={() => setContactMethod("phone")}
                  />
                  <span>Phone</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="in-app"
                    checked={contactMethod === "in-app"}
                    onChange={() => setContactMethod("in-app")}
                  />
                  <span>In-App Messages</span>
                </label>
              </div>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Save Settings
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}

Settings.propTypes = {
  userRole: PropTypes.string.isRequired,
};

export default Settings;
