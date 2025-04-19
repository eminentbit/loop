import express from "express";
import {
  getFeed,
  createPost,
  // updatePost,
  // deletePost,
  // likePost,
  // unlikePost,
} from "../controllers/feedController.js";

const router = express.Router();

// Feed routes
router.get("/", getFeed);
router.post("/create", createPost);
// router.put("/update/:id", verifyToken, updatePost);
// router.delete("/delete/:id", verifyToken, deletePost);
// router.put("/like/:id", verifyToken, likePost);
// router.put("/unlike/:id", verifyToken, unlikePost);

export default router;
