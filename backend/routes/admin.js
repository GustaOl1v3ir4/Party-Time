const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddlewares");
const checkRole = require("../middlewares/roleMiddleware");
const adminController = require("../controllers/adminController");

router.use(authMiddleware);
router.use(checkRole("admin"));

router.get("/dashboard", adminController.getDashMetrics);
router.get("/parties", adminController.getAllParties);
router.get("/users", adminController.getAllUsers);

module.exports = router;


