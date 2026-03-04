const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Main section title
  subtitle: { type: String }, // Optional subtitle
  paragraphs: { type: [String], required: true }, // Array of text paragraphs
  images: { type: [String], required: true }, // Array of image URLs
  decorativeElements: { type: [Object], default: [] }, // Decorative elements info
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("About", AboutSchema);
