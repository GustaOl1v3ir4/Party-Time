const router = require("express").Router()
console.log("✅ router.js carregado");

// Services router

const servicesRouter = require("./services")

router.use("/", servicesRouter)

// Parties router

const partyRouter = require("./parties")

router.use("/", partyRouter);


// Auth router

const authRouter = require("./auth")

router.use("/", authRouter);


module.exports = router;