
import { Link, useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';

// Local asset imports
import Frank from '../assets/Frank.jpg';
import Dammy from '../assets/Dammy.png';
import Daryl from '../assets/Daryl.jpg';
import Market from '../assets/Market.jpg';
import Adn from '../assets/Adn.jpg';
//import FrankCEO from '../assets/FrankCEO.jpg';
import Charles from '../assets/Charles.jpg';
import emp from '../assets/emp.jpg';
import randy from '../assets/randy.jpg';
import logoLoop from '../assets/logo-loop.jpg';


function AboutPage() {
  const navigate = useNavigate();

  const professionals = [
    {
      name: "  ",
      role: "Chief Executive Officer",
      image: Frank,
      description: "Oversees company vision, strategy, and overall management."
    },
    {
      name: "  ",
      role: "Chief Financial Officer",
      //image: FrankCEO,
      description: "Manages financial planning, reporting, budgeting, and risk management."
    },
    {
      name: "  ",
      role: "Chief Operating Officer",
      image: Dammy,
      description: "Oversees daily operations, streamlines processes, and improves efficiency."
    },
    {
      name: "  ",
      role: "Chief Technology Officer",
      image: Daryl,
      description: "Leads technology strategy, innovation, and technical teams."
    },
    {
      name: "  ",
      role: "Chief Marketing Officer",
      image: Market,
      description: "Drives marketing strategy, brand development, and customer acquisition."
    },
    {
      name: "  ",
      role: "Product Manager",
      image: Adn,
      description: "Defines product roadmap, gathers requirements, and coordinates cross-functional teams."
    },
    {
      name: " ",
      role: "Backend Developer",
      image: Charles,
      description: "Develops the server-side logic, database management, and API integration."
    },
    {
      name: " ",
      role: "Frontend Developer",
      image: randy,
      description: "Develops user interfaces and ensures responsive design for web applications."
    }
  ];

  return (
    <main className="bg-white text-gray-800">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <Logo className="w-18 h-18 mr-2" />
            <span className="text-xl font-bold text-blue-400"></span>
          </Link>
          <div className="space-x-6">
            <Link
              to="/"
              className="bg-[hsl(201,83%,43%)] text-white px-4 py-2 rounded transition transform hover:bg-[hsl(201,83%,53%)] hover:-translate-y-1 text-sm max-[500px]:px-2 max-[500px]:py-1 max-[500px]:text-xs"
            >
              Home
            </Link>
            <Link
                  to="/contact"
                  className="border border-[hsl(201,83%,43%)] text-[hsl(201,83%,43%)] px-4 py-2 rounded transition transform hover:bg-[hsl(201,83%,43%)] hover:text-white hover:-translate-y-1 text-sm max-[500px]:px-2 max-[500px]:py-1 max-[500px]:text-xs"
                >
                  Contact
                </Link>
            <button
              onClick={() => navigate('/signup')}
              className="bg-[hsl(201,83%,43%)] text-white px-4 py-2 rounded transition transform hover:bg-[hsl(201,83%,53%)] hover:-translate-y-1 text-sm max-[500px]:px-2 max-[500px]:py-1 max-[500px]:text-xs"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-16 bg-gray-50 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-blue-400 mb-4">About EMP Inc Solution Loop</h1>
          <p className="text-lg text-gray-700">
          Bridging job seekers and recruiters through a seamless hiring platform.
        </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-semibold text-blue-500 mb-4">Our Mission</h2>
            <p className="text-gray-700 text-lg">
            To connect job seekers with the right opportunities and empower 
            recruiters to discover top talent with ease by leveraging intelligent matching algorithms, intuitive dashboards, and seamless communication tools. Our platform streamlines every step of the hiring lifecycle—from personalized job recommendations and skills assessments to automated interview scheduling and real‑time feedback—ensuring both candidates and hiring teams move forward quickly, 
            confidently, and transparently.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src={emp}
              alt="Our Mission"
              className="w-full max-h-[300px] object-contain rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="px-6 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row-reverse items-center gap-10">
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-semibold text-blue-500 mb-4">Our Vision</h2>
            <p className="text-gray-700 text-lg">
            A future where everyone finds purpose in meaningful work.
            Where talent meets opportunity without barriers.
            A world driven by growth, collaboration, and innovation.
            Where companies thrive through truly great hires.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src={logoLoop}
              alt="Our Vision"
              className="w-full max-h-[300px] object-contain rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Professionals Section */}
      <section className="px-6 py-20 bg-white">
        <h2 className="text-3xl font-bold text-blue-400 text-center mb-14">Meet the Professionals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {professionals.map((person, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <img
                src={person.image}
                alt={person.role}
                className="w-full h-48 object-contain bg-gray-100"
              />
              <div className="p-4 border-b">
                <h3 className="text-xl font-semibold text-blue-700">{person.name}</h3>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-500 font-medium">{person.role}</p>
                <p className="mt-2 text-sm text-gray-600">{person.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6">
        <div className="container mx-auto px-4">
          <ul className="flex flex-wrap justify-center gap-8 mb-4">
            <li><Link to="/user-policy" className="hover:text-indigo-400 transition text-sm">User Policy</Link></li>
            <li><Link to="/about" className="hover:text-indigo-400 transition text-sm">About</Link></li>
            <li><Link to="/user-agreement" className="hover:text-indigo-400 transition text-sm">User Agreement</Link></li>
            <li><Link to="/copyright-policy" className="hover:text-indigo-400 transition text-sm">Copyright Policy</Link></li>
            <li><Link to="/brand-policy" className="hover:text-indigo-400 transition text-sm">Brand Policy</Link></li>
            <li><Link to="/community-guidelines" className="hover:text-indigo-400 transition text-sm">Community Guidelines</Link></li>
          </ul>
          <div className="text-center text-sm">
            © 2025 EMP Inc Solution. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}

export default AboutPage;
