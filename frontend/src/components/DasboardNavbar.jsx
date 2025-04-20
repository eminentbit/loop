import { Bell, Search, UserCircle } from "lucide-react";

const DashboardNavbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md">
      {/* Logo */}
      <div className="text-xl font-bold text-gray-800">Loop Dashboard</div>

      {/* Search Bar */}
      <div className="relative w-1/3">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
      </div>

      {/* Notification & Profile */}
      <div className="flex items-center space-x-6">
        {/* Notification Bell */}
        <div className="relative cursor-pointer">
          <Bell className="text-gray-600 hover:text-gray-900" size={20} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            3
          </span>
        </div>

        {/* User Profile Dropdown */}
        <div className="relative cursor-pointer flex items-center space-x-2">
          <UserCircle className="text-gray-600" size={28} />
          <span className="text-gray-800 font-medium">John Doe</span>
        </div>
        
      </div>
    </nav>
  );
};

export default DashboardNavbar;
