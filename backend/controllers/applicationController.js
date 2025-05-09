import { uploadFileToS3 } from "../middlewares/upload.js";
import { createTransport } from "nodemailer";
import path from "path";
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

export const getMyApplicants = async (req, res) => {
  const { jobId } = req.params;
  const page = parseInt(req.query.page) || 1;
  const search = req.query.search || "";
  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  try {
    // Filter condition (example: searching applicant name or position)
    const where = {
      jobId: jobId,
      ...(search
        ? {
            OR: [
              { applicantName: { contains: search, mode: "insensitive" } },
              { position: { contains: search, mode: "insensitive" } },
            ],
          }
        : {}),
    };

    const [totalCount, results] = await Promise.all([
      prisma.jobApplication.count({ where }),
      prisma.jobApplication.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { updatedAt: "desc" },
      }),
    ]);

    const nextPage =
      skip + pageSize < totalCount
        ? `${req.baseUrl}${req.path}?page=${page + 1}&search=${search}`
        : null;

    const prevPage =
      page > 1
        ? `${req.baseUrl}${req.path}?page=${page - 1}&search=${search}`
        : null;

    return res.status(200).json({
      count: totalCount,
      results,
      next: nextPage,
      previous: prevPage,
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const getRecruiterApplications = async (req, res) => {
  try {
    const applications = await prisma.jobApplication.findMany({
      include: {
        job: true,
        user: true,
      },
      where: {
        job: {
          userId: req.userId,
        },
      },
    });
    res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching recruiter applications:", error);
    res.status(500).json({ error: "Failed to fetch recruiter applications" });
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

    // 1) Check job exists
    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job) return res.status(404).json({ error: "Job not found." });

    // 2) Prevent duplicate applications
    const existing = await prisma.jobApplication.findFirst({
      where: { jobId, userId },
    });
    if (existing)
      return res
        .status(400)
        .json({ error: "You have already applied for this job." });

    // Build a unique base name using their name + today's date
    const today = new Date().toISOString().split("T")[0];
    console.log(req.body);
    const formattedName = req.body.fullName
      .trim()
      .replace(/\s+/g, "-")
      .toLowerCase();
    const uniqueBase = `${formattedName}-${today}`; // e.g. "john-doe-2025-05-01"

    // 3) Upload files to S3
    const cvFile = req.files.cv?.[0];
    const coverLetterFile = req.files.cover_letter?.[0];
    if (!cvFile || !coverLetterFile) {
      return res
        .status(400)
        .json({ error: "Both CV and cover letter are required." });
    }

    // Helper to build `<uniqueBase>-cv.pdf` etc.
    const makeFileName = (fileObj, label) => {
      const ext = path.extname(fileObj.originalname);
      return `${uniqueBase}-${label}${ext}`; // e.g. "john-doe-2025-05-01-cv.pdf"
    };

    const cvFileName = makeFileName(cvFile, "cv");
    const clFileName = makeFileName(coverLetterFile, "cover-letter");

    // Upload into the `job_applications/` folder in S3
    const S3_FOLDER = "job_applications";

    const cvS3Url = await uploadFileToS3(
      cvFile.buffer,
      cvFileName,
      cvFile.mimetype,
      S3_FOLDER
    );
    const coverLetterS3Url = await uploadFileToS3(
      coverLetterFile.buffer,
      clFileName,
      coverLetterFile.mimetype,
      S3_FOLDER
    );

    // 4) Create application in DB
    await prisma.jobApplication.create({
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
