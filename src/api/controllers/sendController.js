const express = require("express");
const router = express.Router();
const envio = require("../middlewares/envio");
const envioService = require("../services/envioService");

router.post("/email", envio.envioEmail, envioService.emailEnvio);
router.post("/telefone", envio.envioEmail, envioService.telefoneEnvio);

module.exports = router;