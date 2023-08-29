const User = require("../Models/User");
const Task = require("../Models/Task");

const AppError = require("../Utils/appError");
const catchAsync = require("../Utils/catchAsync");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error If user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword.",
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, "username", "email");
  if (req.file) filteredBody.photo = req.file.filename;

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  // Delete reviews associated with the user
  await Task.deleteMany({ user: req.user._id });

  await User.findByIdAndUpdate(req.user._id, { active: false });

  res.status(204).json({ status: "success", data: null });
});

// Controller function to get all users
exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  res.status(200).json(users);
});

exports.getSingleUser = catchAsync(async (req, res, next) => {
  const userId = req.params.id;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }

  res.status(200).json(user);
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const userId = req.params.id;
  const updateData = req.body;

  // Check if the user exists in the database
  const existingUser = await User.findById(userId);
  if (!existingUser) {
    return res.status(404).json({ error: "User not found." });
  }

  // Update the user's data based on the fields sent in the request body
  for (const [key, value] of Object.entries(updateData)) {
    if (key in existingUser) {
      existingUser[key] = value;
    }
  }

  // Save the updated user
  const updatedUser = await existingUser.save({ validateBeforeSave: false });
  res.status(200).json(updatedUser);
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const userId = req.params.id;

  // Check if the user exists in the database
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }

  // Delete the user
  await user.deleteOne();

  res.status(200).json({ message: "User deleted successfully." });
});

exports.createUser = catchAsync(async (req, res) => {
  const { username, email, password, role } = req.body;

  // Create a new user
  const newUser = await User.create({
    username,
    email,
    password,
    role,
  });

  res.status(201).json(newUser);
});
