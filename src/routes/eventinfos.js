const express = require("express");
const { body } = require("express-validator");
const { createInquiry } = require("../controller/InforEventController");

const router = express.Router();
router.post("/", createInquiry);

module.exports = router;
