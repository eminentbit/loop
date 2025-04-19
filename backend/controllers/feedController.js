import prisma from "../lib/prisma.js";

export const getFeed = async (req, res) => {
  try {
    const posts = await prisma.feed
      .find()
      .sort({ createdAt: -1 })
      .populate("userId", "username");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const { content, userId } = req.body;

    if (!content || !userId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const post = await prisma.feed.create({
      data: {
        content,
        userId,
      },
    });

    const populatedPost = await prisma.feed.findUnique({
      where: { id: post.id },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
