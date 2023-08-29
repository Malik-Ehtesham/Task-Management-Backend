const express = require("express");
const router = express.Router();
const taskController = require("../Controllers/taskController");

// Creat a new Task
router.post("/", taskController.createTask);

// Fetch all tasks
router.get("/tasks", taskController.getAllTasks);

// Fetch a single task by ID
router.get("/tasks/:id", taskController.getTaskById);

// Update a task by ID
router.patch("/tasks/:id", taskController.updateTaskById);

// Delete a task by ID
router.delete("/tasks/:id", taskController.deleteTaskById);

module.exports = router;
