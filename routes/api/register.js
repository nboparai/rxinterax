const router = require("express").Router();
const registerController = require("../../controllers/registerController");

// Matches with "/api/books"
router.route("/")
  .post(registerController.create);

// // Matches with "/api/books/:id"
// router
//   .route("/:id")
//   .get(booksController.findById)
//   .put(booksController.update)
//   .delete(booksController.remove);

module.exports = router;
