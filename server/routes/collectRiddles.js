const express = require("express");
const RiddleController = require("../controllers/collectRiddles");
const router = express.Router();

router.route('/').get(RiddleController.getAllRiddles)
router.route("/:id").get(RiddleController.createRiddle).patch(RiddleController.updateRiddle);

module.exports = router;
