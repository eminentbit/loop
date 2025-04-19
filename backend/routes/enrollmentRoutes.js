import { Router } from "express";
import prisma from "../lib/prisma.js";
const router = Router();

// CREATE Enrollment
router.post("/enrollments", async (req, res) => {
  try {
    const { userId, courseId, completed, hours_spent, quizzes_taken } =
      req.body;
    const enrollment = await prisma.enrollment.create({
      data: {
        userId,
        courseId,
        completed,
        hoursSpent: hours_spent,
        quizzesTaken: quizzes_taken,
      },
    });
    res
      .status(201)
      .json({ enrollment, message: "Enrollment created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating enrollment", error });
  }
});

// GET Enrollments for a specific user
router.get("/enrollments/:userId", async (req, res) => {
  try {
    const enrollments = await prisma.enrollment.findUnique({
      where: { userId: req.params.userId },
      include: { course: true },
    });
    res
      .status(200)
      .json({ enrollments, message: "Enrollments fetched successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching enrollments", error });
  }
});

// Update Enrollment status
router.put("/enrollments/:id", async (req, res) => {
  try {
    const enrollment = await prisma.enrollment.findUnique({
      where: { id: req.params.id },
      include: { course: true },
    });
    if (enrollment) {
      const { completed, hours_spent, quizzes_taken } = req.body;
      await enrollment.update({
        data: {
          completed,
          hoursSpent: hours_spent,
          quizzesTaken: quizzes_taken,
        },
      });
      res.status(200).json({
        enrollment,
        message: "Enrollment updated successfully",
      });
    } else {
      res.status(404).json({ message: "Enrollment not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating enrollment", error });
  }
});

export default router;
