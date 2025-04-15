const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const { isAuthenticated } = require("../middlewares/authMiddleware");

const prisma = new PrismaClient();

// Register route
router.post("/register", async (req, res) => {
  const {
    email,
    fullName,
    password,
    role,
    companyName,
    companyRole,
    industry,
    companySize,
    additionalInfo,
    currentJobTitle,
    experienceLevel,
    primarySkills,
    careerInterests,
    locationPreference,
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
      fullName,
      password: hashedPassword,
      role,
    };

    // Recruiter-specific fields
    if (role === "recruiter") {
      Object.assign(newUserData, {
        companyName,
        companyRole,
        industry,
        companySize,
        additionalInfo,
      });
    }

    // Jobseeker or Investor-specific fields
    if (role === "jobseeker" || role === "investor") {
      Object.assign(newUserData, {
        currentJobTitle,
        experienceLevel,
        primarySkills,
        careerInterests,
        locationPreference,
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
        fullName: user.fullName,
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
        fullName: true,
        role: true,
        companyName: true,
        currentJobTitle: true,
        experienceLevel: true,
        primarySkills: true,
        careerInterests: true,
        location_Preference: true,
        industry: true,
        companySize: true,
        companyRole: true,
        additionalInfo: true,
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
