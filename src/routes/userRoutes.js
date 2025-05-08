const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

router.get("/register", UserController.showRegister);
router.post("/register", UserController.register);
router.get("/login", UserController.showLogin);
router.post("/login", UserController.login);
router.get("/logout", UserController.logout);

module.exports = router;
