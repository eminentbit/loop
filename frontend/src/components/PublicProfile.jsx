import { useState } from "react";
import PropTypes from "prop-types";
import {
  FileText,
  CheckCircle,
  Star,
  Users,
  Globe,
  Clock,
  Briefcase,
  BookOpen,
} from "lucide-react";

// Responsive Icon Wrapper
const IconWrap = ({ children, color }) => (
  <span className={`inline-flex items-center justify-center mr-2 rounded-full shadow-md bg-gradient-to-br ${color} p-2`}>
    {children}
  </span>
);

IconWrap.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string.isRequired,
};

const PublicProfile = ({ profile }) => {
  const [showContact, setShowContact] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Submitted successfully");
    setShowContact(false);
  };

  const handleCancel = () => setShowContact(false);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-4 sm:py-8 px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
        {/* Header Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-4 xs:p-6 sm:p-8 flex flex-col md:flex-row items-center gap-4 sm:gap-6 relative overflow-hidden
                        hover:scale-[1.015] transition-transform duration-300 group">
          <div className="relative">
            <img
              className="h-20 w-20 xs:h-24 xs:w-24 sm:h-28 sm:w-28 rounded-full ring-4 ring-blue-500/20 dark:ring-blue-400/30 shadow-lg object-cover group-hover:scale-105 transition-transform"
              src={profile.photoUrl}
              alt={profile.name}
            />
            <span className="absolute bottom-1 right-1 block h-3 w-3 xs:h-4 xs:w-4 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></span>
          </div>
          <div className="md:ml-6 sm:ml-8 text-center md:text-left w-full">
            <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-gray-100 tracking-tight">
              {profile.name}
            </h1>
            <p className="mt-1 text-sm xs:text-base sm:text-lg text-blue-700 dark:text-blue-300 font-medium">{profile.title}</p>
            <div className="mt-2 flex flex-col sm:flex-row justify-center md:justify-start items-center gap-2 text-gray-500 dark:text-gray-400">
              <FileText className="text-blue-500" size={16} />
              <span className="text-xs xs:text-sm sm:text-base">{profile.location}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {/* About Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow p-4 xs:p-5 sm:p-7 border-l-4 border-blue-500/10 dark:border-blue-400/10">
            <h2 className="flex items-center text-lg xs:text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2 xs:mb-3 sm:mb-4">
              <IconWrap color="from-blue-200 to-blue-400 dark:from-blue-700 dark:to-blue-500"><FileText className="text-blue-700 dark:text-blue-200" size={20} /></IconWrap>
              About Me
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-xs xs:text-sm sm:text-base">
              {profile.about}
            </p>
          </div>

          {/* Contact Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow p-4 xs:p-5 sm:p-7 border-l-4 border-green-500/10 dark:border-green-400/10">
            <h2 className="flex items-center text-lg xs:text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2 xs:mb-3 sm:mb-4">
              <IconWrap color="from-green-200 to-green-400 dark:from-green-700 dark:to-green-500"><CheckCircle className="text-green-600 dark:text-green-200" size={20} /></IconWrap>
              Contact
            </h2>
            <ul className="text-gray-700 dark:text-gray-300 space-y-2 xs:space-y-3 text-xs xs:text-sm sm:text-base">
              <li className="flex items-start sm:items-center gap-2">
                <FileText className="text-blue-500" size={16} />
                <span>{profile.email}</span>
              </li>
              <li className="flex items-start sm:items-center gap-2">
                <FileText className="text-blue-500" size={16} />
                <span>{profile.phone || "N/A"}</span>
              </li>
              <li className="flex items-center gap-2">
                <FileText className="text-blue-500" size={16} />
                <span>{profile.location}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Services & Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {/* Services Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow p-4 xs:p-5 sm:p-7 border-l-4 border-blue-500/10 dark:border-blue-400/10">
            <h3 className="flex items-center text-lg xs:text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2 xs:mb-3 sm:mb-4">
              <IconWrap color="from-blue-200 to-blue-400 dark:from-blue-700 dark:to-blue-500"><CheckCircle className="text-green-500" size={18} /></IconWrap>
              Services
            </h3>
            <ul className="space-y-2 xs:space-y-3 text-gray-700 dark:text-gray-300 text-xs xs:text-sm sm:text-base">
              {profile.services.map((svc, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="bg-blue-100 dark:bg-blue-700 rounded-full p-1">
                    <Star className="text-blue-500" size={13} />
                  </span>
                  <span>{svc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Skills Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow p-4 xs:p-5 sm:p-7 border-l-4 border-purple-500/10 dark:border-purple-400/10">
            <h3 className="flex items-center text-lg xs:text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2 xs:mb-3 sm:mb-4">
              <IconWrap color="from-purple-200 to-purple-400 dark:from-purple-700 dark:to-purple-500"><Users className="text-purple-500" size={18} /></IconWrap>
              Top Skills
            </h3>
            <div className="flex flex-wrap gap-2 xs:gap-3">
              {profile.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 xs:px-4 xs:py-2 bg-gradient-to-br from-gray-100 via-blue-100 to-gray-200 dark:from-gray-700 dark:via-blue-900 dark:to-gray-800 rounded-full text-xs xs:text-sm sm:text-base font-medium text-gray-800 dark:text-gray-200 shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Featured, Activity, Experience, Education, Projects */}
        <div className="space-y-4 sm:space-y-8">
          {/* Featured */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow p-4 xs:p-5 sm:p-7 border-l-4 border-yellow-400/10 dark:border-yellow-400/10">
            <h3 className="flex items-center text-lg xs:text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2 xs:mb-3 sm:mb-4">
              <IconWrap color="from-yellow-200 to-yellow-400 dark:from-yellow-700 dark:to-yellow-500"><Globe className="text-yellow-500" size={20} /></IconWrap>
              Featured
            </h3>
            <ul className="list-disc list-inside space-y-1 xs:space-y-2 text-gray-700 dark:text-gray-300 text-xs xs:text-sm sm:text-base">
              {profile.featured.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow p-4 xs:p-5 sm:p-7 border-l-4 border-indigo-400/10 dark:border-indigo-400/10">
            <h3 className="flex items-center text-lg xs:text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2 xs:mb-3 sm:mb-4">
              <IconWrap color="from-indigo-200 to-indigo-400 dark:from-indigo-700 dark:to-indigo-500"><Clock className="text-indigo-500" size={20} /></IconWrap>
              Recent Activity
            </h3>
            <ul className="space-y-1 xs:space-y-2 text-gray-700 dark:text-gray-300 text-xs xs:text-sm sm:text-base">
              {profile.activity.map((act, idx) => (
                <li key={idx}>{act}</li>
              ))}
            </ul>
          </div>

          {/* Experience */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow p-4 xs:p-5 sm:p-7 border-l-4 border-red-400/10 dark:border-red-400/10">
            <h3 className="flex items-center text-lg xs:text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3 xs:mb-4 sm:mb-5">
              <IconWrap color="from-red-200 to-red-400 dark:from-red-700 dark:to-red-500"><Briefcase className="text-red-500" size={20} /></IconWrap>
              Experience
            </h3>
            <div className="space-y-4 xs:space-y-5 text-gray-700 dark:text-gray-300 text-xs xs:text-sm sm:text-base">
              {profile.experience.map((exp, idx) => (
                <div key={idx} className="bg-gray-50 dark:bg-gray-900/30 rounded-xl p-3 xs:p-5 shadow-inner border-l-2 border-blue-200 dark:border-blue-900">
                  <h4 className="font-semibold text-base xs:text-lg">
                    {exp.role} <span className="text-gray-500 text-xs xs:text-base">({exp.dates})</span>
                  </h4>
                  <p className="italic mb-1 xs:mb-2 text-xs xs:text-base text-blue-700 dark:text-blue-300">
                    {exp.company} · {exp.location}
                  </p>
                  <ul className="list-disc list-inside ml-3 xs:ml-5 space-y-1">
                    {exp.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Projects in two columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {/* Education */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow p-4 xs:p-5 sm:p-7 border-l-4 border-teal-400/10 dark:border-teal-400/10">
              <h3 className="flex items-center text-lg xs:text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2 xs:mb-3 sm:mb-4">
                <IconWrap color="from-teal-200 to-teal-400 dark:from-teal-700 dark:to-teal-500"><BookOpen className="text-teal-500" size={20} /></IconWrap>
                Education
              </h3>
              <div className="space-y-3 xs:space-y-4 text-gray-700 dark:text-gray-300 text-xs xs:text-sm sm:text-base">
                {profile.education.map((edu, idx) => (
                  <div key={idx} className="bg-gray-50 dark:bg-gray-900/20 rounded-lg p-3 xs:p-4 shadow-inner">
                    <h4 className="font-semibold text-base xs:text-lg">{edu.degree}</h4>
                    <p className="italic text-blue-700 dark:text-blue-300">{edu.school} · {edu.year}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow p-4 xs:p-5 sm:p-7 border-l-4 border-yellow-400/10 dark:border-yellow-400/10">
              <h3 className="flex items-center text-lg xs:text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2 xs:mb-3 sm:mb-4">
                <IconWrap color="from-yellow-200 to-yellow-400 dark:from-yellow-700 dark:to-yellow-500"><Globe className="text-yellow-500" size={20} /></IconWrap>
                Projects
              </h3>
              <ul className="list-disc list-inside space-y-1 xs:space-y-2 text-gray-700 dark:text-gray-300 text-xs xs:text-sm sm:text-base">
                {profile.projects.map((pj, idx) => (
                  <li key={idx}> <strong>{pj.title}:</strong> {pj.description}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact CTA Card */}
          {showContact ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 xs:p-6 sm:p-8 text-center border-t-4 border-blue-400/10 dark:border-blue-400/20">
              <form
                onSubmit={handleSubmit}
                className="space-y-3 xs:space-y-4 sm:space-y-5 mx-auto w-full"
                style={{ maxWidth: "420px" }}
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 xs:px-5 py-2 xs:py-3 border-2 border-blue-100 dark:border-blue-900 rounded-lg shadow-inner focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-700 transition-all bg-gray-50 dark:bg-gray-900/50 text-gray-800 dark:text-gray-100 text-xs xs:text-sm sm:text-base"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 xs:px-5 py-2 xs:py-3 border-2 border-blue-100 dark:border-blue-900 rounded-lg shadow-inner focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-700 transition-all bg-gray-50 dark:bg-gray-900/50 text-gray-800 dark:text-gray-100 text-xs xs:text-sm sm:text-base"
                  required
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 xs:px-5 py-2 xs:py-3 border-2 border-blue-100 dark:border-blue-900 rounded-lg shadow-inner focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-700 transition-all bg-gray-50 dark:bg-gray-900/50 text-gray-800 dark:text-gray-100 text-xs xs:text-sm sm:text-base"
                  rows={4}
                  required
                />
                <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                  <button
                    type="submit"
                    className="flex-1 px-4 xs:px-6 py-2 xs:py-3 bg-blue-600 text-white rounded-full font-semibold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition text-xs xs:text-base"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 px-4 xs:px-6 py-2 xs:py-3 bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 rounded-full font-semibold shadow hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none transition text-xs xs:text-base"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 xs:p-6 sm:p-8 text-center">
              <button
                onClick={() => setShowContact(true)}
                className="px-5 xs:px-7 py-2 xs:py-3 bg-blue-600 text-white rounded-full font-semibold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition text-xs xs:text-base"
              >
                Contact Me
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

PublicProfile.propTypes = {
  profile: PropTypes.shape({
    photoUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    about: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string,
    services: PropTypes.arrayOf(PropTypes.string).isRequired,
    skills: PropTypes.arrayOf(PropTypes.string).isRequired,
    featured: PropTypes.arrayOf(PropTypes.string).isRequired,
    activity: PropTypes.arrayOf(PropTypes.string).isRequired,
    experience: PropTypes.arrayOf(
      PropTypes.shape({
        role: PropTypes.string.isRequired,
        dates: PropTypes.string.isRequired,
        company: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        bullets: PropTypes.arrayOf(PropTypes.string).isRequired,
      })
    ).isRequired,
    education: PropTypes.arrayOf(
      PropTypes.shape({
        degree: PropTypes.string.isRequired,
        school: PropTypes.string.isRequired,
        year: PropTypes.string.isRequired,
      })
    ).isRequired,
    projects: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default PublicProfile;