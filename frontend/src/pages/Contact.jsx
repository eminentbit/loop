import { motion } from "framer-motion";
import Footer from "src/components/landing-page-components/Footer";
import Navbar from "src/components/landing-page-components/Navbar";

const ContactPage = () => {
  return (
    <main className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <Navbar />

      {/* Spacer after navbar */}
      <div className="h-20 sm:h-24" />

      <section className="flex-grow py-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto bg-white p-6 sm:p-10 rounded-3xl shadow-xl"
        >
          <h2 className="text-3xl font-bold text-indigo-500 mb-8 text-center">
            Get in Touch with EMP Inc Solution
          </h2>

          <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="flex flex-col">
              <label htmlFor="fullName" className="text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your name"
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-shadow"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-shadow"
              />
            </div>

            {/* Message (spans both columns) */}
            <div className="sm:col-span-2 flex flex-col">
              <label htmlFor="message" className="text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Your message..."
                rows={6}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-shadow resize-none"
              ></textarea>
            </div>

            {/* Submit Button (spans both columns) */}
            <div className="sm:col-span-2 text-center">
              <button
                type="submit"
                className="bg-indigo-500 text-white font-semibold py-3 px-10 rounded-xl hover:bg-indigo-600 transition duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
};

export default ContactPage;
