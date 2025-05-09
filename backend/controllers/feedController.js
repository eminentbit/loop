import path from "path";
import prisma from "../lib/prisma.js";
import { uploadFileToS3 } from "../middlewares/upload.js";

// Get all posts (feeds)
export const getFeed = async (req, res) => {
  const userId = req.userId; // undefined if not logged in
  try {
    const feeds = await prisma.feed.findMany({
      include: {
        likes: { select: { id: true } },
        user: { select: { id: true, fullName: true } },
        comments: { select: { id: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    // build response for everyone
    const response = feeds.map((feed) => {
      const isLikedByUser = userId
        ? feed.likes.some((like) => like.id === userId)
        : false;

      return {
        id: feed.id,
        title: feed.title,
        content: feed.content,
        image: feed.image,
        videoUrl: feed.videoUrl,
        eventDate: feed.eventDate,
        liveUrl: feed.liveUrl,
        createdAt: feed.createdAt,
        updatedAt: feed.updatedAt,
        user: feed.user,
        likesCount: feed.likes.length,
        commentsCount: feed.comments.length,
        isLikedByUser,
      };
    });

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching feeds:", error);
    if (!res.headersSent) {
      return res
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  }
};

// Get post by ID
export const getFeedById = async (req, res) => {
  const { feedId } = req.params;
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const feed = await prisma.feed.findUnique({
      where: { id: parseInt(feedId) },
      include: {
        likes: { select: { id: true } },
      },
    });

    if (!feed) {
      return res.status(404).json({ message: "Feed not found" });
    }

    const isLikedByUser = feed.likes.some((likeUser) => likeUser.id === userId);

    return res.status(200).json({
      ...feed,
      isLikedByUser,
    });
  } catch (error) {
    console.error("Error fetching feed:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Create post controller
export const createPost = async (req, res) => {
  try {
    const {
      type,
      title = null,
      content = null,
      videoUrl = null,
      eventDate = null,
      liveUrl = null,
    } = req.body;

    const userId = req.userId;

    if (!type || !userId) {
      return res.status(400).json({ message: "Type and userId are required" });
    }

    let fileUrl = null;
    const S3_FOLDER = "posts";

    // ✅ Check if file is uploaded
    if (req.files) {
      const { buffer, originalname, mimetype } = req.files.attachments[0];

      const ext = path.extname(originalname); // This is where the error was
      const fileName = `${userId}-${Date.now()}${ext}`;

      fileUrl = await uploadFileToS3(buffer, fileName, mimetype, S3_FOLDER);
    }

    const newPost = await prisma.feed.create({
      data: {
        userId,
        type,
        title,
        content,
        videoUrl,
        eventDate: eventDate ? new Date(eventDate) : null,
        liveUrl,
        image: fileUrl,
      },
      include: {
        user: {
          select: {
            fullName: true,
            id: true,
          },
        },
      },
    });

    return res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const updatedPost = await prisma.feed.update({
      where: { id: parseInt(id) },
      data: { content },
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.feed.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const toggleLikePost = async (req, res) => {
  const { feedId } = req.params;
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const feed = await prisma.feed.findUnique({
      where: { id: parseInt(feedId) },
      include: { likes: { select: { id: true } } },
    });

    if (!feed) {
      return res.status(404).json({ message: "Post not found" });
    }

    const hasLiked = feed.likes.some((user) => user.id === userId);

    let updatedFeed;
    if (hasLiked) {
      updatedFeed = await prisma.feed.update({
        where: { id: feed.id },
        data: {
          likes: {
            disconnect: { id: userId },
          },
          likesCount: {
            decrement: 1,
          },
        },
      });
    } else {
      updatedFeed = await prisma.feed.update({
        where: { id: feed.id },
        data: {
          likes: {
            connect: { id: userId },
          },
          likesCount: {
            increment: 1,
          },
        },
      });
    }

    return res.status(200).json({
      status: hasLiked ? "unliked" : "liked",
      likesCount: updatedFeed.likesCount,
    });
  } catch (error) {
    console.error("Error toggling like:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
