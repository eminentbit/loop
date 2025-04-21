import { useState, useEffect } from "react";
import { FiPlus, FiStar, FiCheckCircle, FiX } from "react-icons/fi";
import { FaRegLightbulb } from "react-icons/fa";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

// Skill descriptions for tooltips
const recommendedSkillsData = [
  { name: "Next.js", desc: "React framework for server-side rendering & static sites." },
  { name: "TypeScript", desc: "JavaScript with static typing for safer code." },
  { name: "GraphQL", desc: "Flexible API query language & runtime." },
  { name: "AWS", desc: "Cloud computing services for scalable apps." },
];

const SkillsPage = ({ userRole }) => {
  const [skills, setSkills] = useState([
    { id: 1, name: "React.js", level: "Advanced", endorsements: 23 },
    { id: 2, name: "Python", level: "Intermediate", endorsements: 17 },
    { id: 3, name: "Django", level: "Intermediate", endorsements: 12 },
    { id: 4, name: "Machine Learning", level: "Beginner", endorsements: 7 },
  ]);
  const [isOpen, setIsOpen] = useState(() => {
    const storedValue = localStorage.getItem("sidebarOpen");
    return storedValue ? JSON.parse(storedValue) : true;
  });
  const [showAddModal, setShowAddModal] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    if (localStorage.theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []);
  const [newSkill, setNewSkill] = useState({ name: "", level: "Beginner" });
  const [endorsingId, setEndorsingId] = useState(null);
  const [tooltip, setTooltip] = useState({ show: false, text: "", x: 0, y: 0 });

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(isOpen));
  }, [isOpen]);

  // Modal logic
  const openModal = () => {
    setNewSkill({ name: "", level: "Beginner" });
    setShowAddModal(true);
  };
  const closeModal = () => setShowAddModal(false);

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkill.name.trim()) return;
    setSkills([
      ...skills,
      {
        id: skills.length + 1,
        name: newSkill.name,
        level: newSkill.level,
        endorsements: 0,
      },
    ]);
    setShowAddModal(false);
  };

  // Endorsement logic
  const handleEndorse = (id) => {
    setEndorsingId(id);
    setSkills((prev) =>
      prev.map((skill) =>
        skill.id === id
          ? { ...skill, endorsements: skill.endorsements + 1 }
          : skill
      )
    );
    setTimeout(() => setEndorsingId(null), 600);
  };

  // Tooltip logic
  const showTooltip = (desc, e) => {
    setTooltip({
      show: true,
      text: desc,
      x: e.currentTarget.getBoundingClientRect().left + window.scrollX + 60,
      y: e.currentTarget.getBoundingClientRect().top + window.scrollY - 10,
    });
  };
  const hideTooltip = () => setTooltip({ ...tooltip, show: false });

  const totalEndorsements = skills.reduce(
    (sum, skill) => sum + skill.endorsements,
    0
  );
  const topSkill = skills.reduce((prev, curr) =>
    curr.endorsements > prev.endorsements ? curr : prev
  );

  return (
    <div className="flex min-h-screen bg-neutral-100 dark:bg-gray-950 transition-colors duration-300">
      <Sidebar userRole={userRole} isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Modal */}
      {showAddModal && (
        <div className="fixed z-30 inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <form
            onSubmit={handleAddSkill}
            className="relative w-full max-w-xs sm:max-w-sm mx-auto p-6 rounded-2xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-2xl border border-gray-200 dark:border-gray-800 animate-fadeIn"
          >
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-400 hover:text-red-500"
              onClick={closeModal}
              aria-label="Close modal"
            >
              <FiX size={22} />
            </button>
            <h3 className="text-lg font-bold mb-4">Add New Skill</h3>
            <input
              className="w-full mb-3 px-3 py-2 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-700"
              placeholder="Skill name"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              required
              autoFocus
            />
            <label className="block mb-2 text-sm font-medium">Level:</label>
            <select
              className="w-full mb-4 px-2 py-2 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
              value={newSkill.level}
              onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
            <button
              className="w-full py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-500 hover:from-blue-700 hover:to-purple-700 transition"
              type="submit"
            >
              Add Skill
            </button>
          </form>
        </div>
      )}

      {/* Tooltip */}
      {tooltip.show && (
        <div
          className="fixed z-40 px-3 py-2 bg-gray-900 border border-gray-700 text-white text-xs rounded shadow-lg pointer-events-none animate-fadeIn"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            whiteSpace: "nowrap",
          }}
        >
          {tooltip.text}
        </div>
      )}

      {/* Main Content */}
      <main
        className={`flex-1 min-h-screen px-4 sm:px-8 py-8 transition-all duration-300 ${
          isOpen ? "ml-64" : "ml-16"
        }`}
      >
        <Header userRole={userRole} />
        <div className="flex flex-col md:flex-row gap-8 mt-6">
          {/* Left Column */}
          <section className="w-full md:w-2/3 space-y-8">
            {/* Your Skills */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl hover:shadow-2xl rounded-2xl p-8 group relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 pointer-events-none blur-xl z-0" style={{background:'radial-gradient(ellipse, #6366F1 30%, transparent 70%)'}} />
              <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-800 dark:text-white">
                <FiStar className="mr-2 text-yellow-400" /> Your Skills
              </h2>
              <div className="space-y-5 z-10 relative">
                {skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 px-5 py-4 rounded-xl shadow group-hover:shadow-lg border border-gray-200 dark:border-gray-700 transition"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{skill.name}</h3>
                      <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 border border-blue-200 dark:border-blue-800">
                        {skill.level}
                      </span>
                    </div>
                    <div className="flex items-center gap-5">
                      <span className="flex items-center text-blue-600 dark:text-blue-300 font-semibold">
                        <FiStar className="mr-1" /> {skill.endorsements}
                        <span className="ml-1 text-xs font-normal text-gray-500 dark:text-gray-300">Endorsements</span>
                      </span>
                      <button
                        className={`bg-gradient-to-r from-blue-600 to-purple-500 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium shadow transition-all duration-150 flex items-center ${
                          endorsingId === skill.id ? "scale-110 ring-2 ring-green-400 dark:ring-green-600" : ""
                        }`}
                        onClick={() => handleEndorse(skill.id)}
                        aria-label={`Endorse ${skill.name}`}
                        disabled={endorsingId === skill.id}
                      >
                        {endorsingId === skill.id ? (
                          <span className="flex items-center gap-1 animate-bounce">
                            <FiCheckCircle /> Endorsed!
                          </span>
                        ) : (
                          "Endorse"
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="flex items-center gap-2 mt-6 text-base font-semibold text-blue-700 dark:text-blue-300 hover:text-purple-600 dark:hover:text-purple-300 transition-all group"
                onClick={openModal}
              >
                <FiPlus className="text-xl" /> Add New Skill
              </button>
            </div>

            {/* Recommended Skills */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl hover:shadow-2xl rounded-2xl p-8 transition">
              <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-800 dark:text-white">
                <FaRegLightbulb className="mr-2 text-yellow-400" /> Recommended Skills
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {recommendedSkillsData.map((skill, index) => (
                  <div
                    key={index}
                    className="relative bg-blue-50 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-700 p-4 rounded-xl flex justify-between items-center shadow border border-blue-100 dark:border-gray-700 transition"
                    onMouseEnter={(e) => showTooltip(skill.desc, e)}
                    onMouseLeave={hideTooltip}
                  >
                    <span className="font-medium text-gray-800 dark:text-gray-100">{skill.name}</span>
                    <button className="bg-green-500 hover:bg-green-600 text-white px-2.5 py-1.5 rounded-full shadow transition">
                      <FiCheckCircle className="text-md" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Right Column */}
          <aside className="w-full md:w-1/3 space-y-8">
            {/* Skill Insights */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl hover:shadow-2xl rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-tr from-purple-200 via-blue-200 to-transparent dark:from-blue-900 dark:via-purple-900 dark:to-transparent rounded-full opacity-25 pointer-events-none z-0" />
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white z-10 relative">Skill Insights</h2>
              <p className="text-base text-gray-700 dark:text-gray-200 mb-2 z-10 relative">
                <span className="font-semibold text-blue-700 dark:text-blue-300">{totalEndorsements}</span> total endorsements
              </p>
              <p className="text-base text-gray-700 dark:text-gray-200 mb-5 z-10 relative">
                Top skill:{" "}
                <span className="font-semibold text-purple-700 dark:text-purple-300">{topSkill.name}</span> ({topSkill.endorsements} endorsements)
              </p>
            

<Link to="/skill-test">
  <button className="w-full mt-2 py-2 rounded-lg text-white font-bold bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 shadow transition-all">
    Improve Your Skills
  </button>
</Link>

            </div>

            {/* Skill Improvement Tips */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl hover:shadow-2xl rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                Skill Improvement Tips
              </h2>
              <ul className="list-disc pl-5 text-base text-gray-700 dark:text-gray-300 space-y-2">
                <li>Engage with peers to gain more endorsements.</li>
                <li>Join relevant groups and discussions.</li>
                <li>Take online courses to level up.</li>
                <li>Showcase your projects and achievements.</li>
                <li>
                  <span className="font-semibold">Tip:</span> Keep your skill profile up-to-date for more visibility.
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </main>
      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s cubic-bezier(.4,0,.2,1) both;
        }
      `}</style>
    </div>
  );
};

SkillsPage.propTypes = {
  userRole: PropTypes.string,
};

export default SkillsPage;