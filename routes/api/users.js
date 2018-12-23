const router = require("express").Router();
const usersController = require("../../controllers/usersController");

router.route("/")
  .post(usersController.findAll);

module.exports = router;
