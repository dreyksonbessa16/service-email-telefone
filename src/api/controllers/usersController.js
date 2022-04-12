const express = require("express");
const router = express.Router();
const users = require("../middlewares/user");
const usersService = require("../services/usersService");

router.post("/signup", users.inputSignup, usersService.signup);
router.get("/search", users.inputSearch, usersService.search);
router.delete("/delete", users.inputDelete, usersService.delete);

module.exports = router;