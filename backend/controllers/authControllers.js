import bcrypt, { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import transporter from "../utils/transporter.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import dotenv from "dotenv";
import prisma from "../lib/prisma.js";
dotenv.config();

export const register = async (req, res) => {
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
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const hashedPassword = await hash(password, 10);

    // Create a token that contains all user information (temporarily)
    const token = jwt.sign(
      {
        email,
        fullName,
        password: hashedPassword,
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
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Send the verification email
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

    transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Verify Your Email",
      html: `
        <p>Click the link to verify your email:</p>
        <p><a href="${verificationUrl}" target="_blank" style="color: #1a73e8;">Verify Email</a></p>
        <p>Or you can copy the link below:</p>
        <a href="${verificationUrl}">${verificationUrl}</p>
        <p>This link will expire in 24 hours.</p>
      `,
    });

    res.status(200).json({
      message: "Verification email sent. Please check your inbox.",
      redirectTo: "/check-email",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to send verification email" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    console.log(user);

    if (!user || !(await compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // generate token and set cookie
    generateTokenAndSetCookie(res, user.id);

    res.status(200).json({
      message: "Login successfully",
      user: { email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

// Change Password Controller
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if current password matches
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Change Role Controller
export const changeRole = async (req, res) => {
  try {
    const { userId, newRole } = req.body;

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized to change roles" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Role updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ message: "Invalid verification link" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

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
    } = decoded;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res
        .status(200)
        .json({ message: "Email already verified or in use." });
    }

    const newUserData = {
      email,
      fullName,
      password, // already hashed!
      role,
    };

    switch (role) {
      case "recruiter":
        Object.assign(newUserData, {
          companyName,
          companyRole,
          industry,
          companySize,
          additionalInfo,
        });
        break;

      case "jobseeker":
      case "investor":
        Object.assign(newUserData, {
          currentJobTitle,
          experienceLevel,
          primarySkills,
          careerInterests,
          locationPreference,
        });
        break;
    }

    // Create user finally
    const user = await prisma.user.create({ data: newUserData });

    // Set login token
    generateTokenAndSetCookie(res, user.id);

    // Send welcome email
    transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to loopos!",
      html: `
      <h2>Welcome to loopos, ${fullName}!</h2>
      <p>Thank you for joining our community. Your account has been successfully verified.</p>
      <p>You can now log in and start exploring all our features.</p>
      <p>If you have any questions, feel free to reach out to our support team.</p>
      <p>Best regards,</p>
      <p>The loopos Team</p>
      `,
    });

    return res.status(200).json({
      message: "Email verified successfully. You are now logged in.",
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};

export const checkAuth = async (req, res) => {
  if (!req.userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthenticated! No token provided!",
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
      },
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error checking auth", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error! Please try again later.",
    });
  }
};

export const profileDisplay = async (req, res) => {
  if (!req.userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthenticated! No token provided!",
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        is_active: true,
        is_staff: true,
        countryCode: true,
        countryCodNum: true,
        companyName: true,
        companyRole: true,
        companyWebsite: true,
        companyDescription: true,
        companyLogo: true,
        industry: true,
        companySize: true,
        additionalInfo: true,
        currentJobTitle: true,
        experienceLevel: true,
        primarySkills: true,
        careerInterests: true,
        locationPreference: true,
        resume: true,
        portfolio: true,
        socialLinks: true,
        about: true,
        phoneNumber: true,
        githubProfile: true,
        linkedinProfile: true,
        twitterProfile: true,
        dribbbleProfile: true,
        behanceProfile: true,
        website: true,
        blog: true,
        youtubeChannel: true,
        tiktokProfile: true,
        facebookProfile: true,
        instagramProfile: true,
        telegramProfile: true,
        discordProfile: true,
        redditProfile: true,
        quoraProfile: true,
        mediumProfile: true,
        devtoProfile: true,
        stackoverflowProfile: true,
        createdAt: true,
        updatedAt: true,
        certifications: true,
        experiences: true,
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
};

export const resendEmail = async (req, res) => {
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
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(409).json({ message: "Email already verified" });
    }

    const token = jwt.sign(
      {
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
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify Your Email",
      html: `
        <p>Click the link to verify your email:</p>
        <p><a href="${verificationUrl}" target="_blank" style="color: #1a73e8;">Verify Email</a></p>
        <p>This link will expire in 24 hours.</p>
      `,
    });

    res.status(200).json({
      message: "Verification email resent. Please check your inbox.",
      redirectTo: "/check-email",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to resend verification email" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful!" });
};

export const deleteAccount = async (req, res) => {
  try {
    const userId = req.userId;

    // Delete the user
    await prisma.user.delete({
      where: { id: userId },
    });

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ message: "Failed to delete account" });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a password reset token
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send the password reset email
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Your Password",
      html: `
        <p>Click the link to reset your password:</p>
        <p><a href="${resetUrl}" target="_blank" style="color: #1a73e8;">Reset Password</a></p>
        <p>This link will expire in 1 hour.</p>
      `,
    });

    res.status(200).json({
      message: "Password reset email sent. Please check your inbox.",
      redirectTo: "/reset-password",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to send password reset email" });
  }
};

export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { email } = decoded;

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};
