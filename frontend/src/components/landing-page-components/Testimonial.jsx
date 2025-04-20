
export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "Loop helped me find my dream job in just two weeks! The AI matching technology is incredible and connected me with the perfect company.",
      name: "Sarah Johnson",
      title: "Software Engineer",
      company: "TechCorp",
      avatar: "/placeholder.svg?height=64&width=64",
    },
    {
      quote:
        "As a hiring manager, Loop has transformed our recruitment process. We've found high-quality candidates faster than ever before.",
      name: "Michael Chen",
      title: "HR Director",
      company: "InnovateLabs",
      avatar: "/placeholder.svg?height=64&width=64",
    },
    {
      quote:
        "The verification process for employers gives job seekers peace of mind. I felt confident applying through Loop knowing the companies were legitimate.",
      name: "Emily Rodriguez",
      title: "Marketing Specialist",
      company: "BrandWorks",
      avatar: "/placeholder.svg?height=64&width=64",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            What Our Users Say
          </h2>
          <div className="mt-4 h-1 w-16 bg-indigo-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col"
            >
              <div className="flex-1">
                <svg
                  className="h-8 w-8 text-indigo-400 mb-4"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="text-gray-600 mb-6">{testimonial.quote}</p>
              </div>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={64}
                  height={64}
                  className="rounded-full mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {testimonial.title}, {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
