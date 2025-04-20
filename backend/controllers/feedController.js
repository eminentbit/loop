import prisma from "../lib/prisma.js";

// Get all posts (feeds)
export const getFeed = async (req, res) => {
  try {
    const posts = await prisma.feed.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            fullName: true,
          },
        },
      },
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get post by ID
export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await prisma.feed.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new post
export const createPost = async (req, res) => {
  try {
    const { content } = req.body;

    const userId = req.userId;

    if (!content || !userId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const post = await prisma.feed.create({
      data: {
        content,
        type,
        userId,
      },
      include: {
        user: {
          select: {
            fullName: true,
          },
        },
      },
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
