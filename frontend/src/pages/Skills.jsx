import { useState } from "react";
import { FiPlus, FiStar, FiCheckCircle } from "react-icons/fi";
import { FaRegLightbulb } from "react-icons/fa";
import PropTypes from "prop-types";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const SkillsPage = ({ userRole }) => {
  // eslint-disable-next-line no-unused-vars
  const [skills, setSkills] = useState([
    { id: 1, name: "React.js", level: "Advanced", endorsements: 23 },
    { id: 2, name: "Python", level: "Intermediate", endorsements: 17 },
    { id: 3, name: "Django", level: "Intermediate", endorsements: 12 },
    { id: 4, name: "Machine Learning", level: "Beginner", endorsements: 7 },
  ]);

  const [isOpen, setIsOpen] = useState(true);

  // Recommended skills list
  const recommendedSkills = ["Next.js", "TypeScript", "GraphQL", "AWS"];

  // Calculate total endorsements and top endorsed skill
  const totalEndorsements = skills.reduce(
    (sum, skill) => sum + skill.endorsements,
    0
  );
  const topSkill = skills.reduce((prev, curr) =>
    curr.endorsements > prev.endorsements ? curr : prev
  );

  return (
    <div className="flex min-h-screen">
      <Sidebar userRole={userRole} isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className={`min-h-screen p-8 transition-colors ${
          isOpen ? "ml-64" : "ml-16"
        } bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white`}
      >
        <Header userRole={userRole} />
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Column */}
          <div className="w-full md:w-2/3 space-y-6">
            {/* Your Skills Section */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Your Skills</h2>
              <div className="space-y-4">
                {skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-4 rounded-lg"
                  >
                    <div>
                      <h3 className="text-lg font-medium">{skill.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Level: {skill.level}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-blue-500 flex items-center">
                        <FiStar className="mr-1" /> {skill.endorsements}{" "}
                        Endorsements
                      </span>
                      <button className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-blue-700 transition">
                        Endorse
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button className="flex items-center gap-2 mt-4 text-blue-600 hover:text-blue-700">
                <FiPlus /> Add New Skill
              </button>
            </div>
            {/* Recommended Skills Section */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <FaRegLightbulb className="mr-2 text-yellow-500" /> Recommended
                Skills
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {recommendedSkills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg flex justify-between items-center"
                  >
                    <span>{skill}</span>
                    <button className="bg-green-500 text-white px-2 py-1 rounded-md text-xs hover:bg-green-600 transition">
                      <FiCheckCircle />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: New Additional Content */}
          <div className="w-full md:w-1/3 space-y-6">
            {/* Skill Insights Card */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Skill Insights</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                You have received a total of{" "}
                <span className="font-bold">{totalEndorsements}</span>{" "}
                endorsements.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Your top endorsed skill is{" "}
                <span className="font-bold">{topSkill.name}</span> with{" "}
                <span className="font-bold">{topSkill.endorsements}</span>{" "}
                endorsements.
              </p>
              <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                Improve Your Skills
              </button>
            </div>
            {/* Skill Improvement Tips Card */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">
                Skill Improvement Tips
              </h2>
              <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <li>Engage with peers to gain more endorsements.</li>
                <li>Join relevant groups and discussions.</li>
                <li>Take online courses to level up.</li>
                <li>Showcase your projects and achievements.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

SkillsPage.propTypes = {
  userRole: PropTypes.string,
};

export default SkillsPage;
