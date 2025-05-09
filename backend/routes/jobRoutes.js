import { Router } from "express";
import prisma from "../lib/prisma.js";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJobById,
  updateJob,
  getJobByUserId,
} from "../controllers/jobControllers.js";
import { submitApplication } from "../controllers/applicationController.js";
import verifyToken from "../middlewares/verifyToken.js";
const router = Router();

// CREATE a new Job
router.post("/create", verifyToken, createJob);

// GET all Jobs
router.get("/", getAllJobs);

// Get the jobs for a particular user
router.get("/user", verifyToken, getJobByUserId);

// GET a single Job by ID
router.get("/:id", getJobById);

// UPDATE a Job by ID
router.put("/update/:id", updateJob);

// DELETE a Job by ID
router.delete("/:id", deleteJob);

// Apply for a Job
router.post("/apply/:id", verifyToken, submitApplication);

export default router;
