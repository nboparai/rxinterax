const router = require("express").Router();
const registerRoutes = require("./register");

// API Routes
router.use("/register", registerRoutes);

module.exports = router;
