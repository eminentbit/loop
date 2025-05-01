import prisma from "../lib/prisma.js";

// CREATE a new job
export const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      salary,
      experience,
      location,
      company,
      isRemote,
      jobType,
      applicationDeadline,
      skills = [],
      requirements = [],
      responsibilities = [],
      benefits = [],
      companyLogo,
      companyWebsite,
      companyEmail,
      companyPhone,
      companyAddress,
      companySize,
      companyIndustry,
      companyDescription,
      applicationLink,
      department,
    } = req.body;

    const job = await prisma.job.create({
      data: {
        title,
        description,
        salary,
        location,
        experience,
        company,
        isRemote,
        jobType,
        applicationDeadline: new Date(applicationDeadline),
        skills,
        requirements,
        responsibilities,
        benefits,
        companyLogo,
        companyWebsite,
        companyEmail,
        companyPhone,
        companyAddress,
        companySize,
        companyIndustry,
        companyDescription,
        applicationLink,
        department,
      },
    });

    res.status(201).json(job);
  } catch (error) {
    console.error("Job creation error:", error);
    res
      .status(500)
      .json({ message: "Error creating job", error: error.message });
  }
};

// GET all jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await prisma.job.findMany();
    res.status(200).json(jobs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching jobs", error: error.message });
  }
};

// GET a single job by ID
export const getJobById = async (req, res) => {
  try {
    const job = await prisma.job.findUnique({
      where: { id: req.params.id },
    });
    if (job) {
      res.status(200).json(job);
    } else {
      res.status(404).json({ message: "Job not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching job", error: error.message });
  }
};

// UPDATE a job by ID
export const updateJob = async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);
    const existingJob = await prisma.job.findUnique({ where: { id: jobId } });

    if (!existingJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    const { title, description, salary, location, company, isRemote } =
      req.body;

    const updatedJob = await prisma.job.update({
      where: { id: jobId },
      data: {
        title,
        description,
        salary,
        location,
        company,
        isRemote,
      },
    });

    res.status(200).json(updatedJob);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating job", error: error.message });
  }
};

// DELETE a job by ID
export const deleteJob = async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);
    const existingJob = await prisma.job.findUnique({ where: { id: jobId } });

    if (!existingJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    await prisma.job.delete({
      where: { id: jobId },
    });

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting job", error: error.message });
  }
};
