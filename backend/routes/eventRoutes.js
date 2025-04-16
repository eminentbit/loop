import { Router } from "express";
const router = Router();
import { Event } from "../models"; // Import the Event model

// CREATE a new Event
router.post("/", async (req, res) => {
  try {
    const { title, description, start_time, end_time, location, is_public } = req.body;
    const event = await Event.create({ title, description, start_time, end_time, location, is_public });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error });
  }
});

// GET all Events
router.get("/", async (req, res) => {
  try {
    const events = await Event.findAll();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
});

// GET a single Event by ID
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching event", error });
  }
});

// UPDATE an Event by ID
router.put("/:id", async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (event) {
      const { title, description, start_time, end_time, location, is_public } = req.body;
      await event.update({ title, description, start_time, end_time, location, is_public });
      res.status(200).json(event);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating event", error });
  }
});

// DELETE an Event by ID
router.delete("/:id", async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (event) {
      await event.destroy();
      res.status(200).json({ message: "Event deleted successfully" });
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error });
  }
});

export default router;
