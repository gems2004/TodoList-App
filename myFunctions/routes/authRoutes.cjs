const express = require("express");
const { loginLimiter } = require("../middleware/loginLimiter.cjs");
const router = express.Router();
const { login, refresh, logout } = require("../controllers/authController.cjs");

router.route("/").post(loginLimiter, login);

router.route("/refresh").get(refresh);

router.route("/logout").post(logout);

module.exports = router;
