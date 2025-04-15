import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';
import { motion } from 'framer-motion';
const Navbar = () => (
    <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
                <Logo />
                <nav>
                    <Link to="/" className="text-indigo-400 hover:text-indigo-400">
                        Home
                    </Link>
                </nav>
            </div>
        </div>
    </header>
);

const ContactPage = () => {
  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <section className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-md"
        >
          <h2 className="text-3xl font-semibold text-indigo-400 mb-8 text-center">
            Get in Touch with EMP Inc Solution
          </h2>

          <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="flex flex-col">
              <label htmlFor="fullName" className="text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your name"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
              /> 
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
              />
            </div>

            {/* Message (spans both columns) */}
            <div className="sm:col-span-2 flex flex-col">
              <label htmlFor="message" className="text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Your message..."
                rows="6"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow resize-none"
              ></textarea>
            </div>

            {/* Submit Button (spans both columns) */}
            <div className="sm:col-span-2 text-center">
              <button
                type="submit"
                className="bg-indigo-600 text-white font-medium py-3 px-8 rounded-lg hover:bg-indigo-700 transition"
              >
                Send Message
              </button>
            </div>
          </form>
        </motion.div>
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
};

export default ContactPage;
