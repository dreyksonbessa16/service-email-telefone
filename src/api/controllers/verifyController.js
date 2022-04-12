const express = require("express");
const router = express.Router();
const verifica = require("../middlewares/verifica");
const verificaService = require("../services/verificaService");

router.post("/status", verifica.inputVerificaStatus, verificaService.verificaStatus);
router.post("/email", verifica.inputVerificaEmail, verificaService.verificaEmail);
router.post("/telefone", verifica.inputVerificaTelefone, verificaService.verificaTelefone);

module.exports = router;