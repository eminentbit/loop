import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeroImage from "../assets/loop.jpg";
import Logo from "@/components/Logo";
import SignInModal from "@/components/SignInModal";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="font-sans text-gray-800">
      {/* Header */}
      <header className="bg-white py-3 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between px-4 max-[500px]:px-2">
          <div className="text-3xl font-bold text-indigo-600">
            <Logo className="w-20 h-20" />
          </div>
          <nav>
            <ul className="flex items-center space-x-6 max-[500px]:space-x-2">
              <li>
                <Link
                  to="/"
                  className="transition transform hover:-translate-y-1 hover:text-indigo-600 text-sm max-[500px]:text-xs"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="transition transform hover:-translate-y-1 hover:text-indigo-600 text-sm max-[500px]:text-xs"
                >
                  About Us
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="border border-[hsl(201,83%,43%)] text-[hsl(201,83%,43%)] px-4 py-2 rounded transition transform hover:bg-[hsl(201,83%,43%)] hover:text-white hover:-translate-y-1 text-sm max-[500px]:px-2 max-[500px]:py-1 max-[500px]:text-xs"
                >
                  Sign In
                </button>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="bg-[hsl(201,83%,43%)] text-white px-4 py-2 rounded transition transform hover:bg-[hsl(201,83%,53%)] hover:-translate-y-1 text-sm max-[500px]:px-2 max-[500px]:py-1 max-[500px]:text-xs"
                >
                  Join Now
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center bg-white py-10 pl-5 max-[500px]:pl-2"
      >
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 gap-8 max-[500px]:text-center">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold text-[#1389c9] mb-4">
              Welcome to LOOP-0S,
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              The fastest way to get a Job
            </p>
            <div className="flex flex-col gap-4">
              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="bg-[#1389c9] text-white px-6 py-3 rounded hover:bg-indigo-400 transition text-sm max-[500px]:px-4 max-[500px]:py-2"
              >
                Get Started
              </button>
              <p className="text-sm text-gray-500">
                By getting started, you agree to Loop&apos;s{" "}
                <Link
                  to="/user-agreement"
                  className="text-[#1389c9] hover:underline"
                >
                  User Agreement
                </Link>
                ,{" "}
                <Link
                  to="/privacy-policy"
                  className="text-indigo-600 hover:underline"
                >
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link
                  to="/cookie-policy"
                  className="text-indigo-600 hover:underline"
                >
                  Cookie Policy
                </Link>
                .
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src={HeroImage}
              alt="Job seekers networking"
              className="rounded-lg shadow-lg max-[500px]:w-full"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50 pl-5 max-[500px]:pl-2">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-left max-[500px]:text-center">
            Explore Collaborative Articles
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-[500px]:text-center">
            We&apos;re unlocking community knowledge in a new way.
            <br />
            Find jobs in any discipline of your choice.
          </p>
          <div className="flex justify-end max-[500px]:justify-center">
            <ul className="flex flex-wrap gap-3">
              <li>
                <Link
                  to="/articles/marketing"
                  className="px-4 py-2 border border-gray-800 rounded-full text-gray-800 hover:bg-gray-100 transition text-sm max-[500px]:px-3 max-[500px]:py-1"
                >
                  Marketing
                </Link>
              </li>
              <li>
                <Link
                  to="/articles/public-administration"
                  className="px-4 py-2 border border-gray-800 rounded-full text-gray-800 hover:bg-gray-100 transition text-sm max-[500px]:px-3 max-[500px]:py-1"
                >
                  Public Administration
                </Link>
              </li>
              <li>
                <Link
                  to="/articles/engineering"
                  className="px-4 py-2 border border-gray-800 rounded-full text-gray-800 hover:bg-gray-100 transition text-sm max-[500px]:px-3 max-[500px]:py-1"
                >
                  Engineering
                </Link>
              </li>
              <li>
                <Link
                  to="/articles/healthcare"
                  className="px-4 py-2 border border-gray-800 rounded-full text-gray-800 hover:bg-gray-100 transition text-sm max-[500px]:px-3 max-[500px]:py-1"
                >
                  Healthcare
                </Link>
              </li>
              <li>
                <Link
                  to="/articles/business-administration"
                  className="px-4 py-2 border border-gray-800 rounded-full text-gray-800 hover:bg-gray-100 transition text-sm max-[500px]:px-3 max-[500px]:py-1"
                >
                  Business Administration
                </Link>
              </li>
              <li>
                <Link
                  to="/articles/it-services"
                  className="px-4 py-2 border border-gray-800 rounded-full text-gray-800 hover:bg-gray-100 transition text-sm max-[500px]:px-3 max-[500px]:py-1"
                >
                  IT Services
                </Link>
              </li>
              <li>
                <Link
                  to="/articles/telecommunication"
                  className="px-4 py-2 border border-gray-800 rounded-full text-gray-800 hover:bg-gray-100 transition text-sm max-[500px]:px-3 max-[500px]:py-1"
                >
                  Telecommunication
                </Link>
              </li>
              <li>
                <Link
                  to="/articles/journalism"
                  className="px-4 py-2 border border-gray-800 rounded-full text-gray-800 hover:bg-gray-100 transition text-sm max-[500px]:px-3 max-[500px]:py-1"
                >
                  Journalism
                </Link>
              </li>
              <li>
                <Link
                  to="/articles"
                  className="px-4 py-2 border border-indigo-600 rounded-full text-indigo-600 hover:bg-indigo-100 transition text-sm max-[500px]:px-3 max-[500px]:py-1"
                >
                  Show all
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="py-20 bg-white pl-5 max-[500px]:pl-2"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-left max-[500px]:text-center">
            Find the right job or <br /> internship for you
          </h2>
          <div className="flex justify-end max-[500px]:justify-center">
            <ul className="flex flex-wrap gap-3">
              <li>
                <Link
                  to="/jobs/marketing"
                  className="px-4 py-2 border border-gray-800 rounded-full text-gray-800 hover:bg-gray-100 transition text-sm max-[500px]:px-3 max-[500px]:py-1"
                >
                  Marketing
                </Link>
              </li>
              <li>
                <Link
                  to="/jobs/telecommunication"
                  className="px-4 py-2 border border-gray-800 rounded-full text-gray-800 hover:bg-gray-100 transition text-sm max-[500px]:px-3 max-[500px]:py-1"
                >
                  Telecommunication
                </Link>
              </li>
              <li>
                <Link
                  to="/jobs/journalism"
                  className="px-4 py-2 border border-gray-800 rounded-full text-gray-800 hover:bg-gray-100 transition text-sm max-[500px]:px-3 max-[500px]:py-1"
                >
                  Journalism
                </Link>
              </li>
              <li>
                <Link
                  to="/jobs/business-administration"
                  className="px-4 py-2 border border-gray-800 rounded-full text-gray-800 hover:bg-gray-100 transition text-sm max-[500px]:px-3 max-[500px]:py-1"
                >
                  Business Administration
                </Link>
              </li>
              <li>
                <Link
                  to="/jobs/public-administration"
                  className="px-4 py-2 border border-gray-800 rounded-full text-gray-800 hover:bg-gray-100 transition text-sm max-[500px]:px-3 max-[500px]:py-1"
                >
                  Public Administration
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6">
        <div className="container mx-auto px-4">
          <ul className="flex flex-wrap justify-center gap-8 mb-4">
            <li>
              <Link
                to="/user-policy"
                className="hover:text-indigo-400 transition text-sm max-[500px]:text-xs"
              >
                User Policy
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-indigo-400 transition text-sm max-[500px]:text-xs"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/user-agreement"
                className="hover:text-indigo-400 transition text-sm max-[500px]:text-xs"
              >
                User Agreement
              </Link>
            </li>
            <li>
              <Link
                to="/copyright-policy"
                className="hover:text-indigo-400 transition text-sm max-[500px]:text-xs"
              >
                Copyright Policy
              </Link>
            </li>
            <li>
              <Link
                to="/brand-policy"
                className="hover:text-indigo-400 transition text-sm max-[500px]:text-xs"
              >
                Brand Policy
              </Link>
            </li>
            <li>
              <Link
                to="/community-guidelines"
                className="hover:text-indigo-400 transition text-sm max-[500px]:text-xs"
              >
                Community Guidelines
              </Link>
            </li>
          </ul>
          <div className="text-center text-sm">
            &copy; 2025 Loop. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Modal for Sign In */}
      {isModalOpen && <SignInModal setIsModalOpen={setIsModalOpen} />}
    </div>
  );
};

export default LandingPage;
