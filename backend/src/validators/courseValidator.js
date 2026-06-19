const { body } = require("express-validator");

exports.createCourseValidation = [
  body("course_code").notEmpty().withMessage("Course code is required"),

  body("course_title").notEmpty().withMessage("Course title is required"),

  body("unit")
    .isInt({ min: 1, max: 6 })
    .withMessage("Unit must be between 1 and 6"),

  body("semester").notEmpty().withMessage("Semester is required"),

  body("level").notEmpty().withMessage("Level is required"),
];
