import express from "express";
import {
  listComments,
  addComment,
  toggleLikeComment,
  deleteComment,
  reportComment,
} from "../controllers/commentControllers.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

// Feed routes
router.get("/:postId", verifyToken, listComments);
router.post("/:postId/create", verifyToken, addComment);
router.put("/:commentId/like", verifyToken, toggleLikeComment);
router.delete("/:commentId/delete", verifyToken, deleteComment);
router.delete("/:commentId/report", verifyToken, reportComment);

export default router;
