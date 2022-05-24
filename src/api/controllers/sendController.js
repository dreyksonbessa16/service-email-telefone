const express = require("express");
const router = express.Router();
const middlewares = require("../middlewares/sendMiddleware");
const services = require("../services/sendService");

router.post("/email", middlewares.sendEmail, services.sendEmail);
router.post("/telefone", middlewares.sendEmail, services.sendPhone);

module.exports = router;