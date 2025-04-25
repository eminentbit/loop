import { uploadFileToS3 } from "../middlewares/upload.js";
import { createTransport } from "nodemailer";
import prisma from "../lib/prisma.js";

// File validation utility
const validateFiles = (files) => {
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  const maxSize = 2 * 1024 * 1024; // 2MB

  const errors = {};

  if (files.cv && files.cv[0]) {
    const file = files.cv[0];
    if (!allowedTypes.includes(file.mimetype)) {
      errors.cv = "Invalid file type for CV";
    } else if (file.size > maxSize) {
      errors.cv = "CV file is too large";
    }
  }

  if (files.cover_letter && files.cover_letter[0]) {
    const file = files.cover_letter[0];
    if (!allowedTypes.includes(file.mimetype)) {
      errors.cover_letter = "Invalid file type for cover letter";
    } else if (file.size > maxSize) {
      errors.cover_letter = "Cover letter file is too large";
    }
  }

  return errors;
};

export const submitApplication = async (req, res) => {
  console.log("Test..");
  console.log(req.body);
  const files = req.files || {};

  const { name, email, message } = req.body;

  if (!files.cv || !files.cover_letter) {
    return res.status(400).json({ error: "Missing required files" });
  }

  const errors = validateFiles(files);
  if (Object.keys(errors).length > 0) {
    return res
      .status(400)
      .json({ error: "File validation failed", details: errors });
  }

  // Configure your transporter
  const transporter = createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Mail details
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "New Job Application",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    attachments: [
      {
        filename: files.cv[0].originalname,
        content: files.cv[0].buffer,
      },
      {
        filename: files.cover_letter[0].originalname,
        content: files.cover_letter[0].buffer,
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    return res
      .status(200)
      .json({ message: "Application submitted successfully" });
  } catch (err) {
    console.error("Email sending failed:", err);
    return res.status(500).json({ error: "Failed to send email" });
  }
};

export const getApplications = async (req, res) => {
  try {
    const applications = await prisma.jobApplication.findMany({
      include: {
        job: true,
        user: true,
      },
    });
    res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ error: "Failed to fetch applications" });
  }
};

export const getApplicationById = async (req, res) => {
  try {
    const applications = await prisma.jobApplication.findUnique({
      include: {
        job: true,
        user: true,
      },
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ error: "Failed to fetch applications" });
  }
};

export const applyForJob = async (req, res) => {
  try {
    console.log("Applying for job...");
    console.log("Body:", req.body);
    console.log("Files:", req.files);

    const { jobId } = req.params;
    const userId = req.userId;

    // Get user's full name and format it
    const today = new Date().toISOString().split("T")[0];
    const formattedName = req.body.fullName.replace(/\s+/g, "-").toLowerCase();
    const uniqueName = `${formattedName}-${today}`;

    // 1) Check job exists
    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job) {
      return res.status(404).json({ error: "Job not found." });
    }

    // 2) Prevent duplicate applications
    const existing = await prisma.jobApplication.findFirst({
      where: { jobId, userId },
    });
    if (existing) {
      return res
        .status(400)
        .json({ error: "You have already applied for this job." });
    }

    // 3) Upload files to S3
    const cvFile = req.files.cv?.[0];
    const coverLetterFile = req.files.cover_letter?.[0];

    if (!cvFile || !coverLetterFile) {
      return res
        .status(400)
        .json({ error: "Both CV and Cover Letter are required." });
    }

    // Upload CV and Cover Letter to S3
    const cvS3Url = await uploadFileToS3(
      cvFile.buffer,
      cvFile.originalname,
      cvFile.mimetype,
      uniqueName
    );
    const coverLetterS3Url = await uploadFileToS3(
      coverLetterFile.buffer,
      coverLetterFile.originalname,
      coverLetterFile.mimetype,
      uniqueName
    );

    // 4) Create application in DB
    const application = await prisma.jobApplication.create({
      data: {
        jobId,
        userId,
        fullName: req.body.fullName,
        email: req.body.email,
        cv: cvS3Url,
        coverLetter: coverLetterS3Url,
        message: req.body.message || null,
      },
    });

    return res
      .status(200)
      .json({ message: "Application submitted successfully." });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Server error. Please try again later." });
  }
};
