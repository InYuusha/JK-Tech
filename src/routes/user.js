const express = require("express");
const router = express.Router();
const { signin, signup } = require("../controllers/user");

// User Signup
router.post("/signup", signup);

// User Login
router.post("/signin", signin);

module.exports = router;
