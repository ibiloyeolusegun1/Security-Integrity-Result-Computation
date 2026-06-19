const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const resultController = require("../controllers/resultController");

router.post("/compute", auth, resultController.computeResult);
router.get("/student/:studentId", auth, resultController.getStudentResults);
router.get("/verify/:id", auth, resultController.verifyResult);
router.get("/gpa/:studentId", auth, resultController.calculateGPA);
router.get("/cgpa/:studentId", auth, resultController.calculateCGPA);
router.get("/transcript/:studentId", auth, resultController.getTranscript);
router.get("/dashboard/stats", auth, resultController.getDashboardStats);

module.exports = router;
