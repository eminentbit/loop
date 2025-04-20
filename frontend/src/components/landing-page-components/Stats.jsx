export default function Stats() {
    const stats = [
      { value: "2M+", label: "Job Seekers" },
      { value: "10K+", label: "Companies" },
      { value: "50K+", label: "Jobs Posted" },
      { value: "95%", label: "Success Rate" },
    ]
  
    return (
      <section className="py-12 bg-indigo-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <p className="text-4xl md:text-5xl font-bold">{stat.value}</p>
                <p className="text-lg mt-2 text-indigo-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  