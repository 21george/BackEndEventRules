const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./Config/db");

dotenv.config();
connectDB(); // Connect to MongoDB

const app = express();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "https://eventsrules.com"],
    credentials: true,
  }),
);
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "EventRulesBackend is running" });
});

// Routes
app.use("/eventinfos", require("./src/routes/eventinfos"));
app.use("/aboutus", require("./src/routes/aboutus"));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global error:", err);
  res.status(500).json({ success: false, message: "Internal server error" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
