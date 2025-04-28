import express from "express";
const router = express.Router();
import verifyToken from "../middlewares/verifyToken.js";
import {
  checkAuth,
  login,
  logout,
  profileDisplay,
  register,
  resendEmail,
  verifyEmail,
} from "../controllers/authControllers.js";

// Register route
router.post("/register", register);

// Login route
router.post("/login", login);

router.get("/verify-email", verifyEmail);

// Logout route
router.post("/logout", logout);

//Resend email
router.post("/resend-email", resendEmail);

// check auth
router.get("/check-auth", verifyToken, checkAuth);

// Profile route (protected)
router.get("/profile", verifyToken, profileDisplay);

export default router;
