import { MapPin, Clock, DollarSign } from "lucide-react";

export default function FeaturedJobs() {
  const jobs = [
    {
      title: "Senior Frontend Developer",
      company: "TechCorp",
      logo: "/placeholder.svg?height=60&width=60",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120k - $150k",
      tags: ["React", "TypeScript", "Tailwind CSS"],
    },
    {
      title: "Product Manager",
      company: "InnovateLabs",
      logo: "/placeholder.svg?height=60&width=60",
      location: "New York, NY",
      type: "Full-time",
      salary: "$110k - $140k",
      tags: ["Product Strategy", "Agile", "UX"],
    },
    {
      title: "Data Scientist",
      company: "DataDriven",
      logo: "/placeholder.svg?height=60&width=60",
      location: "Remote",
      type: "Full-time",
      salary: "$130k - $160k",
      tags: ["Python", "Machine Learning", "SQL"],
    },
    {
      title: "UX/UI Designer",
      company: "DesignHub",
      logo: "/placeholder.svg?height=60&width=60",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$90k - $120k",
      tags: ["Figma", "User Research", "Prototyping"],
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Featured Jobs
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Explore our handpicked opportunities from top employers
            </p>
          </div>
          <a
            href="#"
            className="mt-6 md:mt-0 text-indigo-600 font-medium hover:text-indigo-700 transition-colors"
          >
            View all jobs →
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <div className="flex items-start">
                <img
                  src={job.logo || "/placeholder.svg"}
                  alt={`${job.company} logo`}
                  width={60}
                  height={60}
                  className="rounded-lg mr-4"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">
                    {job.title}
                  </h3>
                  <p className="text-indigo-600 font-medium">{job.company}</p>

                  <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {job.type}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {job.salary}
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="px-8 py-3 rounded-full bg-indigo-600 text-white font-medium shadow-lg hover:shadow-indigo-200 hover:bg-indigo-700 transition-all duration-200">
            Browse All Jobs
          </button>
        </div>
      </div>
    </section>
  );
}
