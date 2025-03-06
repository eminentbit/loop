import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const ProfilePage = () => {
  // Sample user data. In a real application, this would come from an API.
  const user = {
    name: "Jane Doe",
    title: "Frontend Developer",
    avatar: "/path/to/avatar.jpg", // Replace with actual path or URL
    status: "Actively Job Seeking",
    location: "San Francisco, CA",
    email: "jane.doe@example.com",
    phone: "(123) 456-7890",
    summary:
      "Passionate frontend developer with 5+ years of experience in building responsive and user-friendly web applications using React.js, Tailwind CSS, and modern web technologies.",
    skills: ["React", "JavaScript", "CSS", "HTML", "Tailwind CSS"],
    certifications: ["Certified Frontend Developer", "JavaScript Specialist"],
    experiences: [
      {
        id: 1,
        company: "Tech Corp",
        role: "Senior Frontend Developer",
        duration: "Jan 2020 - Present",
        description:
          "Leading frontend development for various high-traffic web applications.",
      },
      {
        id: 2,
        company: "Web Solutions",
        role: "Frontend Developer",
        duration: "Jun 2017 - Dec 2019",
        description:
          "Developed and maintained responsive websites for diverse clients.",
      },
    ],
    portfolio: [
      {
        id: 1,
        title: "Project One",
        image: "/path/to/project1.jpg", // Replace with actual path or URL
        link: "#",
      },
      {
        id: 2,
        title: "Project Two",
        image: "/path/to/project2.jpg", // Replace with actual path or URL
        link: "#",
      },
    ],
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6">
        <Header />
        {/* Profile Header */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex items-center">
            <img
              src={user.avatar}
              alt="User Avatar"
              className="w-24 h-24 rounded-full object-cover mr-6"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
              <p className="text-gray-600">{user.title}</p>
              <p className="mt-2 text-green-600 font-semibold">{user.status}</p>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* About Section */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">About Me</h2>
            <p className="text-gray-700 mb-4">{user.summary}</p>
            <div className="mb-4">
              <h3 className="font-semibold text-gray-800">
                Contact Information
              </h3>
              <p className="text-gray-600">Location: {user.location}</p>
              <p className="text-gray-600">Email: {user.email}</p>
              <p className="text-gray-600">Phone: {user.phone}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Skills</h3>
              <ul className="flex flex-wrap mt-2">
                {user.skills.map((skill, index) => (
                  <li
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-2 mb-2"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-gray-800">Certifications</h3>
              <ul className="list-disc list-inside mt-2">
                {user.certifications.map((cert, index) => (
                  <li key={index} className="text-gray-600">
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Experience & Portfolio Section */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Experience</h2>
            {user.experiences.map((exp) => (
              <div key={exp.id} className="mb-4 border-b pb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {exp.role}
                </h3>
                <p className="text-gray-600">
                  {exp.company} | {exp.duration}
                </p>
                <p className="text-gray-700 mt-2">{exp.description}</p>
              </div>
            ))}
            <h2 className="text-2xl font-bold mt-6 mb-4">Portfolio</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {user.portfolio.map((item) => (
                <a
                  key={item.id}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-800">
                      {item.title}
                    </h3>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
