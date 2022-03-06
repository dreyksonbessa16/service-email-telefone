const express = require("express");
const router = express.Router();
const EnvioController = require("../controllers/EnvioController");
const validator = require("../middleware/Validator");

router.post("/email", validator.validatorFieldsInput, EnvioController.envioEmail);
router.post("/telefone", validator.validatorFieldsInput, EnvioController.envioTelefone);

module.exports = router;