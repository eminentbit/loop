import { Link, useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';

// Local asset imports
import Frank from '../assets/Frank.jpg';
import Dammy from '../assets/Dammy.png';
import Daryl from '../assets/Daryl.jpg';
import Market from '../assets/Market.jpg';
import Adn from '../assets/Adn.jpg';
import Charles from '../assets/Charles.jpg';
import emp from '../assets/emp.jpg';
import randy from '../assets/randy.jpg';
import logoLoop from '../assets/logo-loop.jpg';
import lum from '../assets/lum.jpg';

function AboutPage() {
  const navigate = useNavigate();

  const professionals = [
    {
      name: "Frank Nkwain",
      role: "Chief Executive Officer",
      image: Frank,
      description: "Oversees company vision, strategy, and overall management."
    },
    {
      name: "Lum Beatrice",
      role: "Chief Financial Officer",
      image: lum,
      description: "Manages financial planning, reporting, budgeting, and risk management."
    },
    {
      name: "Daryl Mbuh",
      role: "Chief Technology Officer",
      image: Daryl,
      description: "Leads technology strategy, innovation, and technical teams."
    },
    {
      name: "Dammy Brown",
      role: "Chief Operating Officer",
      image: Dammy,
      description: "Oversees daily operations, streamlines processes, and improves efficiency."
    },
    {
      name: "Lisa Market",
      role: "Chief Marketing Officer",
      image: Market,
      description: "Drives marketing strategy, brand development, and customer acquisition."
    },
    {
      name: "Adn Sali",
      role: "Product Manager",
      image: Adn,
      description: "Defines product roadmap, gathers requirements, and coordinates cross-functional teams."
    },
    {
      name: "Charles Tanwi",
      role: "Backend Developer",
      image: Charles,
      description: "Develops the server-side logic, database management, and API integration."
    },
    {
      name: "Randy Owusu",
      role: "Frontend Developer",
      image: randy,
      description: "Creates intuitive user interfaces with modern and responsive designs."
    }
  ];

  return (
    <main className="bg-white text-gray-800">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <Logo className="w-16 h-16 mr-2" />
            <span className="text-2xl font-extrabold text-blue-500">EMP Inc</span>
          </Link>
          <div className="space-x-4 sm:space-x-6">
            <Link to="/" className="nav-btn">Home</Link>
            <Link to="/contact" className="nav-btn-outline">Contact</Link>
            <button onClick={() => navigate('/signup')} className="nav-btn">Sign Up</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-16 bg-blue-50 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-extrabold text-blue-500 mb-6">About EMP Inc Solution Loop</h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Bridging job seekers and recruiters through a seamless hiring platform.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
          <div className="w-full md:w-1/2">
            <h2 className="section-heading">Our Mission</h2>
            <p className="section-text">
              To connect job seekers with the right opportunities and empower recruiters to discover top talent with ease. We leverage intelligent matching algorithms, intuitive dashboards, and seamless communication tools to streamline every step of the hiring lifecycle—ensuring both candidates and hiring teams move forward quickly, confidently, and transparently.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <img src={emp} alt="Our Mission" className="section-image" />
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="px-6 py-16 bg-blue-50">
        <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row-reverse items-center gap-10">
          <div className="w-full md:w-1/2">
            <h2 className="section-heading">Our Vision</h2>
            <p className="section-text">
              A future where everyone finds purpose in meaningful work. Where talent meets opportunity without barriers. A world driven by growth, collaboration, and innovation. Where companies thrive through truly great hires.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <img src={logoLoop} alt="Our Vision" className="section-image" />
          </div>
        </div>
      </section>

      {/* Professionals Section */}
      <section className="px-6 py-20 bg-white">
        <h2 className="text-4xl font-bold text-blue-500 text-center mb-14">Meet the Professionals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-7xl mx-auto">
          {professionals.map((person, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden"
            >
              <img
                src={person.image}
                alt={person.name}
                className="w-full h-48 object-cover object-top rounded-t-2xl"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-blue-700">{person.name}</h3>
                <p className="text-sm text-gray-500 font-medium">{person.role}</p>
                <p className="mt-2 text-sm text-gray-600">{person.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="container mx-auto px-4">
          <ul className="flex flex-wrap justify-center gap-6 mb-4 text-sm">
            <li><Link to="/user-policy" className="footer-link">User Policy</Link></li>
            <li><Link to="/about" className="footer-link">About</Link></li>
            <li><Link to="/user-agreement" className="footer-link">User Agreement</Link></li>
            <li><Link to="/copyright-policy" className="footer-link">Copyright</Link></li>
            <li><Link to="/brand-policy" className="footer-link">Brand Policy</Link></li>
            <li><Link to="/community-guidelines" className="footer-link">Community</Link></li>
          </ul>
          <div className="text-center text-sm text-gray-400">
            © 2025 EMP Inc Solution Loop. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}

export default AboutPage;
