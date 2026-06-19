const { body } = require("express-validator");

exports.computeResultValidation = [
  body("student_id").isInt().withMessage("Student ID must be an integer"),

  body("course_id").isInt().withMessage("Course ID must be an integer"),

  body("ca_score")
    .isInt({ min: 0, max: 30 })
    .withMessage("CA score must be between 0 and 30"),

  body("test_score")
    .isInt({ min: 0, max: 20 })
    .withMessage("Test score must be between 0 and 20"),

  body("exam_score")
    .isInt({ min: 0, max: 50 })
    .withMessage("Exam score must be between 0 and 50"),

  body("session").notEmpty().withMessage("Session is required"),

  body("semester").notEmpty().withMessage("Semester is required"),
];
