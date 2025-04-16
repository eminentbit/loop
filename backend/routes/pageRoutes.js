import { Router } from "express";
const router = Router();
import { Page } from "../models"; // Import the Page model

// CREATE a new Page
router.post("/", async (req, res) => {
  try {
    const { title, content, is_published } = req.body;
    const page = await Page.create({ title, content, is_published });
    res.status(201).json(page);
  } catch (error) {
    console.log(`Error creating page: ${error}`);
    res.status(500).json({ message: "Error creating page", error });
  }
});

// GET all Pages
router.get("/", async (req, res) => {
  try {
    const pages = await Page.findAll();
    res.status(200).json(pages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pages", error });
  }
});

// GET a single Page by ID
router.get("/:id", async (req, res) => {
  try {
    const page = await Page.findByPk(req.params.id);
    if (page) {
      res.status(200).json(page);
    } else {
      res.status(404).json({ message: "Page not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching page", error });
  }
});

// GET a single Page by slug (unique)
router.get("/slug/:slug", async (req, res) => {
  try {
    const page = await Page.findOne({ where: { slug: req.params.slug } });
    if (page) {
      res.status(200).json(page);
    } else {
      res.status(404).json({ message: "Page not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching page by slug", error });
  }
});

// UPDATE a Page by ID
router.put("/:id", async (req, res) => {
  try {
    const page = await Page.findByPk(req.params.id);
    if (page) {
      const { title, content, is_published } = req.body;
      await page.update({ title, content, is_published });
      res.status(200).json(page);
    } else {
      res.status(404).json({ message: "Page not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating page", error });
  }
});

// DELETE a Page by ID
router.delete("/:id", async (req, res) => {
  try {
    const page = await Page.findByPk(req.params.id);
    if (page) {
      await page.destroy();
      res.status(200).json({ message: "Page deleted successfully" });
    } else {
      res.status(404).json({ message: "Page not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting page", error });
  }
});

export default router;
