import  { useContext, useState, useEffect } from 'react';
import {  useNavigate, useParams, Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { HiSearch, HiChevronLeft, HiBell, HiCog } from 'react-icons/hi';
import { DarkModeContext } from '@/components/DarkModeContext';

const companiesFollow = [
  { id: 1, name: 'TechCorp', logo: '/logos/techcorp.png' },
  { id: 2, name: 'InnovateLabs', logo: '/logos/innovatelabs.png' },
  { id: 3, name: 'FutureWorks', logo: '/logos/futureworks.png' },
];

const suggestions = [
  { id: 1, name: 'CloudTech Solutions', logo: '/logos/cloudtech.png', desc: 'Leading cloud computing solutions provider' },
  { id: 2, name: 'Digital Innovations', logo: '/logos/digitalinnovations.png', desc: 'Transforming businesses through digital solutions' },
  { id: 3, name: 'Future Systems', logo: '/logos/futuresystems.png', desc: 'Next-generation software development' },
  { id: 4, name: 'Tech Dynamics', logo: '/logos/techdynamics.png', desc: 'Innovative technology solutions for modern businesses' },
];

export function AppNetworkRoutes() {
  return (
    <Routes>
      <Route path="/network" element={<MyNetworkPage />} />
      <Route path="/company/:id" element={<CompanyDetailPage />} />
    </Routes>
  );
}

export default function MyNetworkPage() {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(() => {
    const stored = localStorage.getItem('sidebarOpen');
    return stored ? JSON.parse(stored) : true;
  });

  useEffect(() => {
    localStorage.setItem('sidebarOpen', JSON.stringify(isOpen));
  }, [isOpen]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const filteredCompanies = companiesFollow.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredSuggestions = suggestions.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} min-h-screen transition-colors duration-300`}>
      {/* Fixed Header */}
      <div className={`fixed top-0 left-0 right-0 z-40 ${isOpen ? 'lg:ml-64' : 'lg:ml-20'} ml-20 transition-all duration-300`}>
        <Header
          title="My Network"
          backIcon={<HiChevronLeft onClick={() => setIsOpen(o => !o)} className="w-6 h-6 cursor-pointer" />}
          icons={[
            <HiSearch key="search-icon" onClick={() => document.querySelector('input')?.focus()} className="w-6 h-6 cursor-pointer" />,
            <HiBell key="bell" className="w-6 h-6" />,
            <HiCog key="cog" className="w-6 h-6" />,
            <button key="theme" onClick={toggleDarkMode} className="focus:outline-none">
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          ]}
        />
      </div>

      <div className="flex pt-24">
        {/* Responsive Sidebar */}
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* Main Content */}
        <div className={`flex-1 p-4 space-y-6 overflow-auto ${isOpen ? 'lg:ml-64' : 'lg:ml-20'} ml-20 transition-all duration-300`}>          
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search companies, people..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring"
            />
            <HiSearch className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          

          {/* Companies You Follow */}
          <section>
            <h2 className="text-md font-medium mb-2">Companies You Follow</h2>
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {filteredCompanies.map(company => (
                <div
                  key={company.id}
                  className="flex-shrink-0 w-24 text-center cursor-pointer"
                  onClick={() => navigate(`company/:id${company.id}`)}
                >
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-16 h-16 mx-auto rounded-full bg-gray-200 dark:bg-gray-700 object-cover"
                  />
                  <p className="mt-2 text-sm truncate">{company.name}</p>
                  <p className="text-xs text-blue-500 dark:text-blue-400">Following</p>
                </div>
              ))}
            </div>
          </section>

          {/* Suggested for You */}
          <section className="space-y-4">
            <h2 className="text-md font-medium">Suggested for You</h2>
            <div className="space-y-4">
              {filteredSuggestions.map(suggestion => (
                <div
                  key={suggestion.id}
                  className="border border-blue-500 dark:border-blue-400 rounded-lg p-4 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4 cursor-pointer" onClick={() => navigate(`company/${suggestion.id}`)}>
                    <img
                      src={suggestion.logo}
                      alt={suggestion.name}
                      className="w-12 h-12 rounded-md bg-gray-200 dark:bg-gray-700 object-cover"
                    />
                    <div>
                      <p className="font-semibold">{suggestion.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{suggestion.desc}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`company/${suggestion.id}`)}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg"
                  >
                    + Follow
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export function IndustryPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Industry</h1>
      {/* TODO: list industry details here */}
    </div>
  );
}

export function LocationPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Location</h1>
      {/* TODO: list location details here */}
    </div>
  );
}

export function ConnectionStrengthPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Connection Strength</h1>
      {/* TODO: list connection strength details here */}
    </div>
  );
}

export function CompanyDetailPage() {
  const { id } = useParams();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Company Detail - ID: {id}</h1>
      {/* TODO: fetch and display company info */}
    </div>
  );
}
