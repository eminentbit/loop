import prisma from "../lib/prisma.js";

// GET /feed/posts/:postId/list_comments/
export const listComments = async (req, res) => {
  const { postId } = req.params;
  const userId = req.userId;

  try {
    const comments = await prisma.comment.findMany({
      where: { feedId: parseInt(postId) },
      orderBy: { createdAt: "asc", isDeleted: false },
      include: {
        likes: { select: { id: true } },
        user: {
          select: {
            fullName: true,
          },
        },
      },
    });

    const response = comments.map((c) => ({
      id: c.id,
      content: c.content,
      createdAt: c.createdAt,
      user: { userId: c.userId, username: c.user.fullName }, // adjust if you want user details
      likes: c.likes.length,
      likedByUser: c.likes.some((u) => u.id === userId),
    }));

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// POST /feed/posts/:postId/comment/
export const addComment = async (req, res) => {
  const { postId } = req.params;
  const userId = req.userId;
  const { content } = req.body;

  if (!content || !content.trim()) {
    return res.status(400).json({ message: "Comment cannot be empty" });
  }

  try {
    const newComment = await prisma.comment.create({
      data: {
        content,
        feed: { connect: { id: parseInt(postId) } },
        user: { connect: { id: userId } },
      },
    });

    await prisma.feed.update({
      where: { id: parseInt(feedId) },
      data: {
        commentsCount: {
          increment: 1,
        },
      },
    });

    return res.status(201).json({
      ...newComment,
      likes: 0,
      likedByUser: false,
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const toggleLikeComment = async (req, res) => {
  const { commentId } = req.params;
  const userId = req.userId;

  try {
    // Check if like exists
    const existingLike = await prisma.user.findFirst({
      where: {
        id: userId,
        likedComments: {
          some: { id: parseInt(commentId) },
        },
      },
    });

    if (existingLike) {
      // Unlike: Remove the connection
      await prisma.comment.update({
        where: { id: parseInt(commentId) },
        data: {
          likes: {
            disconnect: { id: userId },
          },
        },
      });
      return res.status(200).json({ message: "Comment unliked" });
    } else {
      // Like: Add the connection
      await prisma.comment.update({
        where: { id: parseInt(commentId) },
        data: {
          likes: {
            connect: { id: userId },
          },
        },
      });
      return res.status(200).json({ message: "Comment liked" });
    }
  } catch (error) {
    console.error("Error toggling comment like:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// DELETE /feed/posts/:postId/comment/:commentId/delete
export const deleteComment = async (req, res) => {
  const { commentId } = req.params;
  const userId = req.userId;

  try {
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(commentId) },
      select: { id: true, feedId: true, authorId: true, isDeleted: true },
    });

    if (!comment || comment.isDeleted) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.authorId !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    // Soft delete the comment
    await prisma.comment.update({
      where: { id: comment.id },
      data: { isDeleted: true },
    });

    // Decrement the commentsCount
    await prisma.feed.update({
      where: { id: comment.feedId },
      data: {
        commentsCount: {
          decrement: 1,
        },
      },
    });

    return res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const reportComment = async (req, res) => {
  const { commentId } = req.params;
  const userId = req.userId;
  const { reason, description } = req.body;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(commentId) },
    });

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Check if already reported
    const alreadyReported = await prisma.report.findUnique({
      where: {
        commentId_reporterId: {
          commentId: parseInt(commentId),
          reporterId: userId,
        },
      },
    });

    if (alreadyReported) {
      return res
        .status(409)
        .json({ message: "You already reported this comment." });
    }

    // Create report
    await prisma.report.create({
      data: {
        comment: { connect: { id: parseInt(commentId) } },
        reporter: { connect: { id: userId } },
        reason,
        description,
      },
    });

    return res.status(200).json({ message: "Comment reported successfully." });
  } catch (error) {
    console.error("Error reporting comment:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
