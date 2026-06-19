const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const validation = require("../middleware/validation");

const courseController = require("../controllers/courseController");
const { createCourseValidation } = require("../validators/courseValidator");

router.post(
  "/",
  auth,
  role("ADMIN"),
  createCourseValidation,
  validation,
  courseController.createCourse,
);
router.get("/", auth, courseController.getCourses);
router.get("/:id", auth, courseController.getCourse);
router.put("/:id", auth, courseController.updateCourse);
router.delete("/:id", auth, role("ADMIN"), courseController.deleteCourse);

module.exports = router;
