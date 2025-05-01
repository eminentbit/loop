// routes/networkRoutes.js

import { Router } from "express";
const router = Router();
import {
  followRecruiter,
  unfollowRecruiter,
  getRecruiters,
  getFollowing,
  getFollowers,
} from "../controllers/networkControllers.js";
import verifyToken from "../middlewares/verifyToken.js";

// Get all recruiters
router.get("/recruiters", verifyToken, getRecruiters);

// Follow a recruiter
router.post("/recruiters/:recruiterId/follow", verifyToken, followRecruiter);

// Unfollow a recruiter
router.delete(
  "/recruiters/:recruiterId/unfollow",
  verifyToken,
  unfollowRecruiter
);

// Get all users the current user is following
router.get("/following", verifyToken, getFollowing);

// Get all users the current user is following
router.get("/followers", verifyToken, getFollowers);

export default router;
