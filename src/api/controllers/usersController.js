const express = require("express");
const router = express.Router();
const middlewares = require("../middlewares/userMiddleware");
const services = require("../services/usersService");

router.post("/signup", middlewares.inputSignup, services.signup);

router.get("/search", middlewares.inputSearch, services.search);

router.delete("/delete", middlewares.inputDelete, services.delete);

module.exports = router;