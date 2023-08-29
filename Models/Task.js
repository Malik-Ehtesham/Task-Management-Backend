const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  // Add a reference to the user
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference the User model
    required: true,
  },
  completed: {
    type: Boolean,
    // required: true,
  },
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
