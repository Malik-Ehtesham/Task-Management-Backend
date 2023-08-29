const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");

// Create a new user
router.post("/users", userController.createUser);

// Fetch all users
router.get("/users", userController.getAllUsers);

module.exports = router;
