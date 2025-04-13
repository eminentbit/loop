const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const prisma = require("@prisma/client");
const { isAuthenticated } = require("../middlewares/authMiddleware");

// Register route
router.post("/register", async (req, res) => {
  const {
    email,
    full_name,
    password,
    role,
    company_name,
    company_role,
    industry,
    company_size,
    additional_info,
    current_job_title,
    experience_level,
    primary_skills,
    career_interests,
    location_preference,
  } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    // Hash password manually (since Prisma doesn't have model hooks like Sequelize)
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserData = {
      email,
      full_name,
      password: hashedPassword,
      role,
    };

    // Recruiter-specific fields
    if (role === "recruiter") {
      Object.assign(newUserData, {
        company_name,
        company_role,
        industry,
        company_size,
        additional_info,
      });
    }

    // Jobseeker or Investor-specific fields
    if (role === "jobseeker" || role === "investor") {
      Object.assign(newUserData, {
        current_job_title,
        experience_level,
        primary_skills,
        career_interests,
        location_preference,
      });
    }

    const user = await prisma.user.create({
      data: newUserData,
    });

    req.session.userId = user.id;

    res.status(201).json({
      message: "User registered successfully",
      user: {
        email: user.email,
        full_name: user.full_name,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(400).json({
      message: "Registration failed",
      error: err.message,
    });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    req.session.userId = user.id;

    res.status(200).json({
      message: "Login successful",
      user: { email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

// Logout route
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    res.clearCookie("loop-session"); // or whatever your session name is
    res.status(200).json({ message: "Logged out successfully" });
  });
});

// Profile route (protected)
router.get("/profile", isAuthenticated, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.session.userId },
      select: {
        id: true,
        email: true,
        full_name: true,
        role: true,
        company_name: true,
        current_job_title: true,
        experience_level: true,
        primary_skills: true,
        career_interests: true,
        location_preference: true,
        industry: true,
        company_size: true,
        company_role: true,
        additional_info: true,
        is_active: true,
        is_staff: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch profile", error: err.message });
  }
});

module.exports = router;
