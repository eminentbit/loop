import { Router } from "express";
import prisma from "../lib/prisma.js";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJobById,
  updateJob,
} from "../controllers/jobControllers.js";
const router = Router();

// CREATE a new Job
router.post("/create", createJob);

// GET all Jobs
router.get("/", getAllJobs);

// GET a single Job by ID
router.get("/:id", getJobById);

// UPDATE a Job by ID
router.put("/update/:id", updateJob);

// DELETE a Job by ID
router.delete("/:id", deleteJob);

export default router;
