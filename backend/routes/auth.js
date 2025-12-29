const router = require("express").Router();

const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddlewares");



router.post("/register", authController.register);
router.post("/login", authController.login);

router.get("/me", authMiddleware, authController.getCorrentUser)

module.exports = router;