const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddlewares");
const checkRole = require("../middlewares/roleMiddleware");

router.use(authMiddleware);
router.use(checkRole("admin"));

router.get("/dashboard", (req, res) => {
    res.json({
        message: "Bem vindo ao painel de administração",
        admin: req.user.name
    })
})

module.exports = router;


