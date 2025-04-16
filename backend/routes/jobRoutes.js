import { Router } from "express";
const router = Router();
import { Job } from "../models"; // Import the Job model

// CREATE a new Job
router.post("/", async (req, res) => {
  try {
    const { title, description, salary, location, company, isRemote } = req.body;
    const job = await Job.create({ title, description, salary, location, company, isRemote });
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: "Error creating job", error });
  }
});

// GET all Jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.findAll();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs", error });
  }
});

// GET a single Job by ID
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (job) {
      res.status(200).json(job);
    } else {
      res.status(404).json({ message: "Job not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching job", error });
  }
});

// UPDATE a Job by ID
router.put("/:id", async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (job) {
      const { title, description, salary, location, company, isRemote } = req.body;
      await job.update({ title, description, salary, location, company, isRemote });
      res.status(200).json(job);
    } else {
      res.status(404).json({ message: "Job not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating job", error });
  }
});

// DELETE a Job by ID
router.delete("/:id", async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (job) {
      await job.destroy();
      res.status(200).json({ message: "Job deleted successfully" });
    } else {
      res.status(404).json({ message: "Job not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting job", error });
  }
});

export default router;
