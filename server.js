require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/dbConnect");
const userRoute = require("./src/routes/userRoute");
const lessonRoute = require("./src/routes/lessonRoute");

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
dbConnect();

// Use userRoute for routes
app.use("/", userRoute);
app.use("/", lessonRoute);

// Root Route
app.get("/", (req, res) => {
  res.status(200).send({ message: "Server is running" });
});

// Server Port
const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
