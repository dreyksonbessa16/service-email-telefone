const express = require('express');
const router = express.Router();
const VerificaController = require('../controllers/VerificaController');

router.post("/email/:codigo", VerificaController.verificaEmail);
router.post("/telefone/:codigo", VerificaController.verificaTelefone);
router.post("/status-email", VerificaController.verificaStatusEmail);
router.post("/status-telefone", VerificaController.verificaStatusTelefone);

module.exports = router;