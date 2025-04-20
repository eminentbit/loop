import { CheckIcon, BoltIcon, UserIcon, TabletIcon as DeviceTabletIcon } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: <CheckIcon className="h-6 w-6 text-indigo-600" />,
      title: "AI-powered job matching",
      description: "Our algorithm finds the perfect matches for your skills and preferences.",
    },
    {
      icon: <UserIcon className="h-6 w-6 text-indigo-600" />,
      title: "Verified employers only",
      description: "Every company on our platform is thoroughly vetted for your security.",
    },
    {
      icon: <BoltIcon className="h-6 w-6 text-indigo-600" />,
      title: "Fast application process",
      description: "Apply to multiple positions with just a few clicks.",
    },
    {
      icon: <DeviceTabletIcon className="h-6 w-6 text-indigo-600" />,
      title: "Mobile-friendly interface",
      description: "Search and apply for jobs on any device, anywhere.",
    },
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why Loop?</h2>
          <div className="mt-4 h-1 w-16 bg-indigo-600 mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            We&apos;re revolutionizing the job search experience with cutting-edge technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:border-indigo-200 transition-all duration-300 hover:shadow-xl group"
            >
              <div className="w-14 h-14 rounded-xl bg-indigo-50 flex items-center justify-center mb-6 group-hover:bg-indigo-100 transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
