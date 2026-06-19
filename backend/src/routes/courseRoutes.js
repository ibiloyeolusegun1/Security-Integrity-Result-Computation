const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const courseController = require("../controllers/courseController");

router.post("/", auth, courseController.createCourse);
router.get("/", auth, courseController.getCourses);
router.get("/:id", auth, courseController.getCourse);
router.put("/:id", auth, courseController.updateCourse);
router.delete("/:id", auth, courseController.deleteCourse);

module.exports = router;
