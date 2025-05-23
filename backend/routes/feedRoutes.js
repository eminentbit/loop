import express from "express";
import {
  getFeed,
  createPost,
  toggleLikePost,
  // updatePost,
  // deletePost,
  // likePost,
} from "../controllers/feedController.js";
import verifyToken from "../middlewares/verifyToken.js";
import { postFields } from "../middlewares/upload.js";

const router = express.Router();

// Feed routes
router.get("/", verifyToken, getFeed);
router.post("/create", verifyToken, postFields, createPost);
router.put("/:feedId/like", verifyToken, toggleLikePost);
// router.put("/update/:id", verifyToken, updatePost);
// router.delete("/delete/:id", verifyToken, deletePost);

export default router;
