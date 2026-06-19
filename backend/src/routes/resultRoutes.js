const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const resultController = require("../controllers/resultController");

router.post("/compute", auth, resultController.computeResult);
router.get("/student/:studentId", auth, resultController.getStudentResults);
router.get("/verify/:id", auth, resultController.verifyResult);

module.exports = router;
