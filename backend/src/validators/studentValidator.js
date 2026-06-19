const { body } = require("express-validator");

exports.createStudentValidation = [
  body("matric_no").notEmpty().withMessage("Matric number is required"),

  body("fullname")
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ min: 3 })
    .withMessage("Full name must be at least 3 characters"),

  body("department").notEmpty().withMessage("Department is required"),

  body("level").notEmpty().withMessage("Level is required"),
];
