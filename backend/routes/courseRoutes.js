import { Router } from "express";
import prisma from "../lib/prisma.js";
import verifyToken from "../middlewares/verifyToken.js";
import { getDashboard } from "../controllers/courseController.js";
const router = Router();

// CREATE Course
router.post("/", async (req, res) => {
  try {
    const { title, image_url } = req.body;
    const course = await prisma.course.create({
      data: {
        title,
        imageUrl: image_url,
      },
    });
    res.status(201).json({ course, message: "Course created successfully" });
  } catch (error) {
    console.log(`Error creating course: ${error}`);
    res.status(500).json({ message: "Error creating course", error });
  }
});

// GET all Courses
router.get("/", async (req, res) => {
  try {
    const courses = await prisma.course.findMany();
    res.status(200).json({ courses, message: "Courses fetched successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error });
  }
});

// GET a single Course by ID
router.get("/:id", async (req, res) => {
  try {
    const course = await prisma.course.findUnique({
      where: { id: req.params.id },
      include: {
        enrollments: true, // Include enrollments related to the course
      },
    });
    if (course) {
      res.status(200).json({ course, message: "Course fetched successfully" });
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching course", error });
  }
});

// DELETE Course
router.delete("/:id", async (req, res) => {
  try {
    const course = await prisma.course.findUnique({
      where: { id: req.params.id },
    });
    if (course) {
      await prisma.course.delete({
        where: { id: req.params.id },
      });
      res.status(200).json({ message: "Course deleted successfully" });
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting course", error });
  }
});

router.get("/dashboard", verifyToken, getDashboard);

export default router;
