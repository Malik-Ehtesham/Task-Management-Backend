const User = require("../Models/User");

exports.createUser = catchAsync(async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = await User.create({ username, email, password });
  res.status(201).json(newUser);
});

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});
