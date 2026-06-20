const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const validation = require("../middleware/validation");

const resultController = require("../controllers/resultController");
const { computeResultValidation } = require("../validators/resultValidator");

router.post(
  "/compute",
  auth,
  role("ADMIN", "LECTURER"),
  computeResultValidation,
  validation,
  resultController.computeResult,
);
router.get("/student/:studentId", auth, resultController.getStudentResults);
router.get("/verify/:id", auth, resultController.verifyResult);
router.get("/gpa/:studentId", auth, resultController.calculateGPA);
router.get("/cgpa/:studentId", auth, resultController.calculateCGPA);
router.get("/transcript/:studentId", auth, resultController.getTranscript);
router.get(
  "/transcript/pdf/:studentId",
  auth,
  resultController.downloadTranscript,
);
router.get("/dashboard/stats", auth, resultController.getDashboardStats);
router.put(
  "/:id",
  auth,
  role("ADMIN", "LECTURER"),
  resultController.updateResult,
);

module.exports = router;
