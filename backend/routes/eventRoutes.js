import { Router } from "express";
const router = Router();
import prisma from "../lib/prisma.js";

// CREATE a new Event
router.post("/", async (req, res) => {
  try {
    const { title, description, start_time, end_time, location, is_public } =
      req.body;
    const event = await prisma.event.create({
      data: {
        title,
        description,
        startTime: new Date(start_time),
        endTime: new Date(end_time),
        location,
        isPublic: is_public,
      },
    });
    res.status(201).json({ event, message: "Event created successfully" });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Error creating event", error });
  }
});

// GET all Events
router.get("/", async (req, res) => {
  try {
    const events = await prisma.event.findMany();
    if (events.length === 0) {
      return res.status(404).json({ message: "No events found" });
    }
    res.status(200).json({ events, message: "Events fetched successfully" });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Error fetching events", error });
  }
});

// GET a single Event by ID
router.get("/:id", async (req, res) => {
  try {
    const event = await prisma.event.findUnique({
      where: { id: req.params.id },
    });
    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ message: "Error fetching event", error });
  }
});

// UPDATE an Event by ID
router.put("/:id", async (req, res) => {
  try {
    const { title, description, start_time, end_time, location, is_public } =
      req.body;
    const event = await prisma.event.update({
      where: { id: req.params.id },
      data: {
        title,
        description,
        startTime: new Date(start_time),
        endTime: new Date(end_time),
        location,
        isPublic: is_public,
      },
    });
    res.status(200).json({ event, message: "Event updated successfully" });
  } catch (error) {
    console.error("Error updating event:", error);
    // Handle specific error codes from Prisma
    if (error.code === "P2025") {
      res.status(404).json({ message: "Event not found" });
    } else {
      res.status(500).json({ message: "Error updating event", error });
    }
  }
});

// DELETE an Event by ID
router.delete("/:id", async (req, res) => {
  try {
    const event = await prisma.event.delete({
      where: { id: req.params.id },
    });
    res.status(200).json({ message: "Event deleted successfully", event });
  } catch (error) {
    console.error("Error deleting event:", error);
    // Handle specific error codes from Prisma
    if (error.code === "P2025") {
      res.status(404).json({ message: "Event not found" });
    } else {
      res.status(500).json({ message: "Error deleting event", error });
    }
  }
});

export default router;
