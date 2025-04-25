import { useNavigate } from "react-router-dom"
export default function CTA() {
  const navigate = useNavigate()
    return (
      <section className="py-16 md:py-24 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-white/20 rounded-full w-3/4 mb-2"></div>
                  <div className="h-4 bg-white/20 rounded-full w-1/2"></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-white/20 rounded-full"></div>
                <div className="h-4 bg-white/20 rounded-full"></div>
                <div className="h-4 bg-white/20 rounded-full w-3/4"></div>
              </div>
            </div>
  
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to take your career to the next level?</h2>
              <p className="text-white/80 text-lg mb-8 max-w-md">
                Join thousands of professionals who have already found their dream jobs through Loop.
              </p>
              <button className="px-8 py-3 rounded-full bg-white text-indigo-600 font-medium shadow-lg hover:shadow-indigo-900/20 transition-all duration-200 cursor-pointer"
              onClick={() => navigate("/jobs")}
              >
                Get Started Now
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }
  