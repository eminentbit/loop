import { Router } from "express";
import {
  applyForJob,
  getApplicationById,
  getApplications,
  submitApplication,
} from "../controllers/applicationController.js";
import verifyToken from "../middlewares/verifyToken.js";
import { applicationFields } from "../middlewares/upload.js";

const router = Router();

router.post("/submit", verifyToken, submitApplication);
router.get("/applications", verifyToken, getApplications);
router.get("/applications/:id", verifyToken, getApplicationById);
router.post("/jobs/:jobId", verifyToken, applicationFields, applyForJob);

export default router;
