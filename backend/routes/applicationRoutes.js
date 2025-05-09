import { Router } from "express";
import {
  applyForJob,
  getApplicationById,
  getApplications,
  getMyApplicants,
  getRecruiterApplications,
  submitApplication,
} from "../controllers/applicationController.js";
import verifyToken from "../middlewares/verifyToken.js";
import { applicationFields } from "../middlewares/upload.js";

const router = Router();

router.post("/submit", verifyToken, submitApplication);
router.get("/", getApplications);
router.get("/user", verifyToken, getRecruiterApplications);
router.get("/:id", verifyToken, getApplicationById);
router.post("/jobs/:jobId", verifyToken, applicationFields, applyForJob);
router.get("/:jobId/applicants", verifyToken, getMyApplicants);

export default router;
