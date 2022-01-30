const express = require('express');
const router = express.Router();
const VerificaController = require('../controllers/VerificaController');

router.get("/email/:token", VerificaController.verificaEmail);
router.post("/telefone/:codigo", VerificaController.verificaTelefone);
router.post("/status", VerificaController.verificaStatus);

module.exports = router;