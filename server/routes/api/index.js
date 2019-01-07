const router = require("express").Router();
const userRoutes = require("./user");
const drugRoutes = require("./drugs");

// User routes
router.use("/user", userRoutes);
// Drug routes
router.use("/drugs", drugRoutes);

module.exports = router;
