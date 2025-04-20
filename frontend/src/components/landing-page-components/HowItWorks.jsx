export default function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            How It Works
          </h2>
          <div className="mt-4 h-1 w-16 bg-indigo-600 mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Our streamlined process helps you find the perfect job match in just
            three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center relative">
            <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center mx-auto mb-6 text-xl font-bold">
              1
            </div>
            <h3 className="text-xl font-bold mb-4">Create Your Profile</h3>
            <p className="text-gray-600 mb-6">
              Build your professional profile to showcase your skills and
              experience.
            </p>
            <img
              src="/landing.page.images/profile.svg"
              alt="Create profile illustration"
              width={180}
              height={120}
              className="mx-auto"
            />
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg text-center relative">
            <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center mx-auto mb-6 text-xl font-bold">
              2
            </div>
            <h3 className="text-xl font-bold mb-4">Browse & Apply for Jobs</h3>
            <p className="text-gray-600 mb-6">
              Search through thousands of opportunities that match your skills.
            </p>
            <img
              src="/landing.page.images/job.svg"
              alt="Browse jobs illustration"
              width={180}
              height={120}
              className="mx-auto"
            />
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg text-center relative">
            <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center mx-auto mb-6 text-xl font-bold">
              3
            </div>
            <h3 className="text-xl font-bold mb-4">
              Connect with Top Employers
            </h3>
            <p className="text-gray-600 mb-6">
              Engage directly with companies looking for talent like you.
            </p>
            <img
              src="/landing.page.images/employ.svg"
              alt="Connect with employers illustration"
              width={180}
              height={120}
              className="mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
