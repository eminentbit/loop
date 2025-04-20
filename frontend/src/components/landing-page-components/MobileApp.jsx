import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function MobileApp() {
  const features = [
    "Search and apply for jobs on the go",
    "Get real-time notifications for new opportunities",
    "Chat directly with employers",
    "Track your application status",
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Take Loop With You Everywhere
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Download our mobile app to access all features on the go. Never
              miss an opportunity with real-time notifications and easy
              application tracking.
            </p>

            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <Link to="#" className="inline-block">
                <img
                  src="/placeholder.svg?height=50&width=170"
                  alt="Download on the App Store"
                  width={170}
                  height={50}
                  className="h-12 w-auto"
                />
              </Link>
              <Link to="#" className="inline-block">
                <img
                  src="/placeholder.svg?height=50&width=170"
                  alt="Get it on Google Play"
                  width={170}
                  height={50}
                  className="h-12 w-auto"
                />
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative">
              <img
                src="/placeholder.svg?height=600&width=300"
                alt="Loop mobile app"
                width={300}
                height={600}
                className="rounded-3xl shadow-2xl border-8 border-gray-800"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4">
                <div className="text-center">
                  <p className="text-sm font-semibold">App Rating</p>
                  <div className="flex items-center justify-center mt-1">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className="h-5 w-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 font-bold">4.9/5</span>
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
