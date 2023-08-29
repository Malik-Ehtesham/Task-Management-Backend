const express = require("express");
const router = express.Router();

const taskControllers = require("../Controllers/taskController");
const authControllers = require("../Controllers/authController");

// Creat a new Task
router.post("/", authControllers.protect, taskControllers.createTask);

// Fetch all tasks
router.get(
  "/tasks",
  authControllers.protect,
  authControllers.restrictTo("admin"),
  taskControllers.getAllTasks
);

// Fetch a single task by ID
router.get("/tasks/:id", authControllers.protect, taskControllers.getTaskById);

// Fetch all tasks of the current user
router.get(
  "/tasks/me",
  authControllers.protect,
  taskControllers.getAllTasksForCurrentUser
);

// Update a task by ID
router.patch(
  "/tasks/:id",
  authControllers.protect,
  taskControllers.updateTaskById
);

// Delete a task by ID
router.delete(
  "/tasks/:id",
  authControllers.protect,
  taskControllers.deleteTaskById
);

module.exports = router;
