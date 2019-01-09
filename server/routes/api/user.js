const router = require("express").Router();
const usersController = require("../../controllers/usersController");
const passport = require('../../passport')

router
  .route("/signup")
  .post(usersController.register);


router
  .route("/:id")
  .get(usersController.findById)
  .put(usersController.update)
  .delete(usersController.remove)

router
  .route("/login")
  .post(passport.authenticate('local'), usersController.authorize)

router
  .route("/logout")
  .post(usersController.logout)

module.exports = router;

