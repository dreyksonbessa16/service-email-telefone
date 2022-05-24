const express = require("express");
const router = express.Router();
const middlewares = require("../middlewares/verifyMiddleware");
const services = require("../services/verifyService");

router.post("/status", middlewares.verifyStatus, services.verifyStatus);
router.post("/email", middlewares.verifyEmail, services.verifyEmail);
router.post("/telefone", middlewares.verifyPhone, services.verificaTelefone);

module.exports = router;