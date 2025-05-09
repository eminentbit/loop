import { useContext, useState, useEffect } from "react";
import { DarkModeContext } from "@/context/DarkModeContext";
import PropTypes from "prop-types";
import ProfilePic from "../assets/default-profile.png";
import {
  MapPin,
  Mail,
  Phone,
  Award,
  Briefcase,
  FileText,
  CheckCircle,
  Link as LinkIcon,
  Edit,
  Save,
  X,
  PlusCircle,
  Trash2,
} from "lucide-react";
import Navbar from "src/components/job.page.component/ui/Navbar";
import axios from "axios";
import { capitalizeFirstLetter } from "src/utils/Capitalize";

const ProfilePage = () => {
  const { isDarkMode } = useContext(DarkModeContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState({
    personal: false,
    skills: false,
    certifications: false,
    experience: false,
    portfolio: false,
  });

  // Form states for editing
  const [personalForm, setPersonalForm] = useState({});
  const [newSkill, setNewSkill] = useState("");
  const [newCertification, setNewCertification] = useState("");
  const [experienceForm, setExperienceForm] = useState({});
  const [portfolioForm, setPortfolioForm] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/profile`,
          { withCredentials: true }
        );
        const data = response.data.user;
        console.log(data);

        setUserData(data);
        setPersonalForm({
          name: data.fullName || "N/A",
          title: data.title || "N/A",
          summary: data.about || "N/A",
          location: data.location || "N/A",
          email: data.email,
          phone: data.phoneNumber || "N/A",
          countryCode: data.phoneNumber || "CMR",
          skills: data.skills || [],
          certifications: data.certifications || [],
          experiences: data.experiences || [],
          avatar: data.profile || "",
          ...data,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    console.log("Personal form:", personalForm);
  }, [personalForm]);

  // Toggle edit mode for a specific section
  const toggleEditMode = (section) => {
    setEditMode((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));

    // Reset form data when canceling edit
    if (editMode[section]) {
      if (section === "personal") {
        setPersonalForm({
          name: userData.fullNnme,
          title: userData.title || "N/A",
          summary: userData.about || "N/A",
          location: userData.location || "N/A",
          email: userData.email,
          phone: userData.phonenumber || "N/A",
        });
      }
    }
  };

  // Handle changes in form fields
  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setPersonalForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save personal info changes
  const savePersonalInfo = () => {
    setUserData((prev) => ({
      ...prev,
      ...personalForm,
    }));
    toggleEditMode("personal");
  };

  // Add new skill
  const addSkill = () => {
    if (newSkill.trim() !== "") {
      setUserData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  // Remove skill
  const removeSkill = (index) => {
    setUserData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  // Add new certification
  const addCertification = () => {
    if (newCertification.trim() !== "") {
      setUserData((prev) => ({
        ...prev,
        certifications: [...prev.certifications, newCertification.trim()],
      }));
      setNewCertification("");
    }
  };

  // Remove certification
  const removeCertification = (index) => {
    setUserData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  };

  // Edit experience
  const startEditExperience = (exp) => {
    setExperienceForm({
      id: exp.id,
      role: exp.role,
      company: exp.company,
      duration: exp.duration,
      description: exp.description,
    });
    toggleEditMode("experience");
  };

  const handleExperienceChange = (e) => {
    const { name, value } = e.target;
    setExperienceForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveExperience = () => {
    setUserData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) =>
        exp.id === experienceForm.id ? experienceForm : exp
      ),
    }));
    toggleEditMode("experience");
  };

  // Add new experience
  const addExperience = () => {
    const newExp = {
      id: `exp-${Date.now()}`,
      role: "New Position",
      company: "Company Name",
      duration: "Start - Present",
      description: "Role description",
    };

    setUserData((prev) => ({
      ...prev,
      experiences: [...prev.experiences, newExp],
    }));

    setExperienceForm(newExp);
    toggleEditMode("experience");
  };

  // Remove experience
  const removeExperience = (id) => {
    setUserData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((exp) => exp.id !== id),
    }));
  };

  // Edit portfolio item
  const startEditPortfolio = (item) => {
    setPortfolioForm({
      id: item.id,
      title: item.title,
      image: item.image,
      link: item.link,
    });
    toggleEditMode("portfolio");
  };

  const handlePortfolioChange = (e) => {
    const { name, value } = e.target;
    setPortfolioForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const savePortfolio = () => {
    setUserData((prev) => ({
      ...prev,
      portfolio: prev.portfolio.map((item) =>
        item.id === portfolioForm.id ? portfolioForm : item
      ),
    }));
    toggleEditMode("portfolio");
  };

  // Add new portfolio item
  const addPortfolioItem = () => {
    const newItem = {
      id: `port-${Date.now()}`,
      title: "New Project",
      image: "/api/placeholder/400/300",
      link: "#",
    };

    setUserData((prev) => ({
      ...prev,
      portfolio: [...prev.portfolio, newItem],
    }));

    setPortfolioForm(newItem);
    toggleEditMode("portfolio");
  };

  // Remove portfolio item
  const removePortfolioItem = (id) => {
    setUserData((prev) => ({
      ...prev,
      portfolio: prev.portfolio.filter((item) => item.id !== id),
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen w-full flex transition-all duration-300 ease-in-out ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-950 via-gray-900 to-blue-900"
          : "bg-gradient-to-br from-blue-100 via-gray-50 to-white"
      }`}
    >
      <div className="flex-1 min-h-screen transition-colors duration-300 ">
        <Navbar />

        {/* Profile Header */}
        <div
          className={`
            shadow-xl rounded-2xl p-8 mb-8 mx-4 flex flex-col sm:flex-row items-center gap-8 border mt-20
            ${
              isDarkMode
                ? "bg-gray-900/80 border-gray-800"
                : "bg-white/90 border-blue-200"
            }
            backdrop-blur-md
            animate-fadeIn
          `}
        >
          {!editMode.personal ? (
            <>
              <div className="relative flex-shrink-0">
                <img
                  src={
                    userData.profile != "undefined"
                      ? userData.profile
                      : ProfilePic
                  }
                  alt="User Avatar"
                  className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-inner"
                />
                {userData.status?.toLowerCase() === "available" && (
                  <span className="absolute bottom-0 right-0 inline-flex">
                    <span className="animate-ping absolute inline-flex h-5 w-5 rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex h-5 w-5 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></span>
                  </span>
                )}
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h1 className="flex items-center justify-center sm:justify-start text-4xl font-semibold gap-2">
                  {/* <UserIcon className="w-7 h-7 text-blue-600 dark:text-blue-400" /> */}
                  {userData.fullName}
                </h1>
                <p className="mt-1 text-lg text-gray-500 dark:text-gray-400">
                  {capitalizeFirstLetter(userData.role) || "N/A"}
                </p>
                <p className="mt-2 text-sm font-medium text-green-500">
                  ● {userData.status || "N/A"}
                </p>

                <button
                  onClick={() => toggleEditMode("personal")}
                  className={`mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-md font-medium text-sm transition-shadow duration-200
                ${
                  isDarkMode
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                    : "bg-blue-100 hover:bg-blue-200 text-blue-800 shadow-sm"
                }
              `}
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>
              </div>
            </>
          ) : (
            <div className="w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Edit Profile</h2>
                <div className="flex gap-3">
                  <button
                    onClick={savePersonalInfo}
                    className="flex items-center gap-2 px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white text-sm font-medium transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={() => toggleEditMode("personal")}
                    className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={personalForm.name}
                    onChange={handlePersonalChange}
                    className="w-full px-3 py-2 border rounded-md bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={personalForm.title}
                    onChange={handlePersonalChange}
                    className="w-full px-3 py-2 border rounded-md bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={personalForm.email}
                    onChange={handlePersonalChange}
                    className="w-full px-3 py-2 border rounded-md bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={personalForm.phone}
                    onChange={handlePersonalChange}
                    className="w-full px-3 py-2 border rounded-md bg-gray-800 border-gray-700 text-white"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={personalForm.location}
                    onChange={handlePersonalChange}
                    className="w-full px-3 py-2 border rounded-md bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  About Me
                </label>
                <textarea
                  name="summary"
                  value={personalForm.summary}
                  onChange={handlePersonalChange}
                  rows="4"
                  className="w-full px-3 py-2 border rounded-md bg-gray-800 border-gray-700 text-white"
                ></textarea>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10 px-4 animate-fadeIn">
          {/* About Section */}
          <section
            className={`
              shadow-xl rounded-2xl p-8 border
              ${
                isDarkMode
                  ? "bg-gray-900/80 border-gray-800"
                  : "bg-white/90 border-blue-200"
              }
              backdrop-blur-md
              transition-all
            `}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <FileText
                  className="text-blue-600 dark:text-blue-400"
                  size={22}
                />
                About Me
              </h2>
            </div>

            <p className="mb-4 text-base">{userData.summary}</p>

            <div className="mb-6">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Mail className="text-blue-500" size={18} /> Contact Information
              </h3>
              <div className="flex flex-col gap-1 text-gray-500 dark:text-gray-400 text-sm pl-1">
                <span className="flex items-center gap-1">
                  <MapPin className="inline mr-1 text-blue-400" size={16} />{" "}
                  {userData.location}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="inline mr-1 text-blue-400" size={16} />
                  {userData.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="inline mr-1 text-blue-400" size={16} />
                  {userData.phone}
                </span>
              </div>
            </div>

            {/* Skills Section */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <CheckCircle className="text-blue-500" size={18} /> Skills
                </h3>
                <button
                  onClick={() => toggleEditMode("skills")}
                  className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium
                    ${
                      isDarkMode
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-blue-100 hover:bg-blue-200 text-blue-800"
                    }`}
                >
                  {editMode.skills ? <Save size={14} /> : <Edit size={14} />}
                  {editMode.skills ? "Save" : "Edit"}
                </button>
              </div>

              {editMode.skills && (
                <div className="mb-3 flex">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add new skill"
                    className="px-3 py-2 border rounded-l-md flex-1 bg-gray-800 border-gray-700 text-white"
                  />
                  <button
                    onClick={addSkill}
                    className="px-3 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
                  >
                    <PlusCircle size={16} />
                  </button>
                </div>
              )}

              <ul className="flex flex-wrap gap-2 mt-2">
                {userData.skills
                  ? userData.skills.map((skill, index) => (
                      <li
                        key={index}
                        className={`px-3 py-1 rounded-full text-sm font-semibold shadow transition flex items-center
          ${
            isDarkMode
              ? "bg-blue-900 text-blue-300"
              : "bg-blue-100 text-blue-800"
          }`}
                      >
                        {skill}
                        {editMode.skills && (
                          <button
                            onClick={() => removeSkill(index)}
                            className="ml-2 text-red-400 hover:text-red-500"
                          >
                            <X size={14} />
                          </button>
                        )}
                      </li>
                    ))
                  : editMode.skills && (
                      <li className="text-sm text-gray-500 italic">
                        No skills yet. Add a skill to get started.
                      </li>
                    )}
              </ul>
            </div>

            {/* Certifications Section */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Award className="text-blue-500" size={18} /> Certifications
                </h3>
                <button
                  onClick={() => toggleEditMode("certifications")}
                  className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium
                    ${
                      isDarkMode
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-blue-100 hover:bg-blue-200 text-blue-800"
                    }`}
                >
                  {editMode.certifications ? (
                    <Save size={14} />
                  ) : (
                    <Edit size={14} />
                  )}
                  {editMode.certifications ? "Save" : "Edit"}
                </button>
              </div>

              {editMode.certifications && (
                <div className="mb-3 flex">
                  <input
                    type="text"
                    value={newCertification}
                    onChange={(e) => setNewCertification(e.target.value)}
                    placeholder="Add new certification"
                    className="px-3 py-2 border rounded-l-md flex-1 bg-gray-800 border-gray-700 text-white"
                  />
                  <button
                    onClick={addCertification}
                    className="px-3 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
                  >
                    <PlusCircle size={16} />
                  </button>
                </div>
              )}

              <ul className="flex flex-col gap-2 mt-2">
                {userData.certifications &&
                  userData.certifications.map((cert, index) => (
                    <li
                      key={index}
                      className={`flex items-center justify-between text-sm pl-1
                      ${isDarkMode ? "text-blue-200" : "text-blue-800"}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-400 inline-block"></span>
                        {cert}
                      </div>
                      {editMode.certifications && (
                        <button
                          onClick={() => removeCertification(index)}
                          className="text-red-400 hover:text-red-500"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </li>
                  ))}
              </ul>
            </div>
          </section>

          {/* Experience & Portfolio Section */}
          <section
            className={`
              shadow-xl rounded-2xl p-8 border
              ${
                isDarkMode
                  ? "bg-gray-900/80 border-gray-800"
                  : "bg-white/90 border-blue-200"
              }
              backdrop-blur-md
              transition-all
            `}
          >
            {/* Experience Section */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Briefcase
                  className="text-blue-600 dark:text-blue-400"
                  size={22}
                />
                Experience
              </h2>

              {!editMode.experience && (
                <button
                  onClick={addExperience}
                  className={`flex items-center gap-1 px-3 py-1 rounded text-sm font-medium
                    ${
                      isDarkMode
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-blue-100 hover:bg-blue-200 text-blue-800"
                    }`}
                >
                  <PlusCircle size={16} /> Add
                </button>
              )}
            </div>

            {editMode.experience ? (
              <div className="mb-6">
                <div className="flex justify-between mb-4">
                  <h3 className="text-lg font-semibold">Edit Experience</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={saveExperience}
                      className="flex items-center gap-1 px-3 py-1 rounded bg-green-600 text-white text-sm"
                    >
                      <Save size={16} /> Save
                    </button>
                    <button
                      onClick={() => toggleEditMode("experience")}
                      className="flex items-center gap-1 px-3 py-1 rounded bg-gray-600 text-white text-sm"
                    >
                      <X size={16} /> Cancel
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="mb-2">
                    <label className="block text-sm font-medium mb-1">
                      Role
                    </label>
                    <input
                      type="text"
                      name="role"
                      value={experienceForm.role}
                      onChange={handleExperienceChange}
                      className="w-full px-3 py-2 border rounded-md bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-sm font-medium mb-1">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={experienceForm.company}
                      onChange={handleExperienceChange}
                      className="w-full px-3 py-2 border rounded-md bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-sm font-medium mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      name="duration"
                      value={experienceForm.duration}
                      onChange={handleExperienceChange}
                      className="w-full px-3 py-2 border rounded-md bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-sm font-medium mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={experienceForm.description}
                      onChange={handleExperienceChange}
                      rows="4"
                      className="w-full px-3 py-2 border rounded-md bg-gray-800 border-gray-700 text-white"
                    ></textarea>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {userData.experiences &&
                  userData.experiences.map((exp) => (
                    <div
                      key={exp.id}
                      className={`
                      mb-6 pb-6 border-b
                      ${isDarkMode ? "border-gray-700" : "border-blue-100"}
                      last:mb-0 last:pb-0 last:border-b-0
                    `}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold">{exp.role}</h3>
                          <p className="text-gray-400">
                            {exp.company} <span className="mx-1">|</span>{" "}
                            {exp.duration}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEditExperience(exp)}
                            className={`p-1 rounded text-sm
                            ${
                              isDarkMode
                                ? "bg-gray-800 hover:bg-gray-700 text-blue-400"
                                : "bg-blue-50 hover:bg-blue-100 text-blue-600"
                            }`}
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => removeExperience(exp.id)}
                            className={`p-1 rounded text-sm
                            ${
                              isDarkMode
                                ? "bg-gray-800 hover:bg-gray-700 text-red-400"
                                : "bg-red-50 hover:bg-red-100 text-red-600"
                            }`}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <p className="mt-2 text-base">{exp.description}</p>
                    </div>
                  ))}
              </>
            )}

            {/* Portfolio Section */}
            <div className="flex justify-between items-center mt-8 mb-4">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <LinkIcon
                  className="text-blue-600 dark:text-blue-400"
                  size={22}
                />
                Portfolio
              </h2>

              {!editMode.portfolio && (
                <button
                  onClick={addPortfolioItem}
                  className={`flex items-center gap-1 px-3 py-1 rounded text-sm font-medium
                    ${
                      isDarkMode
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-blue-100 hover:bg-blue-200 text-blue-800"
                    }`}
                >
                  <PlusCircle size={16} /> Add
                </button>
              )}
            </div>

            {editMode.portfolio ? (
              <div className="mb-6">
                <div className="flex justify-between mb-4">
                  <h3 className="text-lg font-semibold">Edit Portfolio Item</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={savePortfolio}
                      className="flex items-center gap-1 px-3 py-1 rounded bg-green-600 text-white text-sm"
                    >
                      <Save size={16} /> Save
                    </button>
                    <button
                      onClick={() => toggleEditMode("portfolio")}
                      className="flex items-center gap-1 px-3 py-1 rounded bg-gray-600 text-white text-sm"
                    >
                      <X size={16} /> Cancel
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="mb-2">
                    <label className="block text-sm font-medium mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={portfolioForm.title}
                      onChange={handlePortfolioChange}
                      className="w-full px-3 py-2 border rounded-md bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-sm font-medium mb-1">
                      Image URL
                    </label>
                    <input
                      type="text"
                      name="image"
                      value={portfolioForm.image}
                      onChange={handlePortfolioChange}
                      className="w-full px-3 py-2 border rounded-md bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-sm font-medium mb-1">
                      Link URL
                    </label>
                    <input
                      type="text"
                      name="link"
                      value={portfolioForm.link}
                      onChange={handlePortfolioChange}
                      className="w-full px-3 py-2 border rounded-md bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {userData.portfolio &&
                  userData.portfolio.map((item) => (
                    <div
                      key={item.id}
                      className={`
                      block rounded-xl overflow-hidden shadow-lg border transition
                      relative group
                      ${
                        isDarkMode
                          ? "bg-gray-800 hover:bg-gray-700 border-gray-700"
                          : "bg-gray-100 hover:bg-blue-100 border-blue-100"
                      }
                          `}
                    >
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-40 object-cover transition-transform duration-200 group-hover:scale-105"
                        />

                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              startEditPortfolio(item);
                            }}
                            className="p-1 rounded bg-blue-600 text-white"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              removePortfolioItem(item.id);
                            }}
                            className="p-1 rounded bg-red-600 text-white"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      <div className="p-4">
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:text-blue-400 text-sm flex items-center gap-1 mt-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <LinkIcon size={14} /> View Project
                        </a>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </section>
        </div>

        <style>
          {`
.animate-fadeIn {
  animation: fadeIn 0.7s;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(30px);}
  to { opacity: 1; transform: translateY(0);}
}
`}
        </style>
      </div>
    </div>
  );
};

ProfilePage.propTypes = {
  userRole: PropTypes.string.isRequired,
};

export default ProfilePage;
