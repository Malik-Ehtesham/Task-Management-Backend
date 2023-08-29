const Task = require("../Models/Task");
const catchAsync = require("../Utils/catchAsync");

// Controller for creating a new Task
exports.createTask = catchAsync(async (req, res, next) => {
  const { title, description, dueDate, priority } = req.body;
  const newTask = await Task.create({
    title,
    description,
    dueDate,
    priority,
  });
  res.status(201).json(newTask);
});

// Controller for fetching all tasks
exports.getAllTasks = catchAsync(async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json(tasks);
});

// Controller for fetching a single task by ID
exports.getTaskById = catchAsync(async (req, res) => {
  const taskId = req.params.id;

  const task = await Task.findById(taskId);

  if (!task) {
    return res.status(404).json({ error: "Task not found." });
  }

  res.status(200).json(task);
});

// Controller for updating a task by ID
exports.updateTaskById = catchAsync(async (req, res) => {
  const taskId = req.params.id;

  const { title, description, dueDate, priority } = req.body;

  const updatedTask = await Task.findByIdAndUpdate(
    taskId,
    { title, description, dueDate, priority },
    { new: true }
  );

  if (!updatedTask) {
    return res.status(404).json({ error: "Task not found." });
  }

  res.status(200).json(updatedTask);
});

// Controller for deleting a task by ID
exports.deleteTaskById = catchAsync(async (req, res) => {
  const taskId = req.params.id;

  const deletedTask = await Task.findByIdAndDelete(taskId);

  if (!deletedTask) {
    return res.status(404).json({ error: "Task not found." });
  }

  res.status(200).json({ message: "Task deleted successfully." });
});
