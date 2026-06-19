const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const studentController = require("../controllers/studentController");

router.post("/", auth, studentController.createStudent);
router.get("/", auth, studentController.getStudents);
router.get("/:id", auth, studentController.getStudent);
router.put("/:id", auth, studentController.updateStudent);
router.delete("/:id", auth, studentController.deleteStudent);

module.exports = router;
