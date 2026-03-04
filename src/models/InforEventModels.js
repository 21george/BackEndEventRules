const mongoose = require("mongoose");

const InfoEventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    guestCount: {
      type: String,
      required: true,
    },
    eventType: {
      type: String,
      required: true,
    },
    serviceInterest: {
      type: [String],
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("InfoEvent", InfoEventSchema);
