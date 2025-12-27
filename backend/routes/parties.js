const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddlewares");
const partyController = require("../controllers/partyController");


router.post("/", partyController.create);
router.get("/", partyController.getAll);
router.get("/my", partyController.getMyParties);
router.get("/:id", partyController.get);
router.put("/:id", partyController.update);
router.delete("/:id", partyController.delete);

module.exports = router;
