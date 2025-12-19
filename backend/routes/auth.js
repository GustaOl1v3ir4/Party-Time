const router = require("express").Router();

console.log("✅ auth.js carregado");

const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;