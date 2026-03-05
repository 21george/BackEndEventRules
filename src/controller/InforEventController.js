const express = require("express");
const { body, validationResult } = require("express-validator");
const { sendEmail } = require("../../Utility/sendEmail");
const InfoEventSchema = require("../models/InforEventModels");

const router = express.Router();

// Validation rules
const validateInquiry = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("eventDate").notEmpty().withMessage("Event date is required"),
  body("guestCount").notEmpty().withMessage("Guest count is required"),
  body("eventType").notEmpty().withMessage("Event type is required"),
  body("subject").notEmpty().withMessage("Subject is required"),
  body("message").notEmpty().withMessage("Message is required"),
];

router.post("/", validateInquiry, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const inquiry = new InfoEventSchema(req.body);
    await inquiry.save();

    try {
      await sendEmail(inquiry);
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      return res.status(200).json({
        success: true,
        warning: "Form saved but email failed. Check logs.",
      });
    }

    res
      .status(201)
      .json({ success: true, message: "Inquiry submitted successfully" });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
