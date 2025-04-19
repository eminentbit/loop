import { Router } from "express";
import prisma from "../lib/prisma.js";
const router = Router();

// CREATE Streak
router.post("/streaks", async (req, res) => {
  try {
    const { userId, day, active } = req.body;
    const streak = await prisma.streak.create({
      data: {
        userId,
        day,
        active,
      },
    });
    res.status(201).json({
      streak,
      message: "Streak created successfully",
    });
  } catch (error) {
    console.log(`Error creating streak: ${error}`);
    res.status(500).json({ message: "Error creating streak", error });
  }
});

// GET Streak for a specific user
router.get("/streaks/:userId", async (req, res) => {
  try {
    const streaks = await prisma.streak.findUnique({
      where: { userId: req.params.userId },
      include: {
        user: true, // Include user details if needed
      },
    });
    res.status(200).json({
      streaks,
      message: "Streaks fetched successfully",
    });
  } catch (error) {
    console.log(`Error fetching streaks: ${error}`);
    res.status(500).json({ message: "Error fetching streaks", error });
  }
});
// Update Streak status
router.put("/streaks/:id", async (req, res) => {
  try {
    const { active } = req.body;
    const streak = await prisma.streak.update({
      where: { id: req.params.id },
      data: { active },
    });
    res.status(200).json({
      streak,
      message: "Streak updated successfully",
    });
  } catch (error) {
    if (error.code === "P2025") {
      res.status(404).json({ message: "Streak not found" });
    } else {
      res.status(500).json({ message: "Error updating streak", error });
    }
  }
});

// DELETE Streak
router.delete("/streaks/:id", async (req, res) => {
  try {
    const streak = await prisma.streak.findUnique({
      where: { id: req.params.id },
    });
    if (streak) {
      await prisma.streak.delete({
        where: { id: req.params.id },
      });
      res.status(200).json({ message: "Streak deleted successfully" });
    } else {
      res.status(404).json({ message: "Streak not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting streak", error });
  }
});

export default router;
