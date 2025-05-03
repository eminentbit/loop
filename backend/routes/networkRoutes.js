// routes/networkRoutes.js

import { Router } from "express";
const router = Router();
import {
  unfollowRecruiter,
  getRecruiters,
  getFollowing,
  getFollowers,
  toggleFollowRecruiter,
  followRecruiter,
} from "../controllers/networkControllers.js";
import verifyToken from "../middlewares/verifyToken.js";

// Get all recruiters
router.get("/recruiters", verifyToken, getRecruiters);

router.post("/recruiters/:recruiterId/follow", verifyToken, followRecruiter);

// Follow a recruiter
router.post(
  "/recruiters/:recruiterId/toggleFollow",
  verifyToken,
  toggleFollowRecruiter
);

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
