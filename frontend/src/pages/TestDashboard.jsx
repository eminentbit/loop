import { useState } from "react";
import {
  Home,
  Briefcase,
  Users,
  Bell,
  MessageSquare,
  PlusCircle,
  Settings,
  Menu,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";

export default function CMSDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`bg-gray-900 text-white p-4 transition-all ${
          sidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="mb-4">
          <Menu className="text-white" />
        </button>
        <nav className="space-y-4">
          <NavItem icon={Home} label="Feed" sidebarOpen={sidebarOpen} />
          <NavItem icon={Briefcase} label="Jobs" sidebarOpen={sidebarOpen} />
          <NavItem
            icon={MessageSquare}
            label="Applications"
            sidebarOpen={sidebarOpen}
          />
          <NavItem icon={Users} label="Network" sidebarOpen={sidebarOpen} />
          <NavItem
            icon={Briefcase}
            label="Career Tools"
            sidebarOpen={sidebarOpen}
          />
          <NavItem icon={Bell} label="Insights" sidebarOpen={sidebarOpen} />
          <NavItem icon={Settings} label="Settings" sidebarOpen={sidebarOpen} />
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between bg-white p-4 shadow-md">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold">LOOP-OS CMS</h1>
            <div className="relative">
              <Search className="absolute top-2 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs, people, or content"
                className="pl-10 pr-4 py-2 border rounded-md"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Bell className="cursor-pointer" />
            <MessageSquare className="cursor-pointer" />
            <Button variant="outline">Profile</Button>
          </div>
        </header>

        {/* Feed Content */}
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Post Highlighting Real-Time Job Matches */}
            <Post
              title="Real-Time Job Matches"
              content="Discover opportunities directly fetched from employers' systems for up-to-date job matches and alerts."
            />
            {/* Post Highlighting Automated Application Process */}
            <Post
              title="Automated Application Process"
              content="Streamline your job search with pre-filled applications and one-click apply across multiple listings."
            />
            {/* Post Highlighting Personalized Career Development */}
            <Post
              title="Personalized Career Development"
              content="Receive tailored course, certification, and skill gap recommendations to advance your career."
            />
            {/* Post Highlighting Dynamic Portfolio Updates */}
            <Post
              title="Dynamic Portfolio Updates"
              content="Showcase your work and achievements in real time with a portfolio that adapts to your evolving career."
            />
            {/* Additional posts can be added here */}
          </div>
        </main>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg">
        <PlusCircle size={24} />
      </button>
    </div>
  );
}

function Post({ title, content }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-gray-700">{content}</p>
      <Button className="mt-4" variant="primary">
        Read More
      </Button>
    </div>
  );
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

function NavItem({ icon: Icon, label, sidebarOpen }) {
  return (
    <div className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md cursor-pointer">
      <Icon />
      {sidebarOpen && <span>{label}</span>}
    </div>
  );
}

NavItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
};
