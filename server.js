const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = require("./app");

dotenv.config();

const DB = process.env.DB.replace("<PASSWORD>", process.env.DB_PASSWORD);

// Connect to MongoDB
mongoose
  .connect(DB)
  .then(() => console.log("DB connection successful!"))
  .catch((err) => console.log(err));

// Set up your API routes here

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
