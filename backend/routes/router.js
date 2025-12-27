const router = require("express").Router();


router.use((req, res, next) => {
  console.log("➡️ Requisição recebida:", req.method, req.originalUrl);
  next();
});


const authRouter = require("./auth");
const partyRouter = require("./parties");
const servicesRouter = require("./services");
const authMiddleware = require("../middlewares/authMiddlewares");

// públicas
router.use("/auth", authRouter);

// protegidas
router.use("/parties", authMiddleware, partyRouter);
router.use("/services", authMiddleware, servicesRouter);

module.exports = router;
