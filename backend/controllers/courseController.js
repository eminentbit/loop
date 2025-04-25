/**
 * GET /courses/
 * Returns dashboard data for the logged-in user:
 * - overall_progress: average completion %
 * - enrolled: total courses
 * - completed: courses with 100% progress
 * - hours: total hours spent
 * - quizzes: total quizzes taken
 * - courses: array of enrolled course details
 * - streak: last 7 days activity
 */
export const getDashboard = async (req, res) => {
  try {
    const userId = req.userId;

    // Fetch enrollments with course and progress info
    const enrollments = await prisma.enrollment.findMany({
      where: { userId },
      include: {
        course: {
          select: { id: true, title: true, imageUrl: true, image: true },
        },
        progress: true, // assuming progress per enrollment
        timeSpent: true, // assuming hours logged
      },
    });

    // Compute stats
    const totalCourses = enrollments.length;
    const completedCourses = enrollments.filter(
      (e) => e.progress.percentage === 100
    ).length;
    const overallProgress = totalCourses
      ? Math.round(
          enrollments.reduce((sum, e) => sum + e.progress.percentage, 0) /
            totalCourses
        )
      : 0;
    const hours = enrollments.reduce(
      (sum, e) => sum + (e.timeSpent.hours || 0),
      0
    );

    // Count total quizzes taken
    const quizzes = await prisma.quizAttempt.count({
      where: { userId },
    });

    // Prepare courses array (flatten)
    const courses = enrollments.map((e) => ({
      title: e.course.title,
      image_url: e.course.imageUrl || e.course.image,
    }));

    // Build streak (last 7 days)
    const today = new Date();
    const streakData = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      const dayName = date.toLocaleDateString("en-US", { weekday: "short" });

      // Assume activity table logs daily activity
      const activity = await prisma.dailyActivity.findUnique({
        where: { userId_date: { userId, date } },
      });
      streakData.push({ day: dayName, active: !!activity?.active });
    }

    console.log(overallProgress);

    return res.json({
      overall_progress: overallProgress,
      enrolled: totalCourses,
      completed: completedCourses,
      hours,
      quizzes,
      courses,
      streak: streakData,
    });
  } catch (err) {
    console.error("Error fetching dashboard:", err);
    return res.status(500).json({ error: "Server error retrieving dashboard" });
  }
};
