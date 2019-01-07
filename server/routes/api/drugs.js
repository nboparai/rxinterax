const router = require("express").Router();
const drugsController = require("../../controllers/drugsController");


router.route("/all/:id")
  .get(drugsController.findAll);
router.route("/:id")
  .post(drugsController.create);
router.route("/update/:id")
  .put(drugsController.update);

module.exports = router;