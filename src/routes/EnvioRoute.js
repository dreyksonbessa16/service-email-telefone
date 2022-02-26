const express = require("express");
const router = express.Router();
const EnvioController = require("../controllers/EnvioController");
const validator = require("../middleware/Validator");

router.post("/", validator.validatorFieldsInput, EnvioController.cadastro);

module.exports = router;