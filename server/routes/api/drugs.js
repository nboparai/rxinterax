const router = require("express").Router();
const drugsController = require("../../controllers/drugsController");


router.route("/all/:id")
  .get(drugsController.findAll);
router.route("/:id")
  .post(drugsController.create)

module.exports = router;