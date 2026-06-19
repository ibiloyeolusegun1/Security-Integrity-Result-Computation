const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const role = require("../middleware/role");

const auditController = require("../controllers/auditController");

router.get("/", auth, role("ADMIN"), auditController.getLogs);

module.exports = router;
