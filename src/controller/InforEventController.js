const { validationResult } = require("express-validator");
const { sendEmail } = require("../../Utility/sendEmail");
const InfoEventSchema = require("../models/InforEventModels");

exports.createInquiry = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const inquiry = new InfoEventSchema(req.body);
    await inquiry.save();

    await sendEmail(inquiry);

    res.status(201).json({
      success: true,
      message: "Inquiry submitted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
