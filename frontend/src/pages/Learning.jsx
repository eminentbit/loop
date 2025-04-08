import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import PropTypes from "prop-types";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { DarkModeContext } from "@/components/DarkModeContext";
// import "react-circular-progressbar/dist/styles.css";

function LearningPage({ userRole }) {
  const [isOpen, setIsOpen] = useState(true);
  const { isDarkMode } = useContext(DarkModeContext);

  // ─── Dashboard state ─────────────────────────────────────────────────────
  const [overallProgress, setOverallProgress] = useState(0);
  const [enrolled, setEnrolled]           = useState(0);
  const [completed, setCompleted]         = useState(0);
  const [hours, setHours]                 = useState(0);
  const [quizzes, setQuizzes]             = useState(0);
  const [userCourses, setUserCourses]     = useState([]);
  const [streakMap, setStreakMap]         = useState({});
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState(null);

  // ─── Fetch on mount ──────────────────────────────────────────────────────
  useEffect(() => {
    async function fetchDashboard() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          "http://localhost:8000/api/learning/dashboard/",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) throw new Error(`Server responded ${res.status}`);
        const data = await res.json();

        // Stats
        setOverallProgress(data.overall_progress);
        setEnrolled(data.enrolled);
        setCompleted(data.completed);
        setHours(data.hours);
        setQuizzes(data.quizzes);

        // Courses (flatten Enrollment → Course)
        const courses = data.courses.map(({ course }) => ({
          title: course.title,
          image: course.image_url || course.image,
        }));
        setUserCourses(courses);

        // Streak (array → map for quick lookup)
        const streakObj = {};
        data.streak.forEach(({ day, active }) => {
          streakObj[day] = active;
        });
        setStreakMap(streakObj);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading…
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-red-500 text-center mt-8">
        Error loading dashboard: {error}
      </div>
    );
  }

  // ─── Constants ──────────────────────────────────────────────────────────
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  // keep your static “Trending This Week” here
  const trendingCourses = [
    {
      title: "Intro to JavaScript",
      image:
        "https://tse3.mm.bing.net/th?id=OIP.7_ojbVQQu1aoICcsmIWV0AHaEK&w=266&h=266&c=7",
    },
    {
      title: "CSS Mastery",
      image:
        "https://tse4.mm.bing.net/th?id=OIP.QTKdgqg26vaSNV9KXHbJZgHaEK&w=266&h=266&c=7",
    },
    {
      title: "Node.js for Beginners",
      image:
        "https://tse4.mm.bing.net/th?id=OIP.tpwkUkFsa02d1XfS8fKG_wHaEK&w=266&h=266&c=7",
    },
  ];

  return (
    <div
      className={`flex min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Sidebar
        userRole={userRole}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isDarkMode={isDarkMode}
      />
      <div
        className={`${
          isOpen ? "ml-64" : "ml-20"
        } flex-grow transition-all duration-300`}
      >
        <Header isDarkMode={isDarkMode} userRole={userRole} />

        <div className="px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overall Performance */}
              <div
                className={`rounded-xl shadow-lg p-6 flex flex-col items-center ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <h2 className="text-2xl font-semibold mb-4">
                  Overall Performance
                </h2>
                <div className="w-48 h-24">
                  <CircularProgressbar
                    value={overallProgress}
                    text={`${overallProgress}%`}
                    strokeWidth={8}
                    circleRatio={0.5}
                    styles={buildStyles({
                      rotation: 0.75,
                      strokeLinecap: "butt",
                      textSize: "16px",
                      pathColor: isDarkMode ? "#60a5fa" : "#3b82f6",
                      textColor: isDarkMode ? "#ffffff" : "#1f2937",
                      trailColor: isDarkMode ? "#4b5563" : "#d1d5db",
                    })}
                  />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                  <StatCircle
                    title="Enrolled"
                    value={enrolled}
                    borderColor={
                      isDarkMode ? "border-blue-400" : "border-blue-500"
                    }
                    isDarkMode={isDarkMode}
                  />
                  <StatCircle
                    title="Completed"
                    value={completed}
                    borderColor={
                      isDarkMode ? "border-green-400" : "border-green-500"
                    }
                    isDarkMode={isDarkMode}
                  />
                  <StatCircle
                    title="Hours"
                    value={hours}
                    borderColor={
                      isDarkMode ? "border-purple-400" : "border-purple-500"
                    }
                    isDarkMode={isDarkMode}
                  />
                  <StatCircle
                    title="Quizzes"
                    value={quizzes}
                    borderColor={
                      isDarkMode ? "border-red-400" : "border-red-500"
                    }
                    isDarkMode={isDarkMode}
                  />
                </div>
              </div>

              {/* Your Courses */}
              <div
                className={`rounded-xl shadow-lg p-6 ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <h2 className="text-2xl font-semibold mb-6">
                  Your Courses
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userCourses.map((course, idx) => (
                    <CourseCard
                      key={idx}
                      course={course}
                      isDarkMode={isDarkMode}
                    />
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Link
                    to="/courses"
                    className="text-lg font-medium hover:underline"
                    style={{ color: isDarkMode ? "#60a5fa" : "#3b82f6" }}
                  >
                    View More Courses
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Streak */}
              <div
                className={`rounded-xl shadow-lg p-6 ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <h2 className="text-2xl font-semibold mb-4">
                  This Week&apos;s Streak
                </h2>
                <div className="flex justify-around">
                  {weekDays.map((day) => (
                    <div key={day} className="flex flex-col items-center">
                      <span className="text-sm font-medium">{day}</span>
                      <div className="mt-2">
                        <FlameIcon active={streakMap[day]} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trending This Week */}
              <div
                className={`rounded-xl shadow-lg p-6 ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <h2 className="text-2xl font-bold mb-4">
                  Trending This Week
                </h2>
                <div className="space-y-4">
                  {trendingCourses.map((c, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-4 p-4 rounded-lg border ${
                        isDarkMode
                          ? "border-gray-700 hover:shadow-gray-600"
                          : "border-gray-200 hover:shadow-md"
                      } transition-shadow duration-300`}
                    >
                      <img
                        src={c.image}
                        alt={c.title}
                        className="w-16 h-16 rounded-lg"
                      />
                      <div>
                        <h3 className="font-semibold text-lg">
                          {c.title}
                        </h3>
                        <p
                          className={`text-sm ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          Short description
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

LearningPage.propTypes = {
  userRole: PropTypes.string.isRequired,
};

// ─── Utility Components ─────────────────────────────────────────────────

function StatCircle({ title, value, borderColor, isDarkMode }) {
  return (
    <div
      className={`flex flex-col items-center justify-center w-20 h-20 rounded-full border-2 ${borderColor} p-2`}
    >
      <span
        className={`text-xl font-bold ${
          isDarkMode ? "text-white" : "text-gray-800"
        }`}
      >
        {value}
      </span>
      <span
        className={`text-xs text-center ${
          isDarkMode ? "text-gray-400" : "text-gray-600"
        }`}
      >
        {title}
      </span>
    </div>
  );
}

StatCircle.propTypes = {
  title: PropTypes.string,
  value: PropTypes.number,
  borderColor: PropTypes.string,
  isDarkMode: PropTypes.bool,
};

function FlameIcon({ active }) {
  return (
    <span className={active ? "text-red-500 text-2xl" : "text-gray-300 text-2xl"}>
      🔥
    </span>
  );
}

FlameIcon.propTypes = {
  active: PropTypes.bool,
};

function CourseCard({ course, isDarkMode }) {
  return (
    <div
      className={`rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden ${
        isDarkMode ? "bg-gray-700" : "bg-white"
      }`}
    >
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {course.title}
        </h3>
        <Link
          to="/courses"
          className="mt-3 inline-block font-medium hover:underline"
          style={{ color: isDarkMode ? "#60a5fa" : "#3b82f6" }}
        >
          View Course
        </Link>
      </div>
    </div>
  );
}

CourseCard.propTypes = {
  course: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
  }),
  isDarkMode: PropTypes.bool,
};

export default LearningPage;
