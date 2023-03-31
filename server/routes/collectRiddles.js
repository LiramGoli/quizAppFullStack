const express = require("express");
const RiddleController = require("../controllers/collectRiddles");
const router = express.Router();

router.route("/").get(RiddleController.getAllRiddles)
router.route("/:id/:difficulty").get(RiddleController.createRiddle)
router.route("/:id").patch(RiddleController.updateRiddle);

module.exports = router;
