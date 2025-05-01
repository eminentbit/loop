import prisma from "../lib/prisma.js";
import asyncHandler from "express-async-handler";

// @desc    Get all active recruiters
// @route   GET /api/recruiters
// @access  Private
export const getRecruiters = asyncHandler(async (req, res) => {
  const recruiters = await prisma.user.findMany({
    where: {
      role: "recruiter",
      isActive: true,
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      profile: true,
      companyName: true,
      companyRole: true,
      companyLogo: true,
    },
  });
  res.status(200).json(recruiters);
});

// @desc    Follow a recruiter
// @route   PUT /api/recruiters/follow/:recruiterId
// @access  Private
export const followRecruiter = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const { recruiterId } = req.params;

  const recruiter = await prisma.user.findUnique({
    where: { id: recruiterId },
  });

  if (!recruiter) {
    res.status(404);
    throw new Error("Recruiter not found");
  }

  const existingFollow = await prisma.follow.findFirst({
    where: {
      followerId: userId,
      followingId: recruiterId,
    },
  });

  if (existingFollow) {
    res.status(400);
    throw new Error("Already following this recruiter");
  }

  await prisma.follow.create({
    data: {
      followerId: userId,
      followingId: recruiterId,
    },
  });

  res.status(200).json({ message: "Successfully followed recruiter" });
});

// @desc    Unfollow a recruiter
// @route   DELETE /api/recruiters/unfollow/:recruiterId
// @access  Private
export const unfollowRecruiter = async (req, res) => {
  try {
    const userId = req.userId;
    const { recruiterId } = req.params;

    const follow = await prisma.follow.findFirst({
      where: {
        followerId: userId,
        followingId: recruiterId,
      },
    });

    if (!follow) {
      return res.status(404).json({ error: "Follow relationship not found" });
    }

    await prisma.follow.delete({
      where: { id: follow.id },
    });

    res.status(200).json({ message: "Successfully unfollowed recruiter" });
  } catch (error) {
    console.error("Error unfollowing recruiter:", error);
    res.status(500).json({ error: "Failed to unfollow recruiter" });
  }
};

// @desc    Get users the current user is following
// @route   GET /api/network/following
// @access  Private
export const getFollowing = async (req, res) => {
  try {
    const userId = req.userId;

    const following = await prisma.follow.findMany({
      where: {
        followerId: userId,
      },
      include: {
        following: {
          select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
            profile: true,
            companyName: true,
            companyRole: true,
            companyLogo: true,
          },
        },
      },
    });

    res.status(200).json({
      status: "success",
      data: following.map((f) => f.following),
    });
  } catch (error) {
    console.error("Error fetching following:", error);
    res.status(500).json({ error: "Failed to fetch following list" });
  }
};

// @desc    Get users who follow the current user
// @route   GET /api/network/followers
// @access  Private
export const getFollowers = async (req, res) => {
  try {
    const userId = req.userId;

    const followers = await prisma.follow.findMany({
      where: {
        followingId: userId,
      },
      include: {
        follower: {
          select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
            profile: true,
            companyName: true,
            companyRole: true,
            companyLogo: true,
          },
        },
      },
    });

    res.status(200).json({
      status: "success",
      data: followers.map((f) => f.follower),
    });
  } catch (error) {
    console.error("Error fetching followers:", error);
    res.status(500).json({ error: "Failed to fetch followers list" });
  }
};

// @desc    Connect with recruiter (send message)
// @route   POST /api/recruiters/connect/:recruiterId
// @access  Private
export const connectRecruiter = asyncHandler(async (req, res) => {
  const { message } = req.body;
  const { recruiterId } = req.params;

  if (!message) {
    res.status(400);
    throw new Error("Please provide a message");
  }

  const recruiter = await prisma.user.findUnique({
    where: { id: recruiterId },
  });

  if (!recruiter) {
    res.status(404);
    throw new Error("Recruiter not found");
  }

  // Save message to database (requires Message model)
  await prisma.message.create({
    data: {
      fromId: req.userId,
      toId: recruiterId,
      content: message,
      timestamp: new Date(),
    },
  });

  res.status(200).json({ message: "Message sent successfully" });
});
