const express = require("express");
const router = express.Router();
const ExcluirController = require("../controllers/ExcluirController");
const Validator = require("../middleware/Validator");

router.delete("/user/:email", Validator.validatorFieldsDelete, ExcluirController.deletarUsuario);

module.exports = router;