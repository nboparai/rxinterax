const router = require("express").Router();
const drugsController = require("../../controllers/drugController");


router.route("/drugs")
  .get(drugsController.findAll);
router.route("/:id")
  .post(drugsController.create)

module.exports = router;