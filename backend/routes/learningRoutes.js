const express = require("express");
const router = express.Router();
const { Course, Enrollment, Streak } = require("../models"); // Import your models

// CREATE Course
router.post("/courses", async (req, res) => {
  try {
    const { title, image_url } = req.body;
    const course = await Course.create({ title, image_url });
    res.status(201).json(course, "Course created successfully");
  } catch (error) {
    console.log(`Error creating course: ${error}`);
    res.status(500).json({ message: "Error creating course", error });
  }
});

// GET all Courses
router.get("/courses", async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error });
  }
});

// GET a single Course by ID
router.get("/courses/:id", async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (course) {
      res.status(200).json(course);
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching course", error });
  }
});

// CREATE Enrollment
router.post("/enrollments", async (req, res) => {
  try {
    const { userId, courseId, completed, hours_spent, quizzes_taken } = req.body;
    const enrollment = await Enrollment.create({ 
      userId, courseId, completed, hours_spent, quizzes_taken 
    });
    res.status(201).json(enrollment);
  } catch (error) {
    res.status(500).json({ message: "Error creating enrollment", error });
  }
});

// GET Enrollments for a specific user
router.get("/enrollments/:userId", async (req, res) => {
  try {
    const enrollments = await Enrollment.findAll({
      where: { userId: req.params.userId },
      include: [Course], // Include course details in the response
    });
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching enrollments", error });
  }
});

// CREATE Streak
router.post("/streaks", async (req, res) => {
  try {
    const { userId, day, active } = req.body;
    const streak = await Streak.create({ userId, day, active });
    res.status(201).json(streak);
  } catch (error) {
    res.status(500).json({ message: "Error creating streak", error });
  }
});

// GET Streak for a specific user
router.get("/streaks/:userId", async (req, res) => {
  try {
    const streaks = await Streak.findAll({
      where: { userId: req.params.userId },
    });
    res.status(200).json(streaks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching streaks", error });
  }
});

// Update Enrollment status
router.put("/enrollments/:id", async (req, res) => {
  try {
    const enrollment = await Enrollment.findByPk(req.params.id);
    if (enrollment) {
      const { completed, hours_spent, quizzes_taken } = req.body;
      await enrollment.update({ completed, hours_spent, quizzes_taken });
      res.status(200).json(enrollment);
    } else {
      res.status(404).json({ message: "Enrollment not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating enrollment", error });
  }
});

// Update Streak status
router.put("/streaks/:id", async (req, res) => {
  try {
    const streak = await Streak.findByPk(req.params.id);
    if (streak) {
      const { active } = req.body;
      await streak.update({ active });
      res.status(200).json(streak);
    } else {
      res.status(404).json({ message: "Streak not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating streak", error });
  }
});

// DELETE Course
router.delete("/courses/:id", async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (course) {
      await course.destroy();
      res.status(200).json({ message: "Course deleted successfully" });
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting course", error });
  }
});

// DELETE Streak
router.delete("/streaks/:id", async (req, res) => {
  try {
    const streak = await Streak.findByPk(req.params.id);
    if (streak) {
      await streak.destroy();
      res.status(200).json({ message: "Streak deleted successfully" });
    } else {
      res.status(404).json({ message: "Streak not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting streak", error });
  }
});

module.exports = router;
