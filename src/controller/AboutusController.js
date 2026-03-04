// src/controllers/AboutController.js
const About = require("../models/AboutusModels");

// GET current about info
const getAboutInfo = async (req, res) => {
  try {
    const about = await About.findOne().sort({ updatedAt: -1 });
    if (!about)
      return res
        .status(404)
        .json({ success: false, error: "About info not found" });
    res.status(200).json({ success: true, data: about });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// CREATE or UPDATE About info (admin use)
const postAboutInfo = async (req, res) => {
  try {
    const { title, subtitle, paragraphs, images, decorativeElements } =
      req.body;

    // Validate required fields
    if (!title || !paragraphs || !images) {
      return res.status(400).json({
        success: false,
        error: "Title, paragraphs, and images are required.",
      });
    }

    let about = await About.findOne();
    if (about) {
      // Update existing
      about.title = title;
      about.subtitle = subtitle;
      about.paragraphs = paragraphs;
      about.images = images;
      about.decorativeElements = decorativeElements || [];
      about.updatedAt = new Date();
      await about.save();
    } else {
      // Create new
      about = await About.create({
        title,
        subtitle,
        paragraphs,
        images,
        decorativeElements: decorativeElements || [],
      });
    }

    res.status(200).json({ success: true, data: about });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { getAboutInfo, postAboutInfo };
