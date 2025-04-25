import { Search, MapPin, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section className="pt-20 pb-16 md:pt-18 md:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
              Find Your Dream <span className="text-indigo-600">Job</span>, All
              in One Loop
            </h1>
            <p className="text-xl text-gray-600 max-w-lg">
              Loop connects job seekers and employers with precision and ease.
            </p>

            {/* Search Form */}
            <div className="bg-white rounded-xl shadow-lg p-4 mt-8">
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Job title or keyword"
                    className="pl-10 pr-3 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Location"
                    className="pl-10 pr-3 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <button
                  className="bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
                  onClick={() => navigate("/jobs")}
                >
                  Search Jobs
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                className="px-8 py-3 rounded-full bg-indigo-600 text-white font-medium shadow-lg hover:shadow-indigo-200 hover:bg-indigo-700 transition-all duration-200 cursor-pointer"
                onClick={() => navigate("/jobs")}
              >
                Explore Jobs
              </button>
              <button
                className="px-8 py-3 rounded-full bg-white border border-gray-200 text-gray-700 font-medium shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-200 cursor-pointer"
                onClick={() => navigate("/post-job")}
              >
                Post a Job
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <img
                src="/landing.page.images/hero.svg"
                alt="Job seeker using laptop"
                width={500}
                height={500}
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 max-sm:-right-1 -right-6 bg-white rounded-xl shadow-lg p-4 w-48">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Briefcase className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">New Jobs</p>
                    <p className="text-indigo-600 font-bold">2,543+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
