const express = require("express");
const router = express.Router();
const ExcluirController = require("../controllers/ExcluirController");

router.delete("/user/:email", ExcluirController.deletarUsuario);

module.exports = router;