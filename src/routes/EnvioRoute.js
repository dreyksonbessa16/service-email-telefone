const express = require("express");
const router = express.Router();
const EnvioController = require("../controllers/EnvioController");

router.post("/", EnvioController.cadastro);

module.exports = router;