const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const role = require("../middleware/role");
const validation = require("../middleware/validation");

const studentController = require("../controllers/studentController");
const { createStudentValidation } = require("../validators/studentValidator");

router.post(
  "/",
  auth,
  role("ADMIN"),
  createStudentValidation,
  validation,
  studentController.createStudent,
);
router.get("/", auth, studentController.getStudents);
router.get("/:id", auth, studentController.getStudent);
router.put("/:id", auth, studentController.updateStudent);
router.delete("/:id", auth, role("ADMIN"), studentController.deleteStudent);

module.exports = router;
