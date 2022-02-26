const express = require('express');
const router = express.Router();
const VerificaController = require('../controllers/VerificaController');
const Validator = require("../middleware/Validator");

router.get("/email/:token", Validator.validatorFieldsVerifyEmail, VerificaController.verificaEmail);
router.post("/telefone/:codigo", Validator.validatorFieldsVerifyTelefone, VerificaController.verificaTelefone);
router.post("/status", Validator.validatorFieldsInput, VerificaController.verificaStatus);

module.exports = router;