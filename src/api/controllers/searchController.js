const express = require("express");
const router = express.Router();
const buscaService = require("../services/buscaService");

router.get("/users-nao-verificados", buscaService.buscaNaoVerificados);

module.exports = router;