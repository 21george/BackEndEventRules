// src/routes/aboutRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAboutInfo,
  postAboutInfo,
} = require("../controller/AboutusController");

// GET about info
router.get("/", getAboutInfo);

//Post about info
router.post("/", postAboutInfo);

module.exports = router;
