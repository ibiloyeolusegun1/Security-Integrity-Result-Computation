const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const courseRoutes = require("./routes/courseRoutes");
const resultRoutes = require("./routes/resultRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/results", resultRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Result Security API Running",
  });
});

module.exports = app;
